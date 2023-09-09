import { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";
import TodoModal from "./TodoModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [todos, setTodos] = useState([]);
  const [size, setSize] = useState(todos.length);
  const url = "http://127.0.0.1:8000/todos";

  useEffect(() => {
    axios.get(url).then((response) => {
      setTodos(response.data.todos);
      setSize(todos.length);
    });
  }, [todos]);

  if (!todos) return null;
  return (
    <div className=" mt-4 w-full h-[100vh] flex justify-center items-center flex-col gap-4 py-6">
      <ToastContainer />
      <section className=" w-full flex flex-col gap-5 justify-start items-center px-2 py-10 h-5/6 border-y-[1px] border-neutral-200 overflow-y-auto ">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            id={todo.id}
            text={todo.content}
            date={todo.limit}
          />
        ))}
      </section>
      <button
        onClick={openModal}
        className=" py-3 px-8 rounded-md font-medium border-none bg-green-500 text-white cursor-pointer"
      >
        {" "}
        Create Todo
      </button>
      <TodoModal isOpen={isModalOpen} closeModal={closeModal} length={size} />
    </div>
  );
};

export default App;
