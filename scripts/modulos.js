document.addEventListener('DOMContentLoaded', () => {
    const workerForm = document.getElementById('workerForm');
    const workerTable = document.getElementById('workerTable').querySelector('tbody');
    const salarioBaseInput = document.getElementById('salario_base');
    const submitButton = document.getElementById('submitButton');
    const formTitle = document.getElementById('formTitle');

    // Función para cargar el salario base de configuración
    const fetchSalarioBase = async () => {
        const response = await fetch('trabajadores.php');
        const data = await response.json();
        if (data.length > 0) {
            salarioBaseInput.value = data[0].salario_base;
        }
    };

    // Función para cargar los trabajadores
    const fetchWorkers = async () => {
        const response = await fetch('trabajadores.php');
        const workers = await response.json();
        workerTable.innerHTML = '';
        workers.forEach(worker => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${worker.id_trabajador}</td>
                <td>${worker.nombre_completo}</td>
                <td>${worker.telefono}</td>
                <td>${worker.direccion}</td>
                <td>${worker.puesto}</td>
                <td>${worker.dias_trabajados}</td>
                <td>${worker.salario_calculado}</td>
                <td>
                    <button onclick="editWorker(${worker.id_trabajador})">Editar</button>
                    <button onclick="deleteWorker(${worker.id_trabajador})">Eliminar</button>
                </td>
            `;
            workerTable.appendChild(row);
        });
    };

    // Función para cargar los datos de un trabajador para edición
    window.editWorker = (id) => {
        fetch(`trabajadores.php?id=${id}`)
            .then(response => response.json())
            .then(worker => {
                document.getElementById('id_trabajador').value = worker.id_trabajador;
                document.getElementById('nombre_completo').value = worker.nombre_completo;
                document.getElementById('telefono').value = worker.telefono;
                document.getElementById('direccion').value = worker.direccion;
                document.getElementById('puesto').value = worker.puesto;
                document.getElementById('dias_trabajados').value = worker.dias_trabajados;
                submitButton.textContent = 'Actualizar';
                formTitle.textContent = 'Editar Trabajador';
            });
    };


    // Función para eliminar trabajador
window.deleteWorker = (id) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este trabajador?");
    if (confirmDelete) {
        fetch(`trabajadores.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_trabajador: id })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchWorkers();  // Recargar la lista de trabajadores
        });
    }
};

    // Enviar el formulario para agregar o actualizar trabajador
    workerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(workerForm);
        fetch('trabajadores.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchWorkers();
            workerForm.reset();
            submitButton.textContent = 'Agregar';
            formTitle.textContent = 'Agregar Trabajador';
        });
    });

    // Cargar trabajadores y salario base
    fetchSalarioBase();
    fetchWorkers();
});





document.addEventListener('DOMContentLoaded', () => {
    const attendanceForm = document.getElementById('attendanceForm');
    const attendanceTable = document.getElementById('attendanceTable').querySelector('tbody');
    const submitButton = document.getElementById('submitButton');
    const formTitle = document.getElementById('formTitle');
    const trabajadorSelect = document.getElementById('id_trabajador');

    // Función para cargar los trabajadores en el select
    const fetchWorkers = async () => {
        const response = await fetch('trabajadores.php');
        const workers = await response.json();
        trabajadorSelect.innerHTML = '';
        workers.forEach(worker => {
            const option = document.createElement('option');
            option.value = worker.id_trabajador;
            option.textContent = worker.nombre_completo;
            trabajadorSelect.appendChild(option);
        });
    };

    // Función para cargar las asistencias
    const fetchAttendance = async () => {
        const response = await fetch('asistencias.php');
        const attendances = await response.json();
        attendanceTable.innerHTML = '';
        attendances.forEach(attendance => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${attendance.id_asistencia}</td>
                <td>${attendance.nombre_trabajador}</td>
                <td>${attendance.fecha}</td>
                <td>${attendance.hora_llegada}</td>
                <td>${attendance.hora_salida ?? '-'}</td>
                <td>${attendance.horas_trabajadas ?? '-'}</td>
                <td>
                    <button onclick="deleteAttendance(${attendance.id_asistencia})">Eliminar</button>
                </td>
            `;
            attendanceTable.appendChild(row);
        });
    };

    // Función para eliminar una asistencia
    window.deleteAttendance = (id) => {
        if (confirm('¿Estás seguro de eliminar esta asistencia?')) {
            fetch('asistencias.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_asistencia: id })
            }).then(response => response.json())
              .then(data => {
                  alert(data.message);
                  fetchAttendance();
              });
        }
    };

    // Enviar el formulario para registrar asistencia
    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(attendanceForm);
        fetch('asistencias.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchAttendance();
            attendanceForm.reset();
        });
    });

    // Inicializar trabajadores y asistencias
    fetchWorkers();
    fetchAttendance();
});
