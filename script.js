const sounds = [];
for (let i = 1; i <= 12; i++) {
    const audio = new Audio(`sounds/sound${i}.mp3`);
    sounds.push(audio);
}

function playSoundBasedOnPosition(x, y) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const squareWidth = screenWidth / 3;
    const squareHeight = screenHeight / 4;

    const column = Math.floor(x / squareWidth);
    const row = Math.floor(y / squareHeight);
    const soundIndex = row * 3 + column;

    console.log('hitting in', soundIndex);

    sounds[soundIndex].play();
}

document.getElementById('screen').addEventListener('click', function(event) {
    const intensity = Math.random() * 0.5 + 0.5; // Random intensity between 0.5 and 1
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`; // Random color
    const duration = 1 / intensity; // Duration based on intensity

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = `${event.clientX}px`;
    circle.style.top = `${event.clientY}px`;
    circle.style.width = `50px`;
    circle.style.height = `50px`;
    circle.style.background = color;
    circle.style.animationDuration = `${duration}s`;

    for (let i = 0; i < 3 + Math.floor(Math.random() * 4); i++) { // 3 to 6 ripples
        const ripple = document.createElement('div');
        ripple.classList.add('circle');
        ripple.style.left = `${event.clientX}px`;
        ripple.style.top = `${event.clientY}px`;
        ripple.style.width = `0px`;
        ripple.style.height = `0px`;
        ripple.style.border = `2px solid ${color}`;
        ripple.style.animationName = 'ripple';
        ripple.style.animationDuration = `${duration + i * 0.1}s`; // Each ripple has a slight delay
        document.getElementById('screen').appendChild(ripple);
        setTimeout(() => ripple.remove(), (duration + i * 0.1) * 1000);
    }

    document.getElementById('screen').appendChild(circle);
    setTimeout(() => circle.remove(), duration * 1000);
    playSoundBasedOnPosition(event.clientX, event.clientY);
});

// Fullscreen toggle on double tap
document.getElementById('screen').addEventListener('dblclick', function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});
