// Variáveis globais para controle de votos
let votosCiclovia = {
    positivo: 156,
    negativo: 42,
    neutro: 78
};

let votosTransporte = {
    sim: 203,
    nao: 87
};

// Inicializa as barras de progresso com os votos iniciais
document.addEventListener('DOMContentLoaded', function() {
    atualizarResultadosCiclovia();
    atualizarResultadosTransporte();
});

// Manipulador do formulário de reporte
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const endereco = document.getElementById('endereco').value;
    const foto = document.getElementById('foto').files[0];
    const contato = document.getElementById('contato').value;

    // Simula envio do formulário
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
        // Simula resposta do servidor
        mostrarNotificacao('Reporte enviado com sucesso! Você receberá atualizações por email.', 'success');
        
        // Reseta o formulário
        this.reset();
        
        // Restaura o botão
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
});

// Sistema de votação
document.querySelectorAll('.voto-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const enquete = this.closest('.enquete');
        const opcao = this.dataset.opcao;
        
        // Remove a classe votado de todos os botões da enquete
        enquete.querySelectorAll('.voto-btn').forEach(b => {
            b.classList.remove('votado');
            b.disabled = false;
        });
        
        // Adiciona a classe votado ao botão clicado
        this.classList.add('votado');
        
        // Desabilita todos os botões da enquete
        enquete.querySelectorAll('.voto-btn').forEach(b => b.disabled = true);
        
        // Atualiza os votos
        if (enquete.querySelector('h3').textContent.includes('ciclovia')) {
            votosCiclovia[opcao]++;
            atualizarResultadosCiclovia();
        } else {
            votosTransporte[opcao]++;
            atualizarResultadosTransporte();
        }
        
        // Mostra agradecimento
        mostrarNotificacao('Obrigado pelo seu voto!', 'info');
    });
});

// Atualiza resultados da enquete da ciclovia
function atualizarResultadosCiclovia() {
    const total = Object.values(votosCiclovia).reduce((a, b) => a + b, 0);
    
    // Atualiza as barras de progresso
    document.querySelectorAll('#ciclovia .barra-fill').forEach(barra => {
        const opcao = barra.id;
        const porcentagem = (votosCiclovia[opcao] / total * 100) || 0;
        barra.style.width = `${porcentagem}%`;
        
        // Atualiza o texto da porcentagem
        const label = barra.closest('.resultado-item').querySelector('span:last-child');
        label.textContent = `${porcentagem.toFixed(1)}%`;
    });
    
    // Atualiza o total de votos
    document.querySelector('#ciclovia .total-votos').textContent = `Total de votos: ${total}`;
}

// Atualiza resultados da enquete de transporte
function atualizarResultadosTransporte() {
    const total = Object.values(votosTransporte).reduce((a, b) => a + b, 0);
    
    // Atualiza as barras de progresso
    document.querySelectorAll('#transporte .barra-fill').forEach(barra => {
        const opcao = barra.id;
        const porcentagem = (votosTransporte[opcao] / total * 100) || 0;
        barra.style.width = `${porcentagem}%`;
        
        // Atualiza o texto da porcentagem
        const label = barra.closest('.resultado-item').querySelector('span:last-child');
        label.textContent = `${porcentagem.toFixed(1)}%`;
    });
    
    // Atualiza o total de votos
    document.querySelector('#transporte .total-votos').textContent = `Total de votos: ${total}`;
}

// Manipulador do formulário de sugestões
document.getElementById('sugestaoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const sugestao = document.getElementById('sugestao').value;
    const categoria = document.getElementById('categoria').value;
    const contato = document.getElementById('contato-sugestao').value;

    // Simula envio da sugestão
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
        mostrarNotificacao('Sugestão enviada com sucesso! Obrigado por contribuir.', 'success');
        this.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
});

