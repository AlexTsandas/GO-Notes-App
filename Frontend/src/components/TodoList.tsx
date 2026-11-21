import { Flex, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import {useQuery}   from "@tanstack/react-query";
import { BASE_URL } from "../App";
export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

const TodoList = () => {
  const headingGradient = useColorModeValue(
    "linear(to-l, blue.600, cyan.800)",
    "linear(to-l, #0b85f8, #00ffff)"
  );
  const emptyStateColor = useColorModeValue("gray.600", "gray.500");
  const { data: todos , isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],

    queryFn: async () => {
      try{
        const res = await fetch(BASE_URL + "/todos");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch todos");
        }
        return data || [];
      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <>
      <Text fontSize={"4xl"}
       textTransform={"uppercase"}
       fontWeight={"bold"}
       textAlign={"center"}
       my={2}
       bgGradient={headingGradient}
        bgClip="text" >
        Today's Tasks
      </Text>
      {isLoading && (
        <Flex justifyContent={"center"} my={4}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!isLoading && todos?.length === 0 && (
        <Stack alignItems={"center"} gap='3'>
          <Text fontSize={"xl"} textAlign={"center"} color={emptyStateColor}>
            All tasks completed! 🤞
          </Text>
          <img src='/go.png' alt='Go logo' width={70} height={70} />
        </Stack>
      )}
      <Stack gap={3}>
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
};
export default TodoList;
