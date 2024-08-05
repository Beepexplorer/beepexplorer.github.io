const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'));
app.use(bodyParser.json());

app.post('/send-pdf', (req, res) => {
    const { html, fileName, userEmail } = req.body;

    pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
            console.error('PDF creation error:', err);
            return res.json({ success: false, error: 'PDF creation failed' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-password' // Replace with your password or app-specific password
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com', // Replace with your email
            to: userEmail,
            subject: 'Risk Matrix PDF',
            text: 'Please find attached your Risk Matrix PDF.',
            attachments: [{
                filename: fileName,
                content: buffer,
                contentType: 'application/pdf'
            }]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
                res.json({ success: false, error: 'Email sending failed' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ success: true });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});