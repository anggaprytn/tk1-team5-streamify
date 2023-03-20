import { useState } from "react";

const UploadModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await onSubmit(title, description, video);
      setResponseMessage(response.message);
      setResponseError("");
    } catch (error) {
      setResponseError(error.message);
      setResponseMessage("");
    }
    setIsLoading(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed z-0 inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-md z-10">
          <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
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
              onChange={(e) => handleFileUpload(e)}
              className="w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              >
                Upload
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
};

export default UploadModal;
