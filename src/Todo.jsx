import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import EditTodoModal from "./EditTodoModal";

const Todo = ({ text, date, id }) => {
  function check(targetDate) {
    // Parse the target date string into a Date object
    const targetDateTime = new Date(targetDate);
    // Get the current date and time
    const currentDate = new Date();

    // Compare the target date with the current date
    if (targetDateTime < currentDate) {
      return true; // The target date is in the past
    } else if (targetDateTime > currentDate) {
      return false; // The target date is in the future
    } else {
      return false; // The target date is today
    }
  }

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(0);

  const openEditModal = (id) => {
    setSelectedTodo(id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTodo(0);
    setEditModalOpen(false);
  };

  const notifySucess = () =>
    toast.success("Todo deleted sucessfully !", { position: "top-center" });
  const notifyFailure = () =>
    toast.error("Todo couldn't be deleted !", { position: "top-center" });

  const handleDelete = (todoId) => {
    // Make a DELETE request to the API endpoint for deleting a specific todo
    axios
      .delete(`http://127.0.0.1:8000/todos/${id}`)
      .then((response) => {
        console.log(response.data);
        notifySucess();
        // Update your component's state or perform any necessary actions
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
        notifyFailure();
        // Handle errors or show error messages to the user
      });
  };

  return (
    <div
      className={` flex flex-col justify-start items-center w-[90%] border-2 border-solid ${
        check(date) ? "border-red-300" : "border-green-300"
      } ${check(date) ? "bg-red-100" : "bg-green-100"}  rounded-md `}
    >
      <ToastContainer />
      <div className=" p-4 w-[90%]  ">
        <p className="mt-2 font-comic text-lg">{text}</p>
        <p className="mt-8 font-medium text-neutral-500">{date}</p>
      </div>
      <div className=" w-[90%] py-8 px-4 flex justify-between items-center ">
        <button
          onClick={handleDelete}
          className=" py-3 px-8 rounded-md font-medium border-none bg-red-500 text-white cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => openEditModal(id)}
          className="py-3 px-8 rounded-md font-medium border-none bg-orange-400 text-white cursor-pointer"
        >
          Edit
        </button>
        <EditTodoModal
          isOpen={editModalOpen}
          closeModal={closeEditModal}
          todo={selectedTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
