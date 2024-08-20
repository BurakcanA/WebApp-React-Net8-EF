import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  HStack,
  Avatar,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Product } from "../types/product";

type ViewDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  currentData?: Product;
};

const ViewDetail = ({ isOpen, onClose, currentData }: ViewDetailProps) => (
  <>
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>View detail of {currentData?.name}</DrawerHeader>
        <DrawerBody>
        <HStack>
          <Avatar name={currentData?.name} size={"lg"} />
          <VStack alignItems={"self-start"}>
            <Heading fontSize={17}>{currentData?.name}</Heading>
            <Heading fontSize={20}>${currentData?.price}</Heading>
            <Text>{currentData?.descrption} </Text>
          </VStack>
        </HStack>
        </DrawerBody>
         
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
);

export default ViewDetail;
