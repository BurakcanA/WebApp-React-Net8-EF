import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import "./App.css";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Base_URL } from "./constant";
import { useEffect, useState } from "react";
import { Product } from "./types/product";

function App() {
  const [data,setData] = useState<Product[]>([]) 
  const [isLoading,setIsLoading] = useState<Boolean >(false) 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
       axios.get(Base_URL + 'Product').then((response) => {
        console.log(response.data);
        
        setData(response.data) 
      }).catch((error) => {
        console.log(error) 
      }).finally(() => {
         setIsLoading(false)
      })
    } 
    fetchData()
  },[])

 
  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex px={5} mb={5} justifyContent={'space-between'} alignItems={'center'}>
        <Heading>Product List</Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon/> }>Add Product</Button>
      </Flex> 
      <TableContainer>
        <Table variant="striped" >
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th isNumeric >Price</Th>
              <Th>Is In Store</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
             {
              data.map((product:Product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.descrption}</Td>
              <Td isNumeric>{product.price}</Td>
              <Td>{JSON.stringify(product.inStore)}</Td>
              <Td></Td>
            </Tr>
              )) 
             }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
