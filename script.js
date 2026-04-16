document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const spotlight = document.getElementById('spotlight');
    const hint = document.querySelector('.hidden-hint');

    // Theme Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // Mouse Move & Hint Logic
    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';

        const rect = hint.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (rect.left + rect.width/2), e.clientY - (rect.top + rect.height/2));
        hint.style.opacity = dist < 150 ? (1 - dist/150).toFixed(2) : 0;
    });

    // Easter Egg
    let buffer = "";
    window.addEventListener('keydown', (e) => {
        buffer = (buffer + e.key.toLowerCase()).slice(-5);
        if (buffer === "ghost") {
            document.documentElement.style.setProperty('--accent', '#a855f7');
            spotlight.style.filter = "hue-rotate(270deg) blur(20px)";
            hint.textContent = "GHOST MODE ACTIVE";
            hint.style.opacity = 1;
            buffer = "";
        }
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('active'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});