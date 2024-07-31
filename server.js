import express from 'express';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { name, email, phone, vin, message } = req.body;
    const msg = {
        to: 'maceautomotive@gmail.com',
        from: 'maceautomotive@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nVIN: ${vin}\nMessage: ${message}`,
    };
    
    try {
        await sgMail.send(msg);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
        res.status(500).send('Email failed to send');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
