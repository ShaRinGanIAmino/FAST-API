import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoModal({ isOpen, closeModal, length }) {
  const id = length + 1;
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");

  const notifySucess = () =>
    toast.success("Todo created sucessfully !", { position: "top-center" });
  const notifyFailure = () =>
    toast.error("Todo couldn't be created !", { position: "top-center" });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    if (todoText.trim() === "" || todoDate === "") {
      toast.error("Please enter both text and date.", {
        position: "top-center",
      });
      return;
    }
    const strDate = todoDate.toString();
    console.log(strDate);

    const url = "http://127.0.0.1:8000/todo";
    axios
      .post(url, {
        id: id,
        content: todoText,
        limit: strDate,
      })
      .then(function (response) {
        console.log(response);
        notifySucess();
      })
      .catch(function (error) {
        console.log(error);
        notifyFailure();
      });
    setTodoText("");
    setTodoDate("");
    closeModal();
  };

  return (
    // Modal backdrop
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center`}
    >
      <ToastContainer />
      {/* Modal content */}
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Todo Text
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Todo Date
            </label>
            <input
              type="date"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              value={todoDate}
              onChange={(e) => setTodoDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
