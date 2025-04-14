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
            if (i === slideIndex) {
                console.log(`Slider: Afbeelding ${slide.alt} geladen`);
            }
        });
    } catch (error) {
        console.error('Fout in showSlide:', error);
    }
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Preload afbeeldingen en start slider
function preloadImages() {
    let loaded = 0;
    slides.forEach((slide, i) => {
        const img = new Image();
        img.src = slide.src;
        img.onload = () => {
            loaded++;
            if (loaded === slides.length) {
                console.log(`Slider: Alle ${slides.length} afbeeldingen geladen`);
                showSlide(slideIndex);
                setInterval(nextSlide, 3200); // ~3 seconden
            }
        };
        img.onerror = () => {
            console.warn(`Slider: Kan ${slide.src} niet laden`);
        };
    });
}

if (slides.length > 0) {
    console.log(`Slider: ${slides.length} slides gevonden`);
    preloadImages();
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
