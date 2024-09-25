import React, { useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';

const PrivacyPolicy = () => {
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');


  const URI = import.meta.env.VITE_API_URL;

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URI}api/privacy-policy`);
        console.log('Fetched data:', response.data); // Log the fetched data
        setPolicyData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [URI]);

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingItem(item);
    setEditorContent(item.description);
    setTitle(item.title);
    setIsEditing(true);
  };

  // Handle update logic
  const handleUpdate = async () => {
    try {
      const updatedItem = {
        title,
        description: editorContent,
      };

      // Correcting the update URL
      const response = await axios.put(`${URI}api/privacy-policy/${editingItem._id}`, updatedItem);

      setPolicyData((prevData) =>
        prevData.map((item) => (item._id === response.data._id ? response.data : item))
      );
      setIsEditing(false);
      setEditingItem(null);
      setTitle('');
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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Privacy Policy</h1>

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
            <JoditEditor
              value={editorContent}
              onChange={(content) => setEditorContent(content)}
              config={{
                readonly: false,
                height: 300,
                toolbarSticky: false,
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

        {policyData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policyData.map((item) => (
              <div key={item._id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h2>
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className="mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Update
                  </button>
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

export default PrivacyPolicy;
