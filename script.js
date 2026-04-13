document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Smart Film Interactive Background Effect
    const glassLayer = document.getElementById('smart-glass-layer');
    
    // Create a smooth transition effect when moving the mouse
    // We use a radial gradient on the mask to reveal the crisp background underneath
    const handleMove = (e) => {
        let x, y;
        // Check if it's a touch event or a mouse event
        if (e.touches && e.touches.length > 0) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }
        
        // Use CSS mask to create a "clear" hole where the cursor/touch is
        glassLayer.style.webkitMaskImage = `radial-gradient(circle 300px at ${x}px ${y}px, transparent 20%, #000 80%)`;
        glassLayer.style.maskImage = `radial-gradient(circle 300px at ${x}px ${y}px, transparent 20%, #000 80%)`;
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: true });
    document.addEventListener('touchstart', handleMove, { passive: true });

    // Reset effect when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        glassLayer.style.webkitMaskImage = 'none';
        glassLayer.style.maskImage = 'none';
    });

    // 3. Form Validation and User Experience enhancements
    const form = document.getElementById('lead-form');
    const submitBtn = document.getElementById('submit-button');

    // We will dynamically set the _next URL to return to our page if we are on a custom domain,
    // or just let FormSubmit handle the default success page.
    const _nextInput = document.getElementById('next-url');
    _nextInput.value = window.location.href; // Redirects back to the same page after submission
    
    form.addEventListener('submit', (e) => {
        // FormSubmit actually handles the submission, we just add a loading state
        // to the button to improve UX while it redirects.
        submitBtn.innerHTML = 'Enviando... <span class="btn-glow"></span>';
        submitBtn.style.opacity = '0.8';
        submitBtn.style.pointerEvents = 'none';
    });
});
