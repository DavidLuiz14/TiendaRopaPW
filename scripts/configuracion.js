document.getElementById('configForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const salarioBase = document.getElementById('salarioBase').value;

    fetch('php/actualizar_configuracion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `salarioBase=${salarioBase}`
    })
    .then(response => response.json())
    .then(data => {
        const mensaje = document.getElementById('mensaje');
        if (data.status === 'success') {
            mensaje.textContent = data.message;
            mensaje.style.color = 'green';
        } else {
            mensaje.textContent = data.message;
            mensaje.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
 