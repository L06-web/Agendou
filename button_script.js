
document.addEventListener('DOMContentLoaded', function () {

    // 1. Seleciona os elementos do DOM
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    const logo = document.querySelector('img[alt="Logo Agendou+"]');
    const userProfileText = document.querySelector('.sidebar-text').parentNode; // Pega o container do texto do perfil

    // Função para alternar a sidebar
    function toggleSidebar() {
        // Alterna a largura da sidebar
        sidebar.classList.toggle('w-64'); // Largura expandida
        sidebar.classList.toggle('w-20');  // Largura minimizada

        // Mostra ou esconde cada texto na sidebar
        sidebarTexts.forEach(text => {
            text.classList.toggle('hidden');
        });

        // Mostra ou esconde o logo principal (a imagem)
        logo.classList.toggle('hidden');
        
        // Ajusta o alinhamento do ícone do usuário quando minimizado
        const userIconContainer = userProfileText.previousElementSibling;
        if (sidebar.classList.contains('w-20')) {
             userIconContainer.classList.add('mx-auto');
        } else {
             userIconContainer.classList.remove('mx-auto');
        }
    }

    // 2. Adiciona o evento de clique ao botão
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Opcional: Para telas menores, você pode querer que a sidebar já comece minimizada
    if (window.innerWidth < 768) {
       // toggleSidebar(); // Descomente esta linha se quiser que ela comece minimizada em telas pequenas
    }
});