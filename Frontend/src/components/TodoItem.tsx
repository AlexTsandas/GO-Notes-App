// STARTER CODE:

import { Badge, Box, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";
const TodoItem = ({ todo }: { todo: Todo }) => {
  const textColor = useColorModeValue(
    todo.completed ? "green.700" : "cyan.800",
    todo.completed ? "green.200" : "yellow.100"
  );
  const pendingBadgeColor = useColorModeValue("cyan", "yellow");
  const queryClient = useQueryClient();
	const {mutate: updateTodo,isPending: isUpdating} = useMutation({
    mutationKey: ["updateTodo"],
		mutationFn: async () => {
			if (todo.completed) return alert("Todo is already completed!");
			try{
				const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
				method: "PATCH",
			})
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to update todo");
			}
			return data;
		}catch (error) {
			console.log(error);
		}
	 },
	 onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ["todos"] });
	 }
	})

	const {mutate: deleteTodo , isPending: isDeleting} = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: async () => {
			try{
				const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
					method: "DELETE",
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Failed to delete todo");
				}
				return data;
			}catch (error) {
				console.log(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
		onError: (error: any) => {
			console.log(error);
		}
	});
	return (
		<Flex gap={2} alignItems={"center"}>
			<Flex
				flex={1}
				alignItems={"center"}
				border={"1px"}
				borderColor={"gray.600"}
				p={2}
				borderRadius={"lg"}
				justifyContent={"space-between"}
			>
				<Text
					color={textColor}
					textDecoration={todo.completed ? "line-through" : "none"}
				>
					{todo.body}
				</Text>
				{todo.completed && (
					<Badge ml='1' colorScheme='green'>
						Done
					</Badge>
				)}
				{!todo.completed && (
					<Badge ml='1' colorScheme={pendingBadgeColor}>
						In Progress
					</Badge>
				)}
			</Flex>
			<Flex gap={2} alignItems={"center"}>
				<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
					{isUpdating ? <Spinner size="sm" /> : <FaCheckCircle size={20} />}
				</Box>
				<Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
					{isDeleting ? <Spinner size="sm" /> : <MdDelete size={25} />}
				</Box>
			</Flex>
		</Flex>
	);
};
export default TodoItem;
