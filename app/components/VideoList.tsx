import { useEffect, useState } from "react";
import axios from "axios";

import EditModal from "./EditModal";

function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Delete
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this video?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={onDelete}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function VideoList() {
  let VideoList2 = VideoList;
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Video 1",
      desc: "Description of Video 1",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Video 2",
      desc: "Description of Video 2",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "Video 3",
      desc: "Description of Video 3",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 4,
      title: "Video 4",
      desc: "Description of Video 4",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: 5,
      title: "Video 5",
      desc: "Description of Video 5",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
  ]);
  const [editVideo, setEditVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  // Update handleDelete function to open the delete modal
  const handleDelete = (videoId) => {
    setVideoToDelete(videoId);
    setIsDeleteModalOpen(true);
  };

  // Add a function to close the delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  // Add a function to confirm deletion of the video
  const handleConfirmDelete = () => {
    setVideos(videos.filter((video) => video.id !== videoToDelete));
    handleCloseDeleteModal();
  };

  const handleEdit = (video) => {
    setEditVideo(video);
    setEditTitle(video.title);
    setEditDesc(video.desc);
  };

  const handleCloseEditModal = () => {
    setEditVideo(null);
  };

  const handleSaveEdit = () => {
    setVideos(
      videos.map((video) =>
        video.id === editVideo.id
          ? { ...video, title: editTitle, desc: editDesc }
          : video
      )
    );
    handleCloseEditModal();
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleConfirmDelete}
      />
      {editVideo && (
        <EditModal
          video={editVideo}
          onClose={handleCloseEditModal}
          onSave={(videoId, title, desc) => {
            setVideos(
              videos.map((video) =>
                video.id === videoId ? { ...video, title, desc } : video
              )
            );
            handleCloseEditModal();
          }}
        />
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <li key={video.id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <video
                src={video.url}
                controls
                preload="metadata"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
              ></video>
            </div>
            <h3 className="text-xl font-semibold mt-2">{video.title}</h3>
            <p className="text-gray-600">{video.desc}</p>
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => handleEdit(video)}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(video.id)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
