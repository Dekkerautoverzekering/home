// Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    try {
        if (slides.length === 0) {
            console.warn('Geen slides beschikbaar');
            return;
        }
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === slideIndex);
        });
        console.log(`Slider: Toon slide ${slideIndex + 1}/${slides.length}`);
    } catch (error) {
        console.error('Fout in showSlide:', error);
    }
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Start de slider
if (slides.length > 0) {
    console.log(`Slider: ${slides.length} slides gevonden`);
    showSlide(slideIndex);
    setInterval(nextSlide, 3000); // Wissel elke 3 seconden
} else {
    console.warn('Geen slides gevonden. Controleer de images-map.');
}

// Smooth Scroll for Navigation (exclusief Offerte)
document.querySelectorAll('.nav a:not([href*="offerteverzoek"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Update active class
        document.querySelectorAll('.nav a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});