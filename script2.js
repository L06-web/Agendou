document.addEventListener('DOMContentLoaded', function() {
// Initialize charts
const occupationCtx = document.getElementById('occupationChart').getContext('2d');
const occupationChart = new Chart(occupationCtx, {
    type: 'bar',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Horários ocupados',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
        }, {
            label: 'Horários disponíveis',
            data: [35, 41, 20, 19, 44, 45, 60],
            backgroundColor: 'rgba(209, 213, 219, 0.6)',
            borderColor: 'rgba(209, 213, 219, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 100
            }
        }
    }
});

const statusCtx = document.getElementById('statusChart').getContext('2d');
const statusChart = new Chart(statusCtx, {
    type: 'doughnut',
    data: {
        labels: ['Confirmados', 'Pendentes', 'Cancelados', 'Concluídos'],
        datasets: [{
            data: [45, 15, 10, 30],
            backgroundColor: [
                'rgba(16, 185, 129, 0.6)',
                'rgba(245, 158, 11, 0.6)',
                'rgba(239, 68, 68, 0.6)',
                'rgba(59, 130, 246, 0.6)'
            ],
            borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(59, 130, 246, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            }
        }
    }
});

// Initialize calendar
const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    headerToolbar: false,
    height: 'auto',
    nowIndicator: true,
    editable: true,
    selectable: true,
    events: [
        {
            title: 'Consulta com João Silva',
            start: new Date().setHours(9, 0, 0),
            end: new Date().setHours(10, 0, 0),
            color: '#10B981'
        },
        {
            title: 'Acompanhamento Maria Souza',
            start: new Date().setHours(10, 30, 0),
            end: new Date().setHours(11, 0, 0),
            color: '#F59E0B'
        },
        {
            title: 'Retorno Carlos Oliveira',
            start: new Date().setHours(14, 0, 0),
            end: new Date().setHours(14, 30, 0),
            color: '#10B981'
        },
        {
            title: 'Consulta Ana Santos',
            start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(8, 30, 0),
            end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 30, 0),
            color: '#10B981'
        },
        {
            title: 'Cancelado: Pedro Costa',
            start: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(11, 0, 0),
            end: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(12, 0, 0),
            color: '#EF4444',
            display: 'background',
            textColor: '#991B1B'
        }
    ],
    eventClick: function(info) {
        // Simulate opening appointment details
        Swal.fire({
            title: info.event.title,
            html: `<p><strong>Horário:</strong> ${info.event.start.toLocaleTimeString()} - ${info.event.end.toLocaleTimeString()}</p>
                    <p><strong>Data:</strong> ${info.event.start.toLocaleDateString()}</p>
                    <p><strong>Status:</strong> ${info.event.backgroundColor === '#EF4444' ? 'Cancelado' : 'Confirmado'}</p>`,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            cancelButtonText: 'Fechar',
            showDenyButton: true,
            denyButtonText: 'Cancelar',
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('appointment-modal').classList.remove('hidden');
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Cancelar agendamento?',
                    text: 'Esta ação enviará uma notificação ao cliente.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, cancelar',
                    cancelButtonText: 'Manter agendamento'
                }).then((cancelResult) => {
                    if (cancelResult.isConfirmed) {
                        info.event.setProp('backgroundColor', '#EF4444');
                        info.event.setProp('display', 'background');
                        info.event.setProp('textColor', '#991B1B');
                        Swal.fire('Agendamento cancelado!', '', 'success');
                    }
                });
            }
        });
    },
    dateClick: function(info) {
        // Simulate creating new appointment on date click
        document.getElementById('appointment-modal').classList.remove('hidden');
        document.getElementById('appointment-date').value = info.dateStr;
        document.getElementById('appointment-time').value = info.date.toTimeString().substring(0, 5);
    }
});
calendar.render();

