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
} from "@chakra-ui/react";
import "./App.css";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Base_URL } from "./constant";
import { useEffect, useState } from "react";
import { Product } from "./types/product";
import ProductForm from "./components/ProductForm";

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get(Base_URL + "Product")
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
    fetchData();
  }, []);

  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex
        px={5}
        mb={5}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading>Product List</Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onOpen}>
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
                    <ViewIcon color={"blue"} boxSize={21} />
                    <EditIcon boxSize={19} />
                    <DeleteIcon color={"red"} boxSize={19} />
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
      {isOpen && <ProductForm isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
}

export default App;
