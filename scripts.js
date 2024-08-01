document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        vin: document.getElementById('vin').value,
        message: document.getElementById('message').value,
    };

    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok) {
            alert('Email sent successfully!');
            document.getElementById('contact-form').reset();
        } else {
            alert('Error sending email.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending email.');
    });
});
