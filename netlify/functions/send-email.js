const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
    try {
        const { name, email, phone, vin, message } = JSON.parse(event.body);

        const msg = {
            to: 'maceautomotive@gmail.com',
            from: 'maceautomotive@gmail.com',
            subject: 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nVIN: ${vin}\nMessage: ${message}`,
        };

        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Email failed to send' }),
        };
    }
};
