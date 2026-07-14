document.addEventListener('DOMContentLoaded', () => {
  // 1. Get Guest Name from URL Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get('to');
  const guestNameElement = document.getElementById('guest-name');
  
  if (guestNameParam) {
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
    body.classList.remove('locked');
    
    // Play audio with fade in from the beginning
    if (bgMusic) {
      bgMusic.currentTime = 0;
      
      // iOS doesn't support programmatic volume changes, it will just play at hardware volume
      try { bgMusic.volume = 0; } catch(e) {}
      
      bgMusic.play().then(() => {
        isPlaying = true;
        audioBtn.classList.remove('paused');
        
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            try { bgMusic.volume = Math.min(vol, 1); } catch(e) {}
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      }).catch(err => {
        console.log("Audio autoplay blocked or file missing", err);
        audioBtn.classList.add('paused');
      });
      
      // Robust loop fallback for mobile Safari which often ignores the 'loop' attribute
      bgMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
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
  const weddingDate = new Date('2026-08-15T09:00:00+07:00').getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    if (distance < 0) {
      if (elDays) elDays.innerText = "00";
      if (elHours) elHours.innerText = "00";
      if (elMinutes) elMinutes.innerText = "00";
      if (elSeconds) elSeconds.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.innerText = days.toString().padStart(2, '0');
    if (elHours) elHours.innerText = hours.toString().padStart(2, '0');
    if (elMinutes) elMinutes.innerText = minutes.toString().padStart(2, '0');
    if (elSeconds) elSeconds.innerText = seconds.toString().padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Scroll Animations (Fade Up)
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const checkFade = () => {
    const triggerBottom = window.innerHeight * 0.88;
    
    fadeElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', checkFade);
  checkFade();

  // 5. Copy to Clipboard
  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const textToCopy = document.getElementById(targetId).innerText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> &nbsp;Tersalin!';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 2000);
      });
    });
  });

  // 6. Add to Calendar
  const btnCalendar = document.getElementById('btn-calendar');
  if (btnCalendar) {
    btnCalendar.addEventListener('click', (e) => {
      e.preventDefault();
      const title = 'Syukuran Walimah Zufar & Salma';
      const location = 'Jelita Venue & Sakha Cafe, Bogor';
      const details = 'Syukuran Walimah Ahmad Zufar Sidqi & Salma Mahlida Ailiya Passe';
      const startTime = '20260815T020000Z';
      const endTime = '20260815T060000Z';
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
      
      window.open(googleCalendarUrl, '_blank');
    });
  }

  // 7. Gift Button Toggle
  const btnGift = document.getElementById('btn-gift');
  const giftInfo = document.getElementById('gift-info');
  if (btnGift && giftInfo) {
    btnGift.addEventListener('click', () => {
      if (giftInfo.style.display === 'none') {
        giftInfo.style.display = 'block';
        btnGift.innerHTML = '<i class="fas fa-times"></i> &nbsp;Tutup';
      } else {
        giftInfo.style.display = 'none';
        btnGift.innerHTML = '<i class="fas fa-gift"></i> &nbsp;Buka Rekening';
      }
    });
  }

  // 8. RSVP Form Submission (to Google Forms)
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('btn-submit-rsvp');
      const rsvpSuccess = document.getElementById('rsvp-success');
      
      const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdusvIrNd5Ad4yP5gZrRDDDE8PIzuZtnBHjTsSpAeO9-o8tkw/formResponse';
      
      const formData = new FormData(rsvpForm);
      const data = new URLSearchParams(formData);

      submitBtn.innerText = 'Mengirim...';
      submitBtn.disabled = true;

      fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      })
      .then(() => {
        rsvpForm.reset();
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
