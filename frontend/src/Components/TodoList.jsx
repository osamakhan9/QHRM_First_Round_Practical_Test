import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Flex,
	Select,
	Button,
	Heading,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  
  import { useDispatch, useSelector } from "react-redux";
  import { filterData, getData } from "../Redux/actions";
  import  {EditTodoList}  from "./EditTodoList";
  import { useState } from "react";

  
  export default function TodoList() {
	const dispatch = useDispatch();
	const toast = useToast()
	let data = useSelector((store) => store.todos);
	useEffect(() => {
	  apiCall();
	  
	}, []);
	


	const [user, setuser] = useState({
		
		name: "",
		date: "",
		age: "",
		last:"",
	  });

	  

	

	  function handleChange(e) {
			setuser({ ...user, [e.target.id]: e.target.value });
	
	  }


	    

	async function handleSubmit(e) {
		e.preventDefault();
		if(user.name == "" || user.date=="" || user.last==""){
			toast({
				title: "Please Fill Carefully",
				description: "We've Not allow todo fill the all data",
				status: "warning",
				duration: 9000,
				isClosable: true,
				position: "top",
			  });

		}else{
				// console.log(user)
				try{
					let res = await fetch('https://to-do-i7no.onrender.com/todo',{
					  method: "POST",
					  headers: { "content-type": "application/json"},
					  body: JSON.stringify(user),
					});
					let data = await res.json();
					console.log(data)
				  }catch (e){
					// console.log(e)
				}
				toast({
					title: "Successfully Add Todo",
					description: "We've created your todo.",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top",
				  });
			}
			
			
		

	}

  
	async function apiCall() {
	  let res = await fetch("https://to-do-i7no.onrender.com/todo");
	  res = await res.json();
	  dispatch(getData(res));
	}
	apiCall()

  
	async function handleDelete(id) {
	   await fetch(`https://to-do-i7no.onrender.com/todo/${id}`, {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json",
		},
	  });
	  toast({
		title: "DELETE Successfully",
		description:`your are Deleted ${id} todo.`,
		status: "warning",
		duration: 9000,
		isClosable: true,
		position: "top",
	  });

	  apiCall();
	}

	return (
	  <Flex mt={60} w={"100vw"} alignItems={"center"} justifyContent="space-evenly">
	
		<Flex alignItems="center" justifyContent="center">
		  <FormControl boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} p={"2rem"}>
			<Heading m={15}>ADD Products</Heading>
			<FormLabel mt="10px">Product</FormLabel>
			<Input type="text" placeholder="Product " id="name"  onChange={handleChange} />

			<FormLabel mt="10px">Description</FormLabel>
			<Input type="text" placeholder="description........." id="last" onChange={handleChange} />

			<FormLabel mt="10px">Created</FormLabel>
			<Input type="date" placeholder="dd/mm/yyyy" id="date" onChange={handleChange} />
  
			
			<Button mt="15px" width="full" type="submit" color='white' colorScheme="teal" onClick={handleSubmit}>
			  SUBMIT
			</Button>
			<FormHelperText>Fill The Proper Details.</FormHelperText>
		  </FormControl>
		</Flex>
  
		<Flex mt={-150} flexDirection={"column"}>

		  <TableContainer
			boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
			pt={"1rem"}
		  >
			<Table variant="striped">
			  <TableCaption></TableCaption>
			  <Thead>
				<Tr>
				  <Th>SN</Th>
				  <Th>Product</Th>
				  <Th>Description</Th>
				  <Th>Created</Th>
				  <Th>Action</Th>
				  {/* <Th>Edit</Th>
				  <Th>Delete</Th> */}
				</Tr>
			  </Thead>
			  <Tbody>
				{data.map((el, index) => {
				  return (
					<Tr key={index + 1}>
					  <Td>{el.id}</Td>
					  <Td>{el.name}</Td>
					  <Td>{el.last}</Td>
					  <Td>{el.date}</Td>
					  {/* <Td>{el.age}</Td> */}
					  <Td>
						<EditTodoList el={el} apiCall={apiCall} toast={toast} />
					  </Td>
					  <Td>
						<Button
						  variant={"solid"}
						  colorScheme={"red"}
						  onClick={() => {
							handleDelete(el.id);
						  }}
						>
						  Delete
						</Button>
					  </Td>
					</Tr>
				  );
				})}
			  </Tbody>
			</Table>
		  </TableContainer>
		</Flex>
	  </Flex>
	);
  }
  