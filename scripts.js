function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {
    const navLinksContainer = document.querySelector('.nav-links');
    const menuIcon = document.getElementById('menu-icon');
    const navItems = document.querySelectorAll('.nav-links li a');
    const infoButtons = document.querySelectorAll('.info-button');
    const closeButtons = document.querySelectorAll('.close-button');
    const serviceCards = document.querySelectorAll('.service-card');

    // Smooth scrolling for nav links
    navItems.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Mobile menu toggle
    if (menuIcon && navLinksContainer) {
        menuIcon.addEventListener('click', function () {
            navLinksContainer.classList.toggle('show');
        });
    } else {
        console.error("Menu icon or nav links container not found.");
    }

    // Close the menu when clicking on a nav item or leaving the nav links container
    function closeMenu() {
        navLinksContainer.classList.remove('show');
    }

    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    navLinksContainer.addEventListener('mouseleave', closeMenu);

    // Flip card functionality
    function handleCardFlip(event) {
        event.stopPropagation();
        const serviceCard = this.closest('.service-card');
        if (serviceCard) {
            serviceCard.classList.toggle('flipped');
        }
    }

    infoButtons.forEach(button => {
        button.addEventListener('click', handleCardFlip);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', handleCardFlip);
    });

    // Adjust flip card behavior for mobile and desktop
    function addMobileCloseFunctionality() {
        if (window.innerWidth <= 768) {
            closeButtons.forEach(button => {
                button.addEventListener('click', handleCardFlip);
            });
        } else {
            closeButtons.forEach(button => {
                button.removeEventListener('click', handleCardFlip);
            });
            serviceCards.forEach(card => {
                card.addEventListener('mouseleave', function () {
                    this.classList.remove('flipped');
                });
            });
        }
    }

    addMobileCloseFunctionality();
    window.addEventListener('resize', addMobileCloseFunctionality);
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
