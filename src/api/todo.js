import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const toogleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "todos", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const addTodo = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todos"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
const updateTodo = async ({ docId, title, description }) => {
  try {
    const todoRef = doc(db, "todos", docId);
    await updateDoc(todoRef, {
      title,
      description,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todos", docId);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};
export { toogleTodoStatus, addTodo, updateTodo, deleteTodo };
