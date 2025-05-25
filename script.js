document.addEventListener('DOMContentLoaded', function() {
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
                color: '#3b82f6'
            },
            {
                title: 'Retorno Maria Souza',
                start: new Date().setHours(11, 0, 0),
                end: new Date().setHours(11, 30, 0),
                color: '#10b981'
            },
            {
                title: 'Acompanhamento Carlos Oliveira',
                start: new Date().setDate(new Date().getDate() + 1).setHours(14, 0, 0),
                end: new Date().setDate(new Date().getDate() + 1).setHours(14, 30, 0),
                color: '#f59e0b'
            }
        ],
        eventClick: function(info) {
            // Simulate opening appointment details
            Swal.fire({
                title: info.event.title,
                html: `<p><strong>Horário:</strong> ${info.event.start.toLocaleTimeString()} - ${info.event.end.toLocaleTimeString()}</p>
                    <p><strong>Data:</strong> ${info.event.start.toLocaleDateString()}</p>
                    <p><strong>Status:</strong> Confirmado</p>`,
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
                    Swal.fire('Agendamento cancelado!', '', 'success');
                }
            });
        },
        dateClick: function(info) {
            // Simulate creating new appointment on date click
            document.getElementById('appointment-modal').classList.remove('hidden');
            document.getElementById('appointment-date').value = info.dateStr;
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

    // Login simulation
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (email && password) {
            // Simulate login
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app-container').classList.remove('hidden');
            
            // Show welcome message
            Swal.fire({
                title: 'Bem-vindo!',
                text: 'Login realizado com sucesso.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire('Erro', 'Por favor, preencha todos os campos.', 'error');
        }
    });

    // Google login simulation
    document.getElementById('google-login').addEventListener('click', function() {
        Swal.fire({
            title: 'Login com Google',
            text: 'Você será redirecionado para a página de login do Google.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate successful Google login
                document.getElementById('login-screen').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');
                
                Swal.fire({
                    title: 'Bem-vindo!',
                    text: 'Login com Google realizado com sucesso.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
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
                document.getElementById('app-container').classList.add('hidden');
                document.getElementById('login-screen').classList.remove('hidden');
                
                // Reset form
                document.getElementById('login-form').reset();
            }
        });
    });

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

    // Calendar view tabs
    const calendarViewTabs = document.querySelectorAll('.calendar-view-tab');
    calendarViewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update UI
            calendarViewTabs.forEach(t => {
                t.classList.remove('border-blue-500', 'text-blue-600');
                t.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
            });
            
            this.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
            this.classList.add('border-blue-500', 'text-blue-600');
            
            // Change calendar view
            const view = this.getAttribute('data-view');
            if (view === 'day') {
                calendar.changeView('timeGridDay');
            } else if (view === 'week') {
                calendar.changeView('timeGridWeek');
            } else if (view === 'month') {
                calendar.changeView('dayGridMonth');
            }
            
            updateCurrentPeriodText();
        });
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
    });

    // Appointment modal
    const appointmentModal = document.getElementById('appointment-modal');
    const saveAppointmentBtn = document.getElementById('save-appointment');
    const cancelAppointmentBtn = document.getElementById('cancel-appointment');
    
    saveAppointmentBtn.addEventListener('click', function() {
        const client = document.getElementById('appointment-client').value;
        const service = document.getElementById('appointment-service').value;
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        
        if (client && service && date && time) {
            // Format date and time
            const [year, month, day] = date.split('-');
            const [hours, minutes] = time.split(':');
            const startDate = new Date(year, month - 1, day, hours, minutes);
            const endDate = new Date(startDate.getTime() + 30 * 60000); // Add 30 minutes
            
            // Add event to calendar
            calendar.addEvent({
                title: `${service} com ${client}`,
                start: startDate,
                end: endDate,
                color: '#3b82f6'
            });
            
            // Close modal
            appointmentModal.classList.add('hidden');
            
            // Show success message
            Swal.fire({
                title: 'Sucesso!',
                text: 'Agendamento criado com sucesso.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire('Erro', 'Por favor, preencha todos os campos.', 'error');
        }
    });
    
    cancelAppointmentBtn.addEventListener('click', function() {
        appointmentModal.classList.add('hidden');
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

    // Public booking page time slot selection
    const timeSlots = document.querySelectorAll('.time-slot.available');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected from all
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selected to clicked
            this.classList.add('selected');
            
            // Show booking form
            document.getElementById('booking-form').classList.remove('hidden');
        });
    });

    // Confirm booking
    document.getElementById('confirm-booking').addEventListener('click', function() {
        const name = document.getElementById('client-name').value;
        const email = document.getElementById('client-email').value;
        const phone = document.getElementById('client-phone').value;
        
        if (name && email && phone) {
            Swal.fire({
                title: 'Confirmar agendamento?',
                html: `<p>Você está marcando uma <strong>Consulta Inicial</strong> para <strong>01/07/2023 às 08:00</strong>.</p>
                    <p class="mt-2">Um e-mail de confirmação será enviado para ${email}.</p>`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Agendamento confirmado!',
                        html: `<p>Obrigado, ${name}!</p>
                            <p class="mt-2">Seu agendamento foi confirmado e os detalhes foram enviados para seu e-mail.</p>`,
                        icon: 'success'
                    });
                    
                    // Reset form
                    document.getElementById('booking-form').reset();
                    timeSlots.forEach(s => s.classList.remove('selected'));
                }
            });
        } else {
            Swal.fire('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
        }
    });
    
    // Cancel booking
    document.getElementById('cancel-booking').addEventListener('click', function() {
        timeSlots.forEach(s => s.classList.remove('selected'));
        document.getElementById('booking-form').reset();
    });

    // Toggle between admin and public views (for demo purposes)
    // In a real app, these would be separate pages/routes
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent.includes('Agendamentos')) {
                document.getElementById('public-booking-page').classList.add('hidden');
                document.querySelector('main').classList.remove('hidden');
            } else if (this.textContent.includes('Clientes')) {
                Swal.fire('Clientes', 'Esta funcionalidade seria implementada em uma versão completa.', 'info');
            } else if (this.textContent.includes('Google Agenda')) {
                Swal.fire({
                    title: 'Integração com Google Agenda',
                    html: `<p>Esta integração permite sincronização bidirecional entre o sistema e o Google Agenda.</p>
                        <p class="mt-2">Para conectar, clique no botão abaixo para autenticar com sua conta Google.</p>`,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Conectar com Google',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Autenticação necessária',
                            text: 'Você será redirecionado para a página de login do Google.',
                            icon: 'info',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
            }
        });
    });

    // Public booking link (for demo)
    const publicBookingLinks = document.querySelectorAll('a[href="#public-booking"]');
    publicBookingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('main').classList.add('hidden');
            document.getElementById('public-booking-page').classList.remove('hidden');
        });
    });
});