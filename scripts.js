function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Ensure the document is fully loaded
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
});
