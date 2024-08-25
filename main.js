const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { config } = require('dotenv');
const fs = require('fs');

config();

const app = express();
const port = 3000;

// Configure AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    const files = req.files;
    const fileUrls = [];

    for (const file of files) {
      const fileStream = fs.createReadStream(file.path);
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: fileStream,
        ContentType: file.mimetype,
      };

      // Upload file to S3
      const command = new PutObjectCommand(params);
      await s3.send(command);

      // Construct the URL (optional)
      const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
      fileUrls.push(url);

      // Delete the file locally after uploading
      fs.unlinkSync(file.path);
    }

    res.json({
      message: 'Files uploaded successfully',
      urls: fileUrls,
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