// Sistema de votação para sugestões
document.querySelectorAll('.voto-sugestao').forEach(btn => {
    btn.addEventListener('click', function() {
        const contador = this.nextElementSibling;
        let votos = parseInt(contador.textContent);
        
        if (!this.classList.contains('votado')) {
            votos++;
            contador.textContent = votos;
            this.classList.add('votado');
            this.style.color = 'var(--accent)';
            mostrarNotificacao('Voto registrado!', 'info');
        }
    });
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Menu mobile
document.querySelector('.menu-mobile').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Efeito de scroll no header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'var(--white)';
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.boxShadow = 'none';
    }
});

// Sistema de notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    
    let icon = 'info-circle';
    if (tipo === 'success') icon = 'check-circle';
    if (tipo === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Lazy loading para imagens
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Adiciona estilos dinâmicos
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        background-color: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification.success {
        background-color: #28a745;
    }

    .notification.error {
        background-color: #dc3545;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .votado {
        color: var(--accent) !important;
    }
`;
document.head.appendChild(style);

// Função para ver detalhes do reporte
function verReporte(id) {
    // Aqui você pode implementar a lógica para mostrar os detalhes do reporte
    alert('Visualizando reporte #' + id);
}

// Função para compartilhar reporte
function compartilharReporte(id) {
    // Aqui você pode implementar a lógica para compartilhar o reporte
    if (navigator.share) {
        navigator.share({
            title: 'Reporte de Problema - São João da Boa Vista',
            text: 'Veja este reporte de problema em São João da Boa Vista',
            url: window.location.href
        })
        .catch(error => console.log('Erro ao compartilhar:', error));
    } else {
        alert('Compartilhando reporte #' + id);
    }
}

// Filtros
document.querySelectorAll('.filtro-grupo select, .filtro-grupo input').forEach(element => {
    element.addEventListener('change', function() {
        // Aqui você pode implementar a lógica de filtragem
        console.log('Filtro alterado:', this.id, this.value);
    });
});

// Paginação
document.querySelectorAll('.pagina-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.pagina-btn.ativa').classList.remove('ativa');
        this.classList.add('ativa');
        // Aqui você pode implementar a lógica de paginação
        console.log('Página:', this.textContent);
    });
});

// Funções para sugestões
function votarSugestao(id) {
    const btn = event.target.closest('.btn-votar');
    if (btn.classList.contains('votado')) {
        alert('Você já votou nesta sugestão!');
        return;
    }
    
    btn.classList.add('votado');
    btn.innerHTML = '<i class="fas fa-check"></i> Apoiado';
    alert('Obrigado pelo seu apoio!');
}

function compartilharSugestao(id) {
    if (navigator.share) {
        navigator.share({
            title: 'Sugestão para São João da Boa Vista',
            text: 'Veja esta sugestão para melhorar nossa cidade!',
            url: window.location.href
        })
        .catch(error => console.log('Erro ao compartilhar:', error));
    } else {
        alert('Compartilhando sugestão...');
    }
}

// Formulário de sugestão
document.getElementById('sugestaoForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        alert('Sugestão enviada com sucesso!');
        this.reset();
    }, 2000);
});

// Funções para as enquetes
function votarCiclovia(opcao) {
    const btn = document.querySelector(`[data-opcao="${opcao}"]`);
    if (btn.disabled) return;

    // Desabilita todos os botões
    document.querySelectorAll('.voto-btn').forEach(b => b.disabled = true);
    
    // Marca o botão selecionado
    btn.classList.add('votado');
    
    // Atualiza os votos
    votosCiclovia[opcao]++;
    atualizarResultadosCiclovia();
}

function votarTransporte(opcao) {
    const btn = document.querySelector(`[data-opcao="${opcao}"]`);
    if (btn.disabled) return;

    // Desabilita todos os botões
    document.querySelectorAll('.voto-btn').forEach(b => b.disabled = true);
    
    // Marca o botão selecionado
    btn.classList.add('votado');
    
    // Atualiza os votos
    votosTransporte[opcao]++;
    atualizarResultadosTransporte();
} 