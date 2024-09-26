document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close');
    const horarioButtons = document.querySelectorAll('.horario');

    horarioButtons.forEach(button => {
        button.addEventListener('click', function () {
            const horario = this.getAttribute('data-horario');
            modalText.innerHTML = `Deseja agendar?<br>${horario}`;
            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Botões do modal (para implementar as ações)
    document.querySelector('.cancelar').addEventListener('click', function () {
        modal.style.display = 'none';
    });

    document.querySelector('.agendar').addEventListener('click', function () {
        alert('Agendado com sucesso!');
        modal.style.display = 'none';
    });
});
