# ZenSpa - Sistema de Agendamento de Massagens

Uma landing page moderna e responsiva para agendamento de serviços de massagem terapêutica, desenvolvida com HTML5, CSS3, JavaScript vanilla e Bootstrap 5.

## 🌟 Características Principais

### Interface e Design
- **Design Responsivo**: Totalmente adaptável para desktop, tablet e mobile
- **Tema Claro/Escuro**: Alternância dinâmica entre temas com botão flutuante
- **Animações Suaves**: Transições e efeitos visuais modernos
- **Tipografia Moderna**: Uso do Font Awesome para ícones consistentes

### Funcionalidades Interativas
- **Navegação Inteligente**: Menu sticky com destaque da seção ativa
- **Rolagem Suave**: Navegação fluida entre seções
- **Cards Expandíveis**: Detalhes dos serviços com animação de expansão
- **Mensagem de Boas-vindas**: Saudação personalizada baseada no horário do dia

### Sistema de Agendamento
- **Formulário Inteligente**: Validação em tempo real com feedback visual
- **Formatação Automática**: Campo de telefone com máscara dinâmica
- **Validações Avançadas**: 
  - E-mail com regex
  - Data futura obrigatória
  - Telefone com 10-11 dígitos
  - Nome com mínimo de caracteres
- **Campo Condicional**: Observações aparecem apenas quando necessário
- **Estados Visuais**: Feedback de envio com animação de carregamento

## 📁 Estrutura do Projeto

```
zenspa/
├── index.html          # Página principal com estrutura HTML
├── styles.css          # Estilos personalizados e tema escuro
├── script.js           # Lógica JavaScript e interações
└── README.md           # Documentação do projeto
```

## 🚀 Como Usar

### Instalação
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Não é necessário servidor web - funciona localmente

### Dependências Externas (CDN)
- **Bootstrap 5.3.0**: Framework CSS para responsividade
- **Font Awesome 6.0.0**: Biblioteca de ícones
- **Bootstrap Bundle JS**: JavaScript do Bootstrap com Popper.js

## 🎯 Seções da Página

### 1. Header/Navegação
- Logo ZenSpa com ícone
- Menu responsivo com links para seções
- Navbar fixa com background transparente

### 2. Banner Principal (Hero)
- Imagem de fundo atrativa
- Call-to-action destacado
- Texto persuasivo centrado

### 3. Serviços
- **Massagem Relaxante**: R$ 120,00 (60 min)
- **Massagem Terapêutica**: R$ 180,00 (90 min)
- **Massagem com Aromaterapia**: R$ 150,00 (75 min)

Cada serviço possui card expansível com detalhes completos.

### 4. Agendamento
Formulário completo com os campos:
- Nome completo (obrigatório)
- E-mail (obrigatório, validado)
- Telefone (obrigatório, formatado)
- Serviço (seleção obrigatória)
- Data (obrigatório, apenas datas futuras)
- Observações (opcional, condicional)

### 5. Rodapé
- Informações de contato
- Links para redes sociais
- Branding da empresa

## ⚙️ Funcionalidades JavaScript

### Validação de Formulário
```javascript
// Validação em tempo real
function validarCampo(campo) {
    // Lógica de validação específica por tipo
    // Feedback visual imediato
    // Mensagens de erro personalizadas
}
```

### Alternância de Tema
```javascript
// Tema claro/escuro
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    // Troca ícone e persiste preferência
});
```

### Formatação de Telefone
```javascript
// Máscara automática: (11) 99999-9999
telefoneInput.addEventListener('input', function() {
    // Formatação dinâmica durante digitação
});
```

## 🎨 Customização de Estilos

### Tema Escuro
- Background: `#1a1a1a`
- Cards: `#2d2d2d`
- Texto: `#e0e0e0`
- Ativação via classe `.dark-theme`

### Animações CSS
- **Slide-in**: Mensagem de boas-vindas
- **Fade-in**: Cards de serviços com Intersection Observer
- **Expand**: Conteúdo dos serviços
- **Hover**: Efeitos em botões e cards

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Ajustes específicos para tablet e desktop
- **Menu Colapsível**: Hamburger menu em telas pequenas

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Recursos Utilizados
- **ES6+**: Arrow functions, const/let, template literals
- **Intersection Observer**: Para animações de scroll
- **CSS Grid/Flexbox**: Layout responsivo
- **CSS Custom Properties**: Variáveis para tema
- **Bootstrap Classes**: Utilidades e componentes

## 🔧 Personalizações Possíveis

### Cores do Tema
Altere as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --cor-primaria: #28a745;
    --cor-secundaria: #20c997;
    --cor-fundo: #ffffff;
}
```

### Adicionar Novos Serviços
1. Adicione novo card HTML na seção de serviços
2. Inclua opção correspondente no select do formulário
3. Ajuste validações se necessário

### Integração com Backend
O formulário está pronto para integração:
```javascript
// Dados coletados em dadosAgendamento
const dadosAgendamento = {
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    data: '',
    observacoes: ''
};
```

## 🛡️ Acessibilidade

### Recursos Implementados
- **Labels Semânticos**: Todos os campos com labels adequados
- **ARIA Attributes**: Descrições para leitores de tela
- **Contrast Ratio**: Conformidade WCAG AA
- **Keyboard Navigation**: Navegação completa via teclado
- **Screen Reader**: Compatibilidade com tecnologias assistivas

## 📞 Suporte

Para dúvidas sobre implementação ou customização:
- Consulte os comentários no código
- Teste em diferentes navegadores
- Valide HTML e CSS com ferramentas online

**Desenvolvido com ❤️ para proporcionar experiências de bem-estar digital**
