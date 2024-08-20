import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Avatar,
  Badge,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import "./App.css";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Base_URL } from "./constant";
import { useEffect, useState } from "react";
import { Product } from "./types/product";
import ProductForm from "./components/ProductForm";
import ViewDetail from "./components/ViewDetail";

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen:viewDialogOpen, onClose:viewDialogClose, onOpen:onViewDialogOpen} = useDisclosure();

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [currentData, setCurrentData] = useState<Product>();
  const toast = useToast();

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(Base_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProduct = (id: number) => {
    axios
      .get<Product>(Base_URL + id)
      .then((res) => {
        setCurrentData(res.data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleView = (id:number)  => {
    axios
    .get<Product>(Base_URL + id)
    .then((res) => {
      setCurrentData(res.data);
      onViewDialogOpen();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const HandleAdd = () => {
    onOpen();
    setCurrentData({} as Product);
  };

  const onDelete = async (id:number) => {
    axios
    .delete(Base_URL + id)
    .then(() => {
      fetchData();
      toast({
        title: "Product Deleted",
        description: "Product Deleted succesfully",
        isClosable: true,
        duration: 3000,
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }


  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex
        px={5}
        mb={5}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading>Product List</Heading>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => HandleAdd()}
        >
          Add Product
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Is In Store</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar name={product.name}></Avatar>
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.descrption}</Td>
                <Td>
                  <Badge>{product.inStore ? "Yes" : "No"}</Badge>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <HStack gap={3}>
                    <ViewIcon
                      color={"blue"}
                      boxSize={21}
                      onClick={() => HandleView(product.id)}
                    />
                    <EditIcon
                      boxSize={19}
                      onClick={() => getProduct(product.id)}
                    />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon color={"red"} boxSize={19} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader color={'red'} >Whatch Out!</PopoverHeader>
                        <PopoverBody>
                          Are you sure to delete this product?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button colorScheme="red" onClick={() => onDelete(product.id)} float={'right'}>
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length == 0 && (
        <Heading textAlign={"center"} p={5} fontSize={15}>
          No Data
        </Heading>
      )}
      {isOpen && (
        <ProductForm
          isOpen={isOpen}
          onClose={onClose}
          fetchProduct={fetchData}
          currentData={currentData}
        />
      )}
      {viewDialogOpen && <ViewDetail
      isOpen={viewDialogOpen}
      onClose={viewDialogClose}
      currentData={currentData}
      />}
    </Box>
  );
}

export default App;

