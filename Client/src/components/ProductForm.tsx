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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Base_URL } from "../constant";

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProductForm = ({ isOpen, onClose }: ProductFormProps) => {
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    descrption: "",
    price: "",
    inStore: false,
  });

  const onSave = () => {
    axios
      .post(Base_URL + "product", product)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader shadow={"sm"}>Add Product</ModalHeader>
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
