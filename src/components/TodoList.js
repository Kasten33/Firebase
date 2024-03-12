"use client";
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toogleTodoStatus } from "../api/todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todos"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      const ar = [];
      querySnapshot.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };
  useEffect(() => {
    refreshData();
  }, [user]);
  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      deleteTodo(id);
      toast({
        title: "Todo deleted successfully",
        status: "success",
      });
    }
  };
  const handleToggle = async (id, status) => {
    const newStatus = status === "Completed" ? "Pending" : "Completed";
    await toogleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked as ${newStatus}`,
      status: "success",
    });
  };
  const handleEdit = async (todo) => {
    setEditTodo(...todo);
  };
  const handleEditTodo = async () => {
    if (!editTodo) {
      return;
    }
    await updateDoc(doc(db, "todos", editTodo.id), {
      title: editTodo.title,
      description: editTodo.description,
    });
    toast({
      title: "Todo updated successfully",
      status: "success",
    });
    setEditTodo(null);
    refreshData();
  };
  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {todos.map((todo) => (
          <Box
            key={todo.id}
            p={3}
            shadow={"dark-lg"}
            transition="0.2s"
            _hover={{ boxShadow: "sm" }}
          >
            <Heading as="h3" fontSize={"xl"}>
              <Badge
                color="red.500"
                bg="inherit"
                transition={"0.2s"}
                _hover={{ bg: "inherit", transform: "scale(1.2)" }}
                float="right"
                size="xs"
                onClick={() => handleDelete(todo.id)}
              >
                <FaTrash />
              </Badge>
              <Badge
                color={todo.status === "pending" ? "grey.500" : "green.500"}
                bg="inherit"
                transition={"0.2s"}
                _hover={{ bg: "inherit", transform: "scale(1.2)" }}
                float="right"
                size="xs"
                onClick={() => handleToggle(todo.id, todo.status)}
              >
                {todo.status === "pending" ? <FaToggleOff /> : <FaToggleOn />}
              </Badge>
              <Badge
                float="right"
                opacity="0.8"
                bg={todo.status === "pending" ? "yellow.500" : "green.500"}
              >
                {todo.status}
              </Badge>
              {editTodo && editTodo.id === todo.id ? (
                <Box>
                  <Text>Title</Text>
                  <Input
                    type="text"
                    value={editTodo.title}
                    onChange={(e) =>
                      setEditTodo({ ...editTodo, title: e.target.value })
                    }
                  />
                </Box>
              ) : (
                <Text>{todo.title}</Text>
              )}
            </Heading>

            {editTodo && editTodo.id === todo.id ? (
              <Box>
                <Text>Description</Text>
                <Textarea
                  type="text"
                  value={editTodo.description}
                  onChange={(e) =>
                    setEditTodo({ ...editTodo, description: e.target.value })
                  }
                />
              </Box>
            ) : (
              <Text>{todo.description}</Text>
            )}
            {editTodo && editTodo.id === todo.id ? (
              <Button onClick={handleEdit} colorScheme="blue">
                Save
              </Button>
            ) : (
              <Button
                onClick={() => handleEditTodo(todo)}
                varient="solid"
                colorScheme="blue"
              >
                Edit
              </Button>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default TodoList;
