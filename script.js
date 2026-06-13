import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  const navLink = document.querySelector('header nav');
  const navLinks = document.querySelectorAll('header nav ul li a');
  const ctaButton = document.querySelector('header #cta-button');
  const navButton = document.getElementById('nav-button');

  const count = document.getElementById('count');
  let counter = 0;

  const characterField = document.getElementById('characterField');
  const characterCount = document.getElementById('characterCount');
  const MAX_LENGTH = 120;

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  navButton.addEventListener('click', () => {
    navLink.classList.toggle('shown');
    ctaButton.classList.toggle('shown');
  });

  navLinks.forEach((element) => {
    element.addEventListener('click', () => {
      if (isMobile()) {
        navLink.classList.remove('shown'); // toggle emas, remove
        ctaButton.classList.remove('shown'); // toggle emas, remove
      }

      navLinks.forEach((link) => link.classList.remove('active'));
      element.classList.add('active');
    });
  });

  const buttons = [
    { id: 'plus', action: () => counter++ },
    { id: 'minus', action: () => counter-- },
    { id: 'reset', action: () => (counter = 0) },
  ];

  buttons.forEach(({ id, action }) => {
    document.getElementById(id).addEventListener('click', () => {
      action();
      count.textContent = counter;
    });
  });

  function updateCount() {
    const length = characterField.value.length;
    characterCount.textContent = length;
    characterCount.classList.toggle('is-warning', length >= MAX_LENGTH);
  }
  characterField.addEventListener('input', updateCount);
  updateCount();
  const BOT_TOKEN = '8991382346:AAH31ww7w_jfNt7zIzwpVzjtFr0u5dyT9PE';
  const CHAT_ID = '8667140809';

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type=\'submit\']');
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
});
