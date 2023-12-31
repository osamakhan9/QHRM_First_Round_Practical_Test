

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
	useDisclosure,
  } from "@chakra-ui/react";
  import { useState } from "react";
//   const toast = useToast()
  
  export function EditTodoList({ el, apiCall, toast}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
  
	const [user, setuser] = useState({
	  name: "",
	  date: "",
	  last:"",
	});
  
	function handleChange(e) {
	  setuser({ ...user, [e.target.id]: e.target.value });
	}
  
	async function handleSubmit(e) {
	  e.preventDefault();
	  let res = await fetch(`https://to-do-i7no.onrender.com/todo/${el.id}`, {
		method: "PATCH",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	  });
	  res = await res.json();
	  
	  toast({
		  title: "Successfully Update",
		  description: "We've Update your todo.",
		  status: "success",
		  duration: 8000,
		  isClosable: true,
		  position: "top",
		});

		apiCall();
	}
  
	return (
	  <>
		
  
		<Button  onClick={onOpen} variant={"solid"} colorScheme={"teal"}>
		  Edit
		</Button>
		<Modal isOpen={isOpen} onClose={onClose}>
		  <ModalOverlay />
		  <ModalContent>
			<ModalHeader>Update Products</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
			  <FormControl>
				<FormLabel mt="10px">Choose and Update</FormLabel>
				<FormLabel mt="10px">Product</FormLabel>
				<Input type="text" id="name" placeholder="Product.." onChange={handleChange} />

				<FormLabel mt="10px">Description</FormLabel>
			    <Input type="text" placeholder="description......" id="last" onChange={handleChange} />
  
				<FormLabel mt="10px">Created</FormLabel>
				<Input type="date" id="date" placeholder="Update dd/mm/yyyy" onChange={handleChange} />
  
		
			  </FormControl>
			</ModalBody>
  
			<ModalFooter>
			  <Button colorScheme="blue" mr={3} onClick={onClose}>
				Close
			  </Button>
			  <Button onClick={handleSubmit}>Update</Button>
			</ModalFooter>
		  </ModalContent>
		</Modal>
	  </>
	);
  }