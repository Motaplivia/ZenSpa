document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação do header ao rolar
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Validação e envio do formulário de agendamento
    const agendamentoForm = document.getElementById('agendamento-form');
    if (agendamentoForm) {
        // Validação em tempo real do e-mail
        const emailInput = agendamentoForm.querySelector('input[type="email"]');
        const emailFeedback = emailInput.nextElementSibling;
        
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(this.value) && this.value !== '') {
                this.classList.add('is-invalid');
                emailFeedback.textContent = 'Por favor, insira um e-mail válido.';
                emailFeedback.style.display = 'block';
            } else {
                this.classList.remove('is-invalid');
                emailFeedback.textContent = '';
                emailFeedback.style.display = 'none';
            }
        });

        agendamentoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validação final do e-mail
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                emailFeedback.textContent = 'Por favor, insira um e-mail válido.';
                emailFeedback.style.display = 'block';
                return; // Impede o envio do formulário se o e-mail for inválido
            }

            // Coleta os dados do formulário
            const nome = agendamentoForm.querySelector('input[type="text"]').value;
            const email = emailInput.value;
            const telefone = agendamentoForm.querySelector('input[type="tel"]').value;
            const servico = agendamentoForm.querySelector('select').value;
            const data = agendamentoForm.querySelector('input[type="date"]').value;
            
            // Cria objeto com os dados do agendamento
            const dadosAgendamento = {
                nome: nome,
                email: email,
                telefone: telefone,
                servico: servico,
                data: data,
                dataHoraAgendamento: new Date().toLocaleString()
            };
            
            // Salva os dados do agendamento no console
            console.log('=== Novo Agendamento ===');
            console.log('Nome:', dadosAgendamento.nome);
            console.log('E-mail:', dadosAgendamento.email);
            console.log('Telefone:', dadosAgendamento.telefone);
            console.log('Serviço:', dadosAgendamento.servico);
            console.log('Data do Agendamento:', dadosAgendamento.data);
            console.log('Data/Hora do Registro:', dadosAgendamento.dataHoraAgendamento);
            console.log('=====================');
            
            // Feedback visual para o usuário
            const submitButton = agendamentoForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Agendamento Confirmado!';
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-secondary');
                
                // Limpa o formulário
                agendamentoForm.reset();
                
                // Restaura o botão após 3 segundos
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('btn-secondary');
                    submitButton.classList.add('btn-success');
                }, 3000);
            }, 1500);
        });
    }

    // Animação dos cards de serviço
    const servicoCards = document.querySelectorAll('.servico-card');
    const observerOptions = {
        threshold: 0.1
    };

        const cardContent = document.querySelector(".card-content");
    const leiaMaisButton = document.getElementById("leia-mais");
    const fullText = document.querySelector(".full-text");

    leiaMaisButton.addEventListener("click", function() {
        if (cardContent.classList.contains("expanded")) {
            cardContent.classList.remove("expanded");
            cardContent.style.maxHeight = "100px"; // Restaura a altura máxima
            this.textContent = "Leia mais";
            fullText.style.display = "none"; // Esconde o texto completo
        } else {
            cardContent.classList.add("expanded");
            cardContent.style.maxHeight = "100%"; // Mostra o texto completo
            this.textContent = "Leia menos";
            fullText.style.display = "block"; // Mostra o texto completo
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    servicoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Botão CTA do hero
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const agendamentoSection = document.getElementById('agendamento');
            if (agendamentoSection) {
                agendamentoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}); 