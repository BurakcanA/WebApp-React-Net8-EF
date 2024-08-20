import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Text,
  VStack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Base_URL } from "../constant";
import { Product } from "../types/product";

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
  currentData?: Product;
};

const ProductForm = ({
  isOpen,
  onClose,
  fetchProduct,
  currentData,
}: ProductFormProps) => {
  const toast = useToast();
  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    descrption: currentData?.descrption || "",
    price: currentData?.price || "",
    inStore: currentData?.inStore || false,
  });

  const onSave = () => {
    if (!currentData?.id)
    {
        AddProduct();
    }else 
    {
        EditProduct();
    }
  };

  const AddProduct = () => {
    axios
      .post(Base_URL, product)
      .then(() => {
        onClose();
        fetchProduct();

        toast({
          title: "Product Added",
          description: "Product Added succesfully",
          isClosable: true,
          duration: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditProduct = () => {
    axios
      .put(Base_URL + currentData?.id, product)
      .then(() => {
        onClose();
        fetchProduct();

        toast({
          title: 'Product Updated',
          description: 'Product Updated Succesfully',
          isClosable: true,
          duration:3000
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose }>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader shadow={"sm"}>{currentData?.id ? "Update Product" : "Add Product"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={4}>
              <Input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              ></Input>
              <Textarea
                placeholder="Description"
                value={product.descrption}
                onChange={(e) =>
                  setProduct({ ...product, descrption: e.target.value })
                }
              ></Textarea>
              <Input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              ></Input>
              <Text>Is In Store</Text>
              <Switch
                isChecked={product.inStore}
                onChange={(e) =>
                  setProduct({ ...product, inStore: e.target.checked })
                }
              ></Switch>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
