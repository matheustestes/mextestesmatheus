const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const contactForm = document.querySelector('.contact-form');
const formFeedback = document.querySelector('.form-feedback');

mobileToggle?.addEventListener('click', () => {
  const isOpen = mainNav?.classList.toggle('open') ?? false;
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  if (offset > 40) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const whatsapp = contactForm.dataset.whatsapp;
  const selectedNeed = contactForm.elements.need;
  const need = selectedNeed.options[selectedNeed.selectedIndex]?.text ?? data.get('need');
  const message = [
    'Olá, MEX TI!',
    '',
    'Estou solicitando suporte para minha empresa.',
    '',
    `Nome: ${data.get('name')}`,
    `Empresa: ${data.get('company')}`,
    `E-mail: ${data.get('email')}`,
    `Telefone: ${data.get('phone')}`,
    `Principal necessidade: ${need}`,
    `Mensagem: ${data.get('message') || 'Não informada'}`,
  ].join('\n');

  if (!whatsapp) {
    if (formFeedback) {
      formFeedback.textContent = 'Configure o número do WhatsApp antes de publicar o formulário.';
    }
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const url = isMobile
    ? `https://wa.me/${whatsapp}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${whatsapp}&text=${encodedMessage}`;

  if (formFeedback) {
    formFeedback.textContent = 'Abrindo WhatsApp com sua solicitação...';
  }

  window.location.href = url;
});
