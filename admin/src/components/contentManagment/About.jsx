import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import AboutGet from './AboutGet';

export const About = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // for description content
  const [file, setFile] = useState(null); // for file upload
  const [message, setMessage] = useState("");
  const URI = import.meta.env.VITE_API_URL;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', content);

    try {
      // Send a POST request to the backend
      const response = await fetch(`${URI}api/content-about`, {
        method: "POST",
        body: formData, // Send the FormData object
      });

      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();
        setMessage("Content submitted successfully!"); // Update the message on success
        console.log(result); // Handle response
      } else {
        setMessage("Failed to submit content. Please try again.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setMessage("An error occurred while submitting the content.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full">
     {/* <div className="about-container mx-auto p-6 bg-white rounded-lg shadow-md mt-0">
         <h1 className="text-3xl font-bold text-center mb-6">About Us</h1> 
         <form className="about-form" onSubmit={handleSubmit}>
          <div className="form-row mb-4 w-full">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state on input change
              placeholder="Enter title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
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
              onChange={(e) => setFile(e.target.files[0])} // Update file state on file selection
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="form-row mb-6">
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)} // Update content state
              required
            />
          </div>
          <div className="form-row">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form> 
        {message && <p className="mt-4 text-center text-green-500">{message}</p>} 
      </div>*/}

      <AboutGet/>
      
    </div>
  );
};
