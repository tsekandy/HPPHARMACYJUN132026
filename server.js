import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png', 
      'image/webp',
      'application/pdf'
    ];
    const mimetype = allowedMimeTypes.includes(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, JPG, PNG, WEBP) and PDF files are allowed'));
    }
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // You'll need to set this
    pass: process.env.EMAIL_PASS || 'your-app-password'     // You'll need to set this
  }
});

// Mock Pesapal API endpoint
app.post('/api/pesapal/submit-order', async (req, res) => {
  try {
    const paymentData = req.body;
    
    // In a real implementation, you would:
    // 1. Validate the payment data
    // 2. Generate OAuth signature
    // 3. Make actual API call to Pesapal
    // 4. Return the redirect URL
    
    // Mock response for demonstration
    const mockResponse = {
      success: true,
      redirect_url: `https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestId?OrderTrackingId=MOCK_${Date.now()}`,
      order_tracking_id: `MOCK_${Date.now()}`,
      merchant_reference: paymentData.notification_id,
      status: 'PENDING'
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment processing failed' 
    });
  }
});

// File upload endpoint
app.post('/api/upload-prescription', upload.array('prescriptions', 10), async (req, res) => {
  try {
    const files = req.files;
    const customerInfo = req.body;
    
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    // Prepare email with attachments
    const attachments = files.map(file => ({
      filename: file.originalname,
      path: file.path
    }));

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'happypillspharmacy@gmail.com',
      subject: `New Prescription Upload - ${customerInfo.reference || 'HP-' + Date.now()}`,
      html: `
        <h2>New Prescription Upload</h2>
        <p><strong>Reference:</strong> ${customerInfo.reference || 'HP-' + Date.now()}</p>
        <p><strong>Customer Name:</strong> ${customerInfo.customerName || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${customerInfo.customerPhone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${customerInfo.customerEmail || 'Not provided'}</p>
        <p><strong>Number of Files:</strong> ${files.length}</p>
        <p><strong>Upload Time:</strong> ${new Date().toLocaleString()}</p>
        
        <h3>Uploaded Files:</h3>
        <ul>
          ${files.map(file => `<li>${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)</li>`).join('')}
        </ul>
        
        <p>Please review the attached prescription files and contact the customer for further processing.</p>
      `,
      attachments: attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return file information for WhatsApp message
    const fileInfo = files.map(file => ({
      name: file.originalname,
      size: file.size
    }));

    res.status(200).json({
      success: true,
      message: 'Files uploaded and email sent successfully',
      files: fileInfo,
      reference: customerInfo.reference || 'HP-' + Date.now()
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload files and send email'
    });
  }
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});