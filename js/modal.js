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
        const horario = document.querySelector('.horario.active').getAttribute('data-horario'); // Assuming you track which horario is selected
        const machineId = 1;
        const date = 2;
    
        fetch('reserva_maq.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                machine_id: machineId,
                date: date,
                time: horario,
                user_id: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocorreu um erro ao tentar agendar.');
        });
    });
    
});
