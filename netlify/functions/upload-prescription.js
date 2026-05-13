import nodemailer from 'nodemailer';
import Busboy from 'busboy';

export const config = {
  bodyParser: false,
};

function parseMultipart(event) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: { 'content-type': event.headers['content-type'] },
      limits: { fileSize: 10 * 1024 * 1024 },
    });

    const fields = {};
    const files = [];

    busboy.on('field', (name, value) => {
      fields[name] = value;
    });

    busboy.on('file', (name, stream, info) => {
      const { filename, mimeType } = info;
      const allowed = /\.(jpg|jpeg|png|webp|pdf)$/i.test(filename);
      if (!allowed) { stream.resume(); return; }

      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        files.push({ filename, mimeType, content: Buffer.concat(chunks) });
      });
    });

    busboy.on('finish', () => resolve({ fields, files }));
    busboy.on('error', reject);

    const body = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : Buffer.from(event.body || '', 'utf8');

    busboy.write(body);
    busboy.end();
  });
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const contentType = req.headers.get('content-type') || '';

    // Build a fake event object for busboy
    const bodyBuffer = await req.arrayBuffer();
    const bodyBase64 = Buffer.from(bodyBuffer).toString('base64');

    const event = {
      headers: { 'content-type': contentType },
      body: bodyBase64,
      isBase64Encoded: true,
    };

    const { fields, files } = await parseMultipart(event);

    if (!files || files.length === 0) {
      return Response.json({ success: false, error: 'No files uploaded' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const attachments = files.map((f) => ({
      filename: f.filename,
      content: f.content,
      contentType: f.mimeType,
    }));

    const reference = fields.reference || `HP-${Date.now()}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'happypillspharmacy@gmail.com',
      subject: `New Prescription Upload - ${reference}`,
      html: `
        <h2>New Prescription Upload</h2>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Customer Name:</strong> ${fields.customerName || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${fields.customerPhone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${fields.customerEmail || 'Not provided'}</p>
        <p><strong>Files:</strong> ${files.length}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <ul>${files.map((f) => `<li>${f.filename}</li>`).join('')}</ul>
        <p>Please review the attached files and contact the customer for further processing.</p>
      `,
      attachments,
    });

    return Response.json({
      success: true,
      reference,
      files: files.map((f) => ({ name: f.filename, size: f.content.length })),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
};
