const contactForm = document.querySelector('#contactForm');
const modalOverlay = document.querySelector('#modalOverlay');
const modalTitle = document.querySelector('#modalTitle');
const modalMessage = document.querySelector('#modalMessage');
const modalClose = document.querySelector('#modalClose');
const toast = document.querySelector('#toast');
let toastTimeout = null;

/* Exibe um modal com título e mensagem personalizados */
function showModal(title, message) {
    if (!modalOverlay || !modalTitle || !modalMessage) {
        return;
    }
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalOverlay.classList.add('active');
    modalOverlay.removeAttribute('hidden');
}

/* Esconde o modal */
function hideModal() {
    if (!modalOverlay) {
        return;
    }
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('hidden', '');
}

/* Exibe um toast com mensagem e tipo (success ou error) */
function showToast(message, type = 'success') {
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
            /* Validação simples para garantir que todos os campos sejam preenchidos */
            showToast('Preencha todos os campos antes de enviar.', 'error');
            return;
        }

        showModal('Mensagem enviada', 'Obrigado! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.');
        showToast('Sucesso: formulário enviado.', 'success');
        contactForm.reset();
    });
}

/* Permite fechar o modal clicando fora da caixa de diálogo */
if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            hideModal();
        }
    });
}

/* Permite fechar o modal clicando no botão de fechar */
if (modalClose) {
    modalClose.addEventListener('click', hideModal);
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        hideModal();
    }
});