// Update current period text
function updateCurrentPeriodText() {
    const view = calendar.view;
    let text = '';
    
    if (view.type === 'timeGridDay') {
        text = view.currentStart.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    } else if (view.type === 'timeGridWeek') {
        const start = view.currentStart;
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        
        text = `${start.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    } else if (view.type === 'dayGridMonth') {
        text = view.currentStart.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    }
    
    document.getElementById('current-period').textContent = text;
}
updateCurrentPeriodText();

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const contentArea = document.getElementById('content-area');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-collapsed');
    contentArea.classList.toggle('content-expanded');
    contentArea.classList.toggle('content-collapsed');
});

mobileMenuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar-mobile-hidden');
    sidebar.classList.toggle('sidebar-mobile-visible');
});

// Calendar navigation
document.getElementById('prev-period').addEventListener('click', function() {
    calendar.prev();
    updateCurrentPeriodText();
});

document.getElementById('next-period').addEventListener('click', function() {
    calendar.next();
    updateCurrentPeriodText();
});

document.getElementById('today-btn').addEventListener('click', function() {
    calendar.today();
    updateCurrentPeriodText();
});

// New appointment button
document.getElementById('new-appointment-btn').addEventListener('click', function() {
    document.getElementById('appointment-modal').classList.remove('hidden');
    document.getElementById('modal-title').textContent = 'Novo Agendamento';
});

// Edit appointment buttons
document.querySelectorAll('.edit-appointment').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById('appointment-modal').classList.remove('hidden');
        document.getElementById('modal-title').textContent = 'Editar Agendamento';
        
        // In a real app, you would load the appointment data here
        const appointmentId = this.getAttribute('data-id');
        console.log('Editing appointment:', appointmentId);
    });
});

// Cancel appointment buttons
document.querySelectorAll('.cancel-appointment').forEach(button => {
    button.addEventListener('click', function() {
        const appointmentId = this.getAttribute('data-id');
        
        Swal.fire({
            title: 'Cancelar agendamento?',
            text: 'Esta ação enviará uma notificação ao cliente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, cancelar',
            cancelButtonText: 'Manter agendamento'
        }).then((result) => {
            if (result.isConfirmed) {
                // In a real app, you would update the appointment status here
                Swal.fire('Agendamento cancelado!', '', 'success');
            }
        });
    });
});

// Appointment modal
const appointmentModal = document.getElementById('appointment-modal');
const saveAppointmentBtn = document.getElementById('save-appointment');
const cancelAppointmentBtn = document.getElementById('cancel-appointment-modal');

saveAppointmentBtn.addEventListener('click', function() {
    const client = document.getElementById('appointment-client').value;
    const service = document.getElementById('appointment-service').value;
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const status = document.getElementById('appointment-status').value;
    
    if (client && service && date && time) {
        // Format date and time
        const [year, month, day] = date.split('-');
        const [hours, minutes] = time.split(':');
        const startDate = new Date(year, month - 1, day, hours, minutes);
        
        // Get duration
        const duration = parseInt(document.getElementById('appointment-duration').value);
        const endDate = new Date(startDate.getTime() + duration * 60000);
        
        // Determine color based on status
        let color;
        if (status === 'confirmed') color = '#10B981';
        else if (status === 'pending') color = '#F59E0B';
        else if (status === 'canceled') color = '#EF4444';
        else if (status === 'completed') color = '#3B82F6';
        
        // Add event to calendar
        calendar.addEvent({
            title: `${service} com ${client}`,
            start: startDate,
            end: endDate,
            color: color
        });
        
        // Close modal
        appointmentModal.classList.add('hidden');
        
        // Show success message
        Swal.fire({
            title: 'Sucesso!',
            text: 'Agendamento salvo com sucesso.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
        
        // Check if notification should be sent
        const notify = document.getElementById('appointment-notify').value;
        if (notify === 'yes') {
            // In a real app, you would send an email notification here
            console.log('Notification email sent to client');
        }
    } else {
        Swal.fire('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
    }
});

cancelAppointmentBtn.addEventListener('click', function() {
    appointmentModal.classList.add('hidden');
});

// Google Calendar integration
const googleCalendarLink = document.getElementById('google-calendar-link');
const googleCalendarModal = document.getElementById('google-calendar-modal');
const connectGoogleCalendarBtn = document.getElementById('connect-google-calendar');
const cancelGoogleCalendarBtn = document.getElementById('cancel-google-calendar');

googleCalendarLink.addEventListener('click', function(e) {
    e.preventDefault();
    googleCalendarModal.classList.remove('hidden');
});

connectGoogleCalendarBtn.addEventListener('click', function() {
    // In a real app, this would initiate OAuth 2.0 flow
    Swal.fire({
        title: 'Autenticação necessária',
        text: 'Você será redirecionado para a página de login do Google.',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        // Simulate successful connection
        googleCalendarModal.classList.add('hidden');
        
        // Update UI to show connected status
        googleCalendarLink.innerHTML = `
            <i class="fab fa-google mr-3 text-green-500"></i>
            <span class="sidebar-text">Google Agenda (Conectado)</span>
            <span class="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                <i class="fas fa-check-circle mr-1"></i> Ativo
            </span>
        `;
        
        Swal.fire({
            title: 'Conectado!',
            text: 'Sua conta do Google Agenda foi conectada com sucesso.',
            icon: 'success'
        });
    });
});

cancelGoogleCalendarBtn.addEventListener('click', function() {
    googleCalendarModal.classList.add('hidden');
});

// Notifications panel
const notificationsBtn = document.getElementById('notifications-btn');
const notificationsPanel = document.getElementById('notifications-panel');
const closeNotificationsBtn = document.getElementById('close-notifications');

notificationsBtn.addEventListener('click', function() {
    notificationsPanel.classList.toggle('translate-x-full');
});

closeNotificationsBtn.addEventListener('click', function() {
    notificationsPanel.classList.add('translate-x-full');
});

// Logout
document.getElementById('logout-btn').addEventListener('click', function() {
    Swal.fire({
        title: 'Sair',
        text: 'Tem certeza que deseja sair?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, sair',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // In a real app, this would redirect to login page
            window.location.href = 'login.html';
        }
    });
});

// Simulate upcoming appointment alert
setTimeout(() => {
    Swal.fire({
        title: 'Lembrete de Agendamento',
        html: '<p>Você tem uma consulta com <strong>João Silva</strong> em 15 minutos.</p>',
        icon: 'info',
        confirmButtonText: 'Ok',
        timer: 10000
    });
}, 3000);
});