function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    const navLinksContainer = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const navItems = document.querySelectorAll('.nav-links li a');

    function toggleMenu() {
        navLinksContainer.classList.toggle('show');
    }

    function closeMenu() {
        navLinksContainer.classList.remove('show');
    }

    menuIcon.addEventListener('click', toggleMenu);

    // Optionally close the menu when the mouse leaves the nav links container
    navLinksContainer.addEventListener('mouseleave', closeMenu);

    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Flip card functionality
    const infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const serviceCard = this.closest('.service-card');
            serviceCard.classList.add('flipped');
        });
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseleave', function() {
            this.classList.remove('flipped');
        });
    });
});

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
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Email sent successfully') {
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