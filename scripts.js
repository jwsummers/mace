function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Ensure the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all nav links
    const navLinks = document.querySelectorAll("nav ul li a");

    // Add click event to each nav link
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute("href").substring(1); // Get the target section ID
            const targetSection = document.getElementById(targetId); // Get the target section element

            // Scroll to the target section
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});

