document.addEventListener('DOMContentLoaded', function () {
    const birthdayPopup   = document.getElementById('birthdayPopup');
    const playSongBtn     = document.getElementById('playSongBtn');
    const myBirthdaySong  = document.getElementById('mybirthdaySong');
    const centerText      = document.getElementById('centerText');
    const imageUpload     = document.getElementById('imageUpload');
    const uploadStatus    = document.getElementById('uploadStatus');
    const slideshow       = document.getElementById('slideshow');
    const slideshowImg    = document.getElementById('slideshowImg');
    const slideCounter    = document.getElementById('slideCounter');
 
    let uploadedImages = [
        'd1.jpeg','d2.jpeg','d3.jpeg','d4.jpeg'
    ]; // Will hold object URLs of uploaded images
 
    // ── Image Upload Handling ──────────────────────────────────────
    imageUpload.addEventListener('change', function () {
        const files = Array.from(this.files);
        if (files.length === 0) return;
 
        // Release old object URLs to free memory
        uploadedImages.forEach(url => URL.revokeObjectURL(url));
        uploadedImages = files.map(file => URL.createObjectURL(file));
 
        uploadStatus.textContent = `✅ ${files.length} photo${files.length > 1 ? 's' : ''} ready!`;
        uploadStatus.classList.add('ready');
    });
 
    // ── Play Button Click ──────────────────────────────────────────
    playSongBtn.addEventListener('click', function () {
        myBirthdaySong.load();
        myBirthdaySong.play()
            .then(() => {
                // Fade out & hide popup
                birthdayPopup.style.opacity = '0';
                setTimeout(() => {
                    birthdayPopup.style.display = 'none';
 
                    // Show birthday text
                    centerText.style.display = 'block';
 
                    // Start slideshow if images were uploaded
                    if (uploadedImages.length > 0) {
                        buildDots(uploadedImages.length);
                        startSlideshow(uploadedImages);
                    }
                }, 500);
 
                // Emoji celebration
                createCelebration();
                setInterval(createCelebration, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Click OK to play!');
            });
 
        myBirthdaySong.loop = true;
    });
 
    // ── Build dot indicators ───────────────────────────────────────
    function buildDots(count) {
        slideCounter.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            slideCounter.appendChild(dot);
        }
    }
 
    function setActiveDot(index) {
        document.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
 
    // ── Slideshow Logic ────────────────────────────────────────────
    function startSlideshow(images) {
        let current = 0;
        slideshow.classList.add('active');
 
        function showImage(index) {
            // Fade out current image
            slideshowImg.classList.remove('visible');
 
            setTimeout(() => {
                slideshowImg.src = images[index];
                setActiveDot(index);
 
                // Fade in new image once loaded
                slideshowImg.onload = () => {
                    slideshowImg.classList.add('visible');
                };
 
                // In case image is already cached
                if (slideshowImg.complete && slideshowImg.naturalWidth > 0) {
                    slideshowImg.classList.add('visible');
                }
            }, 800); // Wait for fade-out to finish before switching src
        }
 
        // Show first image immediately
        showImage(0);
 
        // Advance every 4 seconds
        setInterval(() => {
            current = (current + 1) % images.length;
            showImage(current);
        }, 4000);
    }
});
 
// ── Emoji Celebration ──────────────────────────────────────────────
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
 
        setTimeout(() => { div.remove(); }, 4000);
    }
}
 