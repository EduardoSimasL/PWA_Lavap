/* function abrir(popupId) {
    document.getElementById(popupId).style.display = "block";    
}

function fechar(popupId) {
    document.getElementById(popupId).style.display = "none";    
}
*/

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

document.getElementById('sim').addEventListener('click', function() {
    alert('Agendamento cancelado');
    document.getElementById('popup').style.display = 'none'; // Esconde o popup depois de cancelar
});

document.getElementById('nao').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none'; // Esconde o popup
});