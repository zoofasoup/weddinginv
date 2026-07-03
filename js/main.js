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
      bgMusic.volume = 0;
      bgMusic.play().then(() => {
        isPlaying = true;
        audioBtn.classList.remove('paused');
        // Fade in
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            bgMusic.volume = Math.min(vol, 1);
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      }).catch(err => {
        console.log("Audio autoplay blocked or file missing", err);
        audioBtn.classList.add('paused');
        audioIcon.className = 'fas fa-compact-disc';
      });
    }
  });

  // Audio toggle
  audioBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      audioBtn.classList.add('paused');
    } else {
      bgMusic.play();
      audioBtn.classList.remove('paused');
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

  // 4. Scroll Animations (Fade Up)
  const fadeElements = document.querySelectorAll('.fade-up');
  
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
  const copyBtns = document.querySelectorAll('.btn-copy');
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
  if (btnCalendar) {
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
  }

  // 7. Custom RSVP Form Submission (to Google Forms)
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-rsvp');
      const rsvpSuccess = document.getElementById('rsvp-success');
      
      // Update with your actual Google Form POST URL
      // e.g. https://docs.google.com/forms/d/e/1FAIpQLSc.../formResponse
      const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdusvIrNd5Ad4yP5gZrRDDDE8PIzuZtnBHjTsSpAeO9-o8tkw/formResponse';
      
      const formData = new FormData(rsvpForm);
      const data = new URLSearchParams(formData);

      submitBtn.innerText = 'Mengirim...';
      submitBtn.disabled = true;

      fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // Important: bypasses CORS policy for Google Forms
        body: data
      })
      .then(() => {
        // no-cors means we won't get a true success response, but we can assume it worked if no network error
        rsvpForm.reset();
        
        // Hide the form and show the beautiful thank you message
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
      })
      .catch(error => {
        console.error('Error submitting form', error);
        submitBtn.innerText = 'Gagal, coba lagi';
        submitBtn.disabled = false;
      });
    });
  }
});
