# S3 File Upload with Node.js Express and AWS SDK v3

This is a Node.js application that allows users to upload files to an AWS S3 bucket using the AWS SDK v3 and Multer. The application supports uploading multiple files simultaneously, and it returns the URLs of the uploaded files.

## Features

-  Upload multiple files to an S3 bucket.
-  Generate public URLs for the uploaded files.
-  Automatically deletes the files from the local server after uploading to S3.

## Prerequisites

-  **Node.js** (version 12.x or higher)
-  **AWS Account** with an S3 bucket.
-  **AWS IAM User** with the necessary permissions to upload files to the S3 bucket.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mizanmahi/upload-file-s3-sdk-v3.git
   cd upload-file-s3-sdk-v3
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:

   ```plaintext
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-aws-region
   S3_BUCKET_NAME=your-s3-bucket-name
   ```

   Replace `your-access-key-id`, `your-secret-access-key`, `your-aws-region`, and `your-s3-bucket-name` with your actual AWS credentials and bucket information.

## Running the Application

To start the application, use the following command:

```bash
npm start
```

Or, if you are using `yarn`:

```bash
yarn start
```

The application will run on `http://localhost:3000`.

## Usage

### Uploading Files

You can upload multiple files to the S3 bucket by making a POST request to the `/upload` endpoint.

-  **Endpoint**: `/upload`
-  **Method**: `POST`
-  **Content-Type**: `multipart/form-data`
-  **Parameters**: `files` (array of files)

Example using `curl`:

```bash
curl -X POST http://localhost:3000/upload \
  -H "Content-Type: multipart/form-data" \
  -F "files=@/path/to/your/file1.jpg" \
  -F "files=@/path/to/your/file2.jpg"
```

### Response

On a successful upload, the server will return a JSON response containing the URLs of the uploaded files:

```json
{
   "message": "Files uploaded successfully",
   "urls": [
      "https://your-bucket-name.s3.your-region.amazonaws.com/1630118474553_file1.jpg",
      "https://your-bucket-name.s3.your-region.amazonaws.com/1630118474560_file2.jpg"
   ]
}
```

## Project Structure

-  **app.js**: Main application file containing the Express server setup.
-  **uploads/**: Temporary directory where uploaded files are stored before being uploaded to S3.
-  **.env**: Environment variables configuration file.

## AWS S3 Configuration

To use this application, ensure that your S3 bucket has the appropriate permissions set. You can make your bucket publicly accessible if you want the uploaded files to be accessible via the URLs returned by the application.

Here’s an example bucket policy that allows public read access to objects in the bucket:

```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-s3-bucket-name/*"
      }
   ]
}
```

Replace `your-s3-bucket-name` with your actual bucket name.

## License

This project is licensed under the MIT License.
