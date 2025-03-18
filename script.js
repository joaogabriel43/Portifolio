// Seleciona o botão de alternância de tema
const themeToggle = document.getElementById("theme-toggle");

// Verifica se o usuário já escolheu um tema
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
}

// Evento de clique para mudar o tema
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Atualiza o botão conforme o tema
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark-mode");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'en';

    languageToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
        loadLanguage(currentLanguage);
    });

    function loadLanguage(language) {
        fetch(`languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                console.log(`Loaded language: ${language}`, data); // Log para verificar o carregamento do JSON

                // Atualizar Navbar
                const aboutLink = document.querySelector('.nav-links a[href="#about"]');
                const projectsLink = document.querySelector('.nav-links a[href="#projects"]');
                const contactLink = document.querySelector('.nav-links a[href="#contact"]');
                if (aboutLink) aboutLink.textContent = data.navbar.about;
                if (projectsLink) projectsLink.textContent = data.navbar.projects;
                if (contactLink) contactLink.textContent = data.navbar.contact;

                // Atualizar Header
                const headerGreeting = document.querySelector('header h1');
                const headerDescription = document.querySelector('header p');
                const headerButton = document.querySelector('header .btn');
                if (headerGreeting) headerGreeting.innerHTML = `${data.header.greeting} <span class="highlight">João Gabriel Borba do Nascimento</span>`;
                if (headerDescription) headerDescription.textContent = data.header.description;
                if (headerButton) headerButton.textContent = data.header.button;

                // Atualizar About Section
                const aboutTitle = document.querySelector('#about h2');
                const aboutDescription = document.querySelector('#about p');
                if (aboutTitle) aboutTitle.textContent = data.about.title;
                if (aboutDescription) aboutDescription.textContent = data.about.description;

                // Atualizar Projects Section
                const projectsTitle = document.querySelector('#projects h2');
                const project1Title = document.querySelector('#projects .project:nth-child(1) h3');
                const project1Description = document.querySelector('#projects .project:nth-child(1) p');
                const project2Title = document.querySelector('#projects .project:nth-child(2) h3');
                const project2Description = document.querySelector('#projects .project:nth-child(2) p');
                if (projectsTitle) projectsTitle.textContent = data.projects.title;
                if (project1Title) project1Title.textContent = data.projects.project1.title;
                if (project1Description) project1Description.textContent = data.projects.project1.description;
                if (project2Title) project2Title.textContent = data.projects.project2.title;
                if (project2Description) project2Description.textContent = data.projects.project2.description;

                // Atualizar Contact Section
                const contactTitle = document.querySelector('#contact h2');
                const contactParagraph = document.querySelector('#contact p');
                const contactEmail = document.querySelector('#contact p a');
                if (contactTitle) contactTitle.textContent = data.contact.title;
                if (contactParagraph) contactParagraph.innerHTML = `Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a>`; // Atualizar o texto do parágrafo com o e-mail
                if (contactEmail) contactEmail.textContent = data.contact.email;

                // Atualizar Footer
                const footerText = document.querySelector('footer p');
                if (footerText) footerText.textContent = data.footer.text;

                console.log('Content updated successfully'); // Log para verificar a atualização do conteúdo
            })
            .catch(error => console.error('Error loading language file:', error)); // Log para verificar erros
    }

    // Load default language
    loadLanguage(currentLanguage);

    // Carregar tema salvo
    if (localStorage.getItem("theme") === "dark-mode") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
});