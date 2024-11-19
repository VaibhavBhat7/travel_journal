const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Create the uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Create unique filenames using timestamp and the original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes for trips
const tripsRoute = require('./routes/trips');
app.use('/api/trips', tripsRoute);

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Gallery Routes

// Get all images
app.get('/api/gallery', (req, res) => {
  const imagesDir = path.join(__dirname, 'uploads');
  const imageFiles = fs.readdirSync(imagesDir);

  const images = imageFiles.map((file) => ({
    filePath: `/uploads/${file}`,
  }));

  res.json(images);
});

// Upload image
app.post('/api/gallery/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  // Return the file path after upload
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Delete image
app.delete('/api/gallery/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file' });
      }
      res.status(200).json({ message: 'File deleted successfully' });
    });
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// Serve images from the uploads directory
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
