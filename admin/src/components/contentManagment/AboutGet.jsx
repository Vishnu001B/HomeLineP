import React, { useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';

const AboutGet = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${URI}api/content-about`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [URI]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditorContent(item.description);
    setTitle(item.title);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('description', editorContent);
      formData.append('title', title);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch(`${URI}api/content-about/about/${editingItem._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedItem = await response.json();
      setAboutData((prevData) =>
        prevData.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      setIsEditing(false);
      setEditingItem(null);
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 text-lg">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Us</h1>

        {isEditing && editingItem ? (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Content</h2>
            <div className="form-row mb-4">
              <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="form-row mb-4">
              <label htmlFor="file" className="block text-lg font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <JoditEditor
              value={editorContent}
              onChange={(content) => setEditorContent(content)}
              config={{
                readonly: false,
                height: 300,
                toolbarSticky: false,
                // Add other JoditEditor configurations here
              }}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="ml-4 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {aboutData.length > 0 ? (
          <div className="w-full">
            {aboutData.map((item) => (
              <div key={item._id} className="flex  items-center mb-8">
                <div className='max-h-screen'>
                <img
                  src={`${URI}uploads/${item.filename}`}
                  alt={item.title}
                  className="w-full max-h-screen mb-4 rounded-md"
                />
                </div>
                <div className="p-6 max-w-3xl w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
                  <div
                    className="text-gray-700 leading-relaxed mb-6 overflow-auto"
                    style={{ maxHeight: '300px' }} // Adjust the maxHeight as needed
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No data available</p>
        )}
      </div>
    </div>
  );
};

export default AboutGet;
