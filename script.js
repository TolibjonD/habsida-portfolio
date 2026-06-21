import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  const navLink = document.querySelector('header nav');
  const ctaButton = document.querySelector('header #cta-button');
  const navButton = document.getElementById('nav-button');

  if (navButton && navLink) {
    navButton.addEventListener('click', () => {
      navLink.classList.toggle('shown');
      if (ctaButton) ctaButton.classList.toggle('shown');
    });
  }
  const count = document.getElementById('count');
  if (count) {
    let counter = 0;
    const buttons = [
      {
        id: "plus",
        action: () => {
          document.getElementById("minus").disabled = false;
          counter++;
        },
      },
      {
        id: "minus",
        action: () =>
          counter > 0
            ? counter--
            : (document.getElementById("minus").disabled = true),
      },
      { id: "reset", action: () => (counter = 0) },
    ];

    buttons.forEach(({ id, action }) => {
      const btn = document.getElementById(id);
      if (btn) {  
        btn.addEventListener('click', () => {
          action();
          count.textContent = counter;
        });
      }
    });
  }

  const characterField = document.getElementById('characterField');
  const characterCount = document.getElementById('characterCount');
  const MAX_LENGTH = 120;

  if (characterField && characterCount) {
    function updateCount() {
      const length = characterField.value.length;
      characterCount.textContent = length;
      characterCount.classList.toggle('is-warning', length >= MAX_LENGTH);
    }
    characterField.addEventListener('input', updateCount);
    updateCount();
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_CHAT_ID;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Yuborilmoqda...';
      status.textContent = '';
      status.className = '';

      const formData = new FormData(form);

      const text = `
<b>Portfolio dan yangi xabar</b>

<b>Ism:</b> ${formData.get('name')}
<b>Email:</b> ${formData.get('email')}

<b>Xabar:</b>
${formData.get('message')}
      `.trim();

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: text,
              parse_mode: 'HTML',
            }),
          },
        );

        if (response.ok) {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
          status.textContent = 'Xabaringiz yuborildi! Tez orada javob beraman.';
          status.className = 'is-success';
          form.reset();
        } else {
          throw new Error('Yuborishda xato');
        }
      } catch (error) {
        console.log(error);
        status.textContent = 'Xato yuz berdi. Keyinroq urinib ko\'ring.';
        status.className = 'is-error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    });
  }
});
