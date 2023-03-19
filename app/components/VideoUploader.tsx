import { useState } from "react";
import axios from "axios";
import UploadModal from "./UploadModal"; // Import the UploadModal component

export function VideoUploader() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleSubmit = async (title, description, video) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        return { message: response.data.message };
      } else {
        throw new Error("An unknown error occurred.");
      }
    } catch (error) {
      throw new Error(error.message || "An error occurred during the upload.");
    }
  };

  return (
    <>
      <header className="bg-blue-500 text-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Streamify</h1>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="bg-white text-blue-500 font-semibold py-2 px-4 rounded"
            >
              Upload Video
            </button>
          </div>
        </div>
      </header>
      {uploadModalOpen && (
        <UploadModal
          onClose={() => setUploadModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
