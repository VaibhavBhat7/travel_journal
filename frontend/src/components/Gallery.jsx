import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gallery.css';

const GalleryPage = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  // Fetch images from the backend when the component is mounted
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images from the server
  const fetchImages = () => {
    axios
      .get('http://localhost:5000/api/gallery') // Adjust if your API endpoint differs
      .then((response) => {
        setImages(response.data); // Backend must return an array of image objects or file paths
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching images from the server');
      });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setError(''); // Clear any previous errors
  };

  // Handle form submission to upload an image
  const handleImageUpload = (e) => {
    e.preventDefault();

    if (!image) {
      setError('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    axios
      .post('http://localhost:5000/api/gallery/upload', formData)
      .then((response) => {
        setImages([...images, response.data]); // Add new image to the gallery
        setImage(null); // Reset the file input
        setError(''); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setError('Error uploading the image');
      });
  };

  // Handle deleting an image
  const handleDeleteImage = (filename) => {
    axios
      .delete(`http://localhost:5000/api/gallery/${filename}`) // DELETE endpoint
      .then(() => {
        setImages(images.filter((img) => img.filePath !== `/uploads/${filename}`)); // Remove deleted image from state
      })
      .catch((err) => {
        console.error(err);
        setError('Error deleting the image');
      });
  };

  return (
    <div className="gallery-page">
      <h2>Gallery</h2>

      <div className="upload-form">
        <h3>Upload an Image</h3>
        <form onSubmit={handleImageUpload}>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <button type="submit">Upload</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="image-gallery">
        <h3>Images</h3>
        <div className="gallery-images">
          {images.length > 0 ? (
            images.map((image, index) => (
              <div className="gallery-image" key={index}>
                <img
                  src={`http://localhost:5000${image.filePath}`} // Ensure this matches the backend response
                  alt={`Gallery Image ${index}`}
                />
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteImage(image.filePath.split('/').pop())
                  }
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No images uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
