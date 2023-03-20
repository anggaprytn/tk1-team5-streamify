import React from "react";

const EditModal = ({ video, onClose, onSave }) => {
  const [editTitle, setEditTitle] = React.useState(video.title);
  const [editDesc, setEditDesc] = React.useState(video.description);
  const [editUrl, setEditUrl] = React.useState(video.url);

  const handleSave = () => {
    onSave(video.id, editTitle, editDesc, editUrl);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed z-0 inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-md z-10">
          <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full p-2 mb-4 h-20 border border-gray-300 rounded resize-none"
          ></textarea>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="w-full mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
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
        </div>
      </div>
    </div>
  );
};

export default EditModal;
