const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const contactForm = document.querySelector('.contact-form');
const formFeedback = document.querySelector('.form-feedback');

const closeMobileMenu = () => {
  if (!mainNav?.classList.contains('open')) {
    return;
  }

  mainNav.classList.remove('open');
  mobileToggle?.setAttribute('aria-expanded', 'false');
  mobileToggle?.setAttribute('aria-label', 'Abrir menu');
};

mobileToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = mainNav?.classList.toggle('open') ?? false;
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav?.addEventListener('click', (event) => {
  event.stopPropagation();
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

document.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
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
  const email = contactForm.dataset.email;
  const cc = contactForm.dataset.cc;
  const selectedNeed = contactForm.elements.need;
  const need = selectedNeed.options[selectedNeed.selectedIndex]?.text ?? data.get('need');
  const subject = `Solicitação de atendimento - ${data.get('company')}`;
  const message = [
    'Olá, MEX TI!',
    '',
    'Gostaria de solicitar atendimento.',
    '',
    `Nome: ${data.get('name')}`,
    `Empresa: ${data.get('company')}`,
    `E-mail: ${data.get('email')}`,
    `Telefone: ${data.get('phone')}`,
    `Principal necessidade: ${need}`,
    `Mensagem: ${data.get('message') || 'Não informada'}`,
  ].join('\n');

  if (!email) {
    if (formFeedback) {
      formFeedback.textContent = 'Configure o e-mail de destino antes de publicar o formulário.';
    }
    return;
  }

  const params = new URLSearchParams({
    subject,
    body: message,
  });

  if (cc) {
    params.set('cc', cc);
  }

  if (formFeedback) {
    formFeedback.textContent = 'Abrindo seu aplicativo de e-mail para finalizar o envio.';
  }

  window.location.href = `mailto:${email}?${params.toString()}`;
});
