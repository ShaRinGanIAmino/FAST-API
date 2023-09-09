import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTodoModal({ isOpen, closeModal, todo }) {
  const [editedTodoText, setEditedTodoText] = useState("");
  const [editedTodoDate, setEditedTodoDate] = useState("");

  const notifySuccess = () =>
    toast.success("Todo updated successfully!", { position: "top-center" });
  const notifyFailure = () =>
    toast.error("Todo couldn't be updated!", { position: "top-center" });

  //console.log(editedTodoDate);
  //console.log(editedTodoText);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedTodoText.trim() === "" || editedTodoDate === "") {
      toast.error("Please enter both text and date.", {
        position: "top-center",
      });
      return;
    }

    const strDate = editedTodoDate.toString();

    const url = `http://127.0.0.1:8000/todos/${todo}`;
    axios
      .patch(url, {
        id: todo,
        content: editedTodoText,
        limit: strDate,
      })
      .then(function (response) {
        console.log(response);
        notifySuccess();
      })
      .catch(function (error) {
        console.log(error);
        notifyFailure();
      });

    closeModal();
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center`}
    >
      <ToastContainer />
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Edited Todo Text
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter edited todo"
              value={editedTodoText}
              onChange={(e) => setEditedTodoText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Edited Todo Date
            </label>
            <input
              type="date"
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              value={editedTodoDate}
              onChange={(e) => setEditedTodoDate(e.target.value)}
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
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
