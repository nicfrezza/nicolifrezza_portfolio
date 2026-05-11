const contactForm = document.querySelector('#contactForm');
const modalOverlay = document.querySelector('#modalOverlay');
const modalTitle = document.querySelector('#modalTitle');
const modalMessage = document.querySelector('#modalMessage');
const modalClose = document.querySelector('#modalClose');
const toast = document.querySelector('#toast');
let toastTimeout = null;

function showModal(title, message) { // Exibe um modal com título e mensagem personalizados
    if (!modalOverlay || !modalTitle || !modalMessage) {
        return;
    }
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.classList.add('active');
    modalOverlay.removeAttribute('hidden');
}

function hideModal() { // Esconde o modal
    if (!modalOverlay) {
        return;
    }
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('hidden', '');
}

function showToast(message, type = 'success') { // Exibe um toast com mensagem e tipo (success ou error)
    if (!toast) {
        return;
    }
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = contactForm.nome.value.trim();
        const email = contactForm.email.value.trim();
        const mensagem = contactForm.mensagem.value.trim();

        if (!nome || !email || !mensagem) {
            showToast('Preencha todos os campos antes de enviar.', 'error'); // Validação simples para garantir que todos os campos sejam preenchidos
            return;
        }

        showModal('Mensagem enviada', 'Obrigado! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.');
        showToast('Sucesso: formulário enviado.', 'success');
        contactForm.reset();
    });
}

if (modalOverlay) { // Permite fechar o modal clicando fora da caixa de diálogo
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            hideModal();
        }
    });
}

if (modalClose) { // Permite fechar o modal clicando no botão de fechar
    modalClose.addEventListener('click', hideModal);
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        hideModal();
    }
});


