// ===== ESPERA O DOM CARREGAR COMPLETAMENTE =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENSAGEM DE BOAS-VINDAS BASEADA NO HORÁRIO =====
    function mostrarSaudacao() {
        const agora = new Date();
        const hora = agora.getHours();
        const welcomeElement = document.getElementById('welcome-message');
        const greetingText = document.getElementById('greeting-text');
        
        if (welcomeElement && greetingText) {
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
    }
    
    // Chama a função de saudação
    mostrarSaudacao();

    // ===== FUNCIONALIDADE DO BOTÃO DE TEMA CLARO/ESCURO =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
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
    }

    // ===== ROLAGEM SUAVE PARA LINKS DE NAVEGAÇÃO =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar navbar fixa
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
            
            if (targetElement) {
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
            }
        });
    });

    // ===== MOSTRAR/OCULTAR CAMPO DE OBSERVAÇÕES BASEADO EM CHECKBOX =====
    const checkboxObservacoes = document.getElementById('tem-observacoes');
    const grupoObservacoes = document.getElementById('observacoes-group');
    
    if (checkboxObservacoes && grupoObservacoes) {
        checkboxObservacoes.addEventListener('change', function() {
            if (this.checked) {
                grupoObservacoes.style.display = 'block';
            } else {
                grupoObservacoes.style.display = 'none';
                const observacoesField = document.getElementById('observacoes');
                if (observacoesField) {
                    observacoesField.value = ''; // Limpa o campo
                }
            }
        });
    }

    // ===== FUNÇÃO DE VALIDAÇÃO DE CAMPO INDIVIDUAL =====
    function validarCampo(campo) {
        const feedback = document.getElementById(campo.name + '-feedback');
        let isValid = true;
        let mensagem = '';

        // Remove classes de validação anteriores
        campo.classList.remove('is-valid', 'is-invalid');

        // Validação baseada no tipo de campo
        switch (campo.type) {
            case 'text':
                if (campo.value.trim().length < 2) {
                    isValid = false;
                    mensagem = 'Nome deve ter pelo menos 2 caracteres.';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(campo.value)) {
                    isValid = false;
                    mensagem = 'Por favor, insira um e-mail válido.';
                }
                break;
                
            case 'tel':
                // Remove caracteres não numéricos para validação
                const telefoneNumeros = campo.value.replace(/\D/g, '');
                if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
                    isValid = false;
                    mensagem = 'Telefone deve ter 10 ou 11 dígitos.';
                }
                break;
                
            case 'date':
                const hoje = new Date();
                const dataEscolhida = new Date(campo.value);
                if (dataEscolhida < hoje) {
                    isValid = false;
                    mensagem = 'A data deve ser hoje ou uma data futura.';
                }
                break;
        }

        // Validação para select
        if (campo.tagName === 'SELECT' && campo.value === '') {
            isValid = false;
            mensagem = 'Por favor, selecione um serviço.';
        }

        // Aplica a classe de validação
        if (isValid) {
            campo.classList.add('is-valid');
            if (feedback) {
                feedback.textContent = '';
                feedback.style.display = 'none';
            }
        } else {
            campo.classList.add('is-invalid');
            if (feedback) {
                feedback.textContent = mensagem;
                feedback.style.display = 'block';
            }
        }

        return isValid;
    }

    // ===== FORMATAÇÃO AUTOMÁTICA DO TELEFONE =====
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let valor = this.value.replace(/\D/g, ''); // Remove tudo que não é número
            
            if (valor.length >= 11) {
                // Formato: (11) 99999-9999
                valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (valor.length >= 10) {
                // Formato: (11) 9999-9999
                valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else if (valor.length >= 6) {
                // Formato: (11) 9999-
                valor = valor.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
            } else if (valor.length >= 2) {
                // Formato: (11) 
                valor = valor.replace(/(\d{2})(\d+)/, '($1) $2');
            }
            
            this.value = valor;
        });
    }

    // ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
    const form = document.getElementById('agendamento-form');
    
    if (form) {
        const campos = form.querySelectorAll('input[required], select[required]');
        
        // Configurar data mínima (hoje)
        const dataInput = document.getElementById('data');
        if (dataInput) {
            const hoje = new Date().toISOString().split('T')[0];
            dataInput.min = hoje;
        }
        
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

        // Envio do formulário
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formularioValido = true;
            
            // Valida todos os campos obrigatórios
            campos.forEach(campo => {
                if (!validarCampo(campo)) {
                    formularioValido = false;
                }
            });
            
            if (formularioValido) {
                // Coleta os dados do formulário
                const dadosAgendamento = {
                    nome: document.getElementById('nome').value,
                    email: document.getElementById('email').value,
                    telefone: document.getElementById('telefone').value,
                    servico: document.getElementById('servico').value,
                    data: document.getElementById('data').value,
                    observacoes: document.getElementById('observacoes').value || '',
                    dataHoraAgendamento: new Date().toLocaleString()
                };
                
                // Salva os dados do agendamento no console
                console.log('=== Novo Agendamento ===');
                console.log('Nome:', dadosAgendamento.nome);
                console.log('E-mail:', dadosAgendamento.email);
                console.log('Telefone:', dadosAgendamento.telefone);
                console.log('Serviço:', dadosAgendamento.servico);
                console.log('Data do Agendamento:', dadosAgendamento.data);
                console.log('Observações:', dadosAgendamento.observacoes);
                console.log('Data/Hora do Registro:', dadosAgendamento.dataHoraAgendamento);
                console.log('=====================');
                
                // Feedback visual para o usuário
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Agendamento Confirmado!';
                    submitButton.classList.remove('btn-success');
                    submitButton.classList.add('btn-secondary');
                    
                    // Limpa o formulário
                    form.reset();
                    
                    // Remove classes de validação
                    campos.forEach(campo => {
                        campo.classList.remove('is-valid', 'is-invalid');
                    });
                    
                    // Esconde campo de observações se estava visível
                    if (grupoObservacoes) {
                        grupoObservacoes.style.display = 'none';
                    }
                    if (checkboxObservacoes) {
                        checkboxObservacoes.checked = false;
                    }
                    
                    // Restaura o botão após 3 segundos
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('btn-secondary');
                        submitButton.classList.add('btn-success');
                    }, 3000);
                }, 1500);
            } else {
                // Rola para o primeiro campo inválido
                const primeiroInvalido = form.querySelector('.is-invalid');
                if (primeiroInvalido) {
                    primeiroInvalido.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    primeiroInvalido.focus();
                }
            }
        });
    }

    // ===== ANIMAÇÃO DOS CARDS DE SERVIÇO =====
    const servicoCards = document.querySelectorAll('.card');
    
    if (servicoCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

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
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // ===== BOTÃO CTA DO HERO =====
    const ctaButton = document.querySelector('.btn-lg[href="#agendamento"]');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const agendamentoSection = document.getElementById('agendamento');
            if (agendamentoSection) {
                const offsetTop = agendamentoSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ===== EFEITO DE DESTAQUE NO MENU ATIVO =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ===== FEEDBACK PARA USUÁRIO SEM JAVASCRIPT =====
    const noJsWarning = document.querySelector('.no-js-warning');
    if (noJsWarning) {
        noJsWarning.style.display = 'none';
    }
});