document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'en';

    // Carregar tema salvo
    if (localStorage.getItem("theme") === "dark-mode") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

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
                const skillsLink = document.querySelector('.nav-links a[href="#skills"]');
                const portfolioLink = document.querySelector('.nav-links a[href="#portfolio"]');
                const contactLink = document.querySelector('.nav-links a[href="#contact"]');
                if (aboutLink) aboutLink.textContent = data.navbar.about;
                if (skillsLink) skillsLink.textContent = data.navbar.skills;
                if (portfolioLink) portfolioLink.textContent = data.navbar.portfolio;
                if (contactLink) contactLink.textContent = data.navbar.contact;

                // Atualizar Header
                const headerGreeting = document.querySelector('header h1');
                const headerDescription = document.querySelector('header p');
                if (headerGreeting) headerGreeting.innerHTML = `${data.header.greeting} <span class="highlight">João Gabriel Borba do Nascimento</span>`;
                if (headerDescription) headerDescription.textContent = data.header.description;

                // Atualizar About Section
                const aboutTitle = document.querySelector('#about h2');
                const aboutDescription = document.querySelector('#about p');
                if (aboutTitle) aboutTitle.textContent = data.about.title;
                if (aboutDescription) aboutDescription.textContent = data.about.description;

                // Atualizar Skills Section
                const skillsTitle = document.querySelector('#skills h2');
                if (skillsTitle) skillsTitle.textContent = data.skills.title;

                // Atualizar Portfolio Section
                const portfolioTitle = document.querySelector('#portfolio h2');
                if (portfolioTitle) portfolioTitle.textContent = data.portfolio.title;

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
});