        // ===== ESPERA O DOM CARREGAR COMPLETAMENTE =====
        document.addEventListener('DOMContentLoaded', function() {
            
            // ===== MENSAGEM DE BOAS-VINDAS BASEADA NO HORÁRIO =====
            function mostrarSaudacao() {
                const agora = new Date();
                const hora = agora.getHours();
                const welcomeElement = document.getElementById('welcome-message');
                const greetingText = document.getElementById('greeting-text');
                
                let mensagem = '';
                if (hora >= 5 && hora < 12) {
                    mensagem = '🌅 Bom dia! Bem-vindo ao ZenSpa';
                } else if (hora >= 12 && hora < 18) {
                    mensagem = '☀️ Boa tarde! Bem-vindo ao ZenSpa';
                } else {
                    mensagem = '🌙 Boa noite! Bem-vindo ao ZenSpa';
                }
                
                greetingText.textContent = mensagem;
                welcomeElement.style.display = 'block';
                
                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    welcomeElement.style.display = 'none';
                }, 5000);
            }
            
            // Chama a função de saudação
            mostrarSaudacao();

            // ===== FUNCIONALIDADE DO BOTÃO DE TEMA CLARO/ESCURO =====
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;
            const themeIcon = themeToggle.querySelector('i');
            
            // Verifica se há tema salvo no localStorage (simulado com variável)
            let isDarkTheme = false;
            
            themeToggle.addEventListener('click', function() {
                isDarkTheme = !isDarkTheme;
                
                if (isDarkTheme) {
                    body.classList.add('dark-theme');
                    themeIcon.className = 'fas fa-sun';
                    themeToggle.title = 'Modo claro';
                } else {
                    body.classList.remove('dark-theme');
                    themeIcon.className = 'fas fa-moon';
                    themeToggle.title = 'Modo escuro';
                }
            });

            // ===== ROLAGEM SUAVE PARA LINKS DE NAVEGAÇÃO =====
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 56; // Compensar navbar fixa
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // ===== FUNCIONALIDADE DE EXPANDIR/RECOLHER DETALHES DOS SERVIÇOS =====
            document.querySelectorAll('.toggle-details').forEach(button => {
                button.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const targetElement = document.getElementById(targetId);
                    const isExpanded = targetElement.classList.contains('expanded');
                    
                    if (isExpanded) {
                        targetElement.classList.remove('expanded');
                        this.textContent = 'Ver Detalhes';
                        this.classList.remove('btn-success');
                        this.classList.add('btn-outline-success');
                    } else {
                        targetElement.classList.add('expanded');
                        this.textContent = 'Ocultar Detalhes';
                        this.classList.remove('btn-outline-success');
                        this.classList.add('btn-success');
                    }
                });
            });

            // ===== MOSTRAR/OCULTAR CAMPO DE OBSERVAÇÕES BASEADO EM CHECKBOX =====
            const checkboxObservacoes = document.getElementById('tem-observacoes');
            const grupoObservacoes = document.getElementById('observacoes-group');
            
            checkboxObservacoes.addEventListener('change', function() {
                if (this.checked) {
                    grupoObservacoes.style.display = 'block';
                } else {
                    grupoObservacoes.style.display = 'none';
                    document.getElementById('observacoes').value = ''; // Limpa o campo
                }
            });

            // ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
            const form = document.getElementById('agendamento-form');
            const campos = form.querySelectorAll('input[required], select[required]');
            
            // Configurar data mínima (hoje)
            const dataInput = document.getElementById('data');
            const hoje = new Date().toISOString().split('T')[0];
            dataInput.min = hoje;
            
            // Validação em tempo real para cada campo
            campos.forEach(campo => {
                campo.addEventListener('blur', function() {
                    validarCampo(this);
                });
                
                campo.addEventListener('input', function() {
                    if (this.classList.contains('is-invalid')) {
                        validarCampo(this);
                    }
                });
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