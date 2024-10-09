document.addEventListener('DOMContentLoaded', () => {
    const animatedSections = document.querySelectorAll('.about-content, .expertise-grid, .projects-grid, .contact-content');
    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScroll = () => {
        animatedSections.forEach((section) => {
            if (isInViewport(section)) {
                section.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Particle background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particles-bg').appendChild(renderer.domElement);

    const particles = new THREE.BufferGeometry();
    const particleCount = 5000;

    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00ffff
    });

    const particlesMesh = new THREE.Points(particles, material);
    scene.add(particlesMesh);

    camera.position.z = 2;

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        renderer.render(scene, camera);
    };

    animate();

    // Expertise icons
    const expertiseItems = document.querySelectorAll('.expertise-item');
    expertiseItems.forEach(item => {
        const tech = item.getAttribute('data-tech');
        const icon = item.querySelector('.expertise-icon');
        icon.style.backgroundImage = `url('images/${tech.toLowerCase()}-icon.svg')`;
    });

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-content p');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Form submission (you'll need to implement the server-side handling)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });

    // Hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});