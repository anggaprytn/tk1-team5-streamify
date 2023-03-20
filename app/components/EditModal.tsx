import React, { useState } from "react";
import axios from "axios";

function EditModal({ isOpen, onClose, onSave, video }) {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("video", file);
    }

    try {
      await axios.post(
        `https://binus.masuk.id/api/video/${video.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponseMessage("Video updated successfully.");
      setResponseError("");
      onSave();
    } catch (error) {
      setResponseError("Error updating video.");
      setResponseMessage("");
      console.error("Error updating video:", error);
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed z-0 inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-md z-10">
          <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
          {isLoading && (
            <div className="flex justify-center items-center my-4">
              <div className="loader ease-linear rounded-full border-4 border-transparent border-t-blue-500 h-12 w-12 animate-spin"></div>
            </div>
          )}
          {responseMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {responseMessage}
            </div>
          )}
          {responseError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {responseError}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
