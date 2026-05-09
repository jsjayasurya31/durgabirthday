document.addEventListener('DOMContentLoaded', function () {
    const birthdayPopup  = document.getElementById('birthdayPopup');
    const playSongBtn    = document.getElementById('playSongBtn');
    const myBirthdaySong = document.getElementById('mybirthdaySong');
    const centerText     = document.getElementById('centerText');
    const slideshow      = document.getElementById('slideshow');
    const slideshowImg   = document.getElementById('slideshowImg');
    const slideCounter   = document.getElementById('slideCounter');

    // ✅ Direct-ஆ photos array
    let uploadedImages = [
        'd1.jpeg',
        'd2.jpeg',
        'd3.jpeg',
        'd4.jpeg'
    ];

    playSongBtn.addEventListener('click', function () {
        myBirthdaySong.load();
        myBirthdaySong.play()
            .then(() => {
                birthdayPopup.style.opacity = '0';
                setTimeout(() => {
                    birthdayPopup.style.display = 'none';
                    centerText.style.display = 'block';
                    buildDots(uploadedImages.length);
                    startSlideshow(uploadedImages);
                }, 500);

                createCelebration();
                setInterval(createCelebration, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Click OK to play!');
            });

        myBirthdaySong.loop = true;
    });

    function buildDots(count) {
        slideCounter.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
            slideCounter.appendChild(dot);
        }
    }

    function setActiveDot(index) {
        document.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function startSlideshow(images) {
        let current = 0;
        slideshow.classList.add('active');

        function showImage(index) {
            slideshowImg.classList.remove('visible');
            setTimeout(() => {
                slideshowImg.src = images[index];
                setActiveDot(index);
                slideshowImg.onload = () => slideshowImg.classList.add('visible');
                if (slideshowImg.complete) slideshowImg.classList.add('visible');
            }, 800);
        }

        showImage(0);
        setInterval(() => {
            current = (current + 1) % images.length;
            showImage(current);
        }, 4000);
    }
});

function createCelebration() {
    const elements = ['🎉', '🎂', '✨', '💖', '🎈'];
    for (let i = 0; i < 20; i++) {
        const div = document.createElement('div');
        div.innerText = elements[Math.floor(Math.random() * elements.length)];
        div.style.position = 'fixed';
        div.style.left = Math.random() * 100 + 'vw';
        div.style.top = '-60px';
        div.style.fontSize = (Math.random() * 20 + 20) + 'px';
        div.style.zIndex = '999';
        div.style.transition = 'transform 4s linear, opacity 4s';
        document.body.appendChild(div);
        setTimeout(() => {
            div.style.transform = `translateY(115vh) rotate(${Math.random() * 720}deg)`;
            div.style.opacity = '0';
        }, 100);
        setTimeout(() => div.remove(), 4000);
    }
}
