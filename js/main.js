document.addEventListener('DOMContentLoaded', () => {
  // 1. Get Guest Name from URL Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get('to');
  const guestNameElement = document.getElementById('guest-name');
  
  if (guestNameParam) {
    // Replace + or %20 with space and set name
    guestNameElement.textContent = guestNameParam.replace(/\+/g, ' ');
  } else {
    guestNameElement.textContent = "Bapak/Ibu/Saudara/i";
  }

  // 2. Cover Screen and Audio Logic
  const btnOpen = document.getElementById('btn-open');
  const coverScreen = document.getElementById('cover-screen');
  const body = document.body;
  const bgMusic = document.getElementById('bg-music');
  const audioBtn = document.getElementById('audio-btn');
  const audioIcon = audioBtn.querySelector('i');
  
  let isPlaying = false;

  btnOpen.addEventListener('click', () => {
    coverScreen.classList.add('open');
    body.classList.remove('locked'); // Enable scroll
    
    // Play audio
    if (bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        audioBtn.classList.remove('paused');
      }).catch(err => {
        console.log("Audio autoplay blocked or file missing", err);
        audioBtn.classList.add('paused');
        audioIcon.className = 'fas fa-music-slash';
      });
    }
  });

  // Audio toggle
  audioBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      audioBtn.classList.add('paused');
      audioIcon.className = 'fas fa-music-slash';
    } else {
      bgMusic.play();
      audioBtn.classList.remove('paused');
      audioIcon.className = 'fas fa-music';
    }
    isPlaying = !isPlaying;
  });

  // 3. Countdown Timer to 15 August 2026, 09:00 WIB (UTC+7)
  // getTime() gets ms since epoch. We set it specifically.
  const weddingDate = new Date('2026-08-15T09:00:00+07:00').getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById('days').innerText = "00";
      document.getElementById('hours').innerText = "00";
      document.getElementById('minutes').innerText = "00";
      document.getElementById('seconds').innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
  };

  updateCountdown(); // initial call
  setInterval(updateCountdown, 1000);

  // 4. Scroll Animations (Fade In)
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const checkFade = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    fadeElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', checkFade);
  checkFade(); // initial check

  // 5. Copy to Clipboard
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const textToCopy = document.getElementById(targetId).innerText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerText;
        btn.innerText = "Tersalin!";
        setTimeout(() => {
          btn.innerText = originalText;
        }, 2000);
      });
    });
  });

  // 6. Add to Calendar logic
  const btnCalendar = document.getElementById('btn-calendar');
  btnCalendar.addEventListener('click', (e) => {
    e.preventDefault();
    const title = 'Syukuran Walimah Zufar & Salma';
    const location = 'Jelita Venue & Sakha Cafe, Bogor';
    const details = 'Syukuran Walimah Ahmad Zufar Sidqi & Salma Mahlida Ailiya Passe';
    // Format: YYYYMMDDTHHmmssZ
    // 15 Aug 2026 09:00 WIB = 15 Aug 2026 02:00 UTC
    const startTime = '20260815T020000Z';
    const endTime = '20260815T060000Z'; // 13:00 WIB
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  });
});
