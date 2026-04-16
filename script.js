document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const spotlight = document.getElementById('spotlight');
    const hint = document.querySelector('.hidden-hint');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';

        const hintRect = hint.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (hintRect.left + hintRect.width/2), e.clientY - (hintRect.top + hintRect.height/2));
        
        if (dist < 150) {
            hint.style.opacity = (1 - dist/150).toFixed(2);
        } else {
            hint.style.opacity = 0;
        }
    });

    let inputBuffer = "";
    window.addEventListener('keydown', (e) => {
        inputBuffer += e.key.toLowerCase();
        if (inputBuffer.length > 5) inputBuffer = inputBuffer.substring(1);
        if (inputBuffer === "ghost") {
            document.documentElement.style.setProperty('--accent', '#a855f7');
            spotlight.style.filter = "hue-rotate(270deg) blur(15px)";
            hint.textContent = "GHOST MODE ACTIVE";
            hint.style.color = "#a855f7";
            hint.style.opacity = "1";
            alert("Ghost Mode Activated");
            inputBuffer = "";
        }
    });

    const reveal = () => {
        const displays = document.querySelectorAll('.reveal');
        displays.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal();
});