// global.js - Conecta API e Gerencia Estado entre Páginas

const API_URL = "https://final-task-backend-34zw.onrender.com/";

// Carrega carrinho salvo ou cria vazio
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
// Carrega usuário salvo ou nulo
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || null;

// Executa ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorHeader();
    atualizarAreaUsuario();
});

// --- FUNÇÕES GLOBAIS ---

function atualizarContadorHeader() {
    const contador = document.getElementById('contador-carrinho');
    if(contador) contador.innerText = carrinho.length;
}

function atualizarAreaUsuario() {
    const area = document.getElementById('area-usuario');
    if(area) {
        if(usuarioLogado) {
            area.innerHTML = `<span style="color:#00ff88">Olá, ${usuarioLogado.nome}</span> <a href="#" onclick="logout()" style="color:#555; font-size:12px;">(Sair)</a>`;
        } else {
            area.innerHTML = `<a href="login.html" class="botao-verde" style="font-size: 12px; padding: 5px 10px;">Entrar</a>`;
        }
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

function mostrarAviso(msg) {
    const div = document.createElement('div');
    div.id = 'mensagem-aviso';
    div.innerText = msg;
    div.style.display = 'block';
    div.style.position = 'fixed';
    div.style.bottom = '20px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.backgroundColor = '#7000ff';
    div.style.color = 'white';
    div.style.padding = '15px';
    div.style.borderRadius = '5px';
    div.style.zIndex = '2000';
    
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// --- FUNÇÕES DO CARRINHO ---

function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    // SALVA NO NAVEGADOR PARA NÃO PERDER AO MUDAR DE PÁGINA
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorHeader();
    mostrarAviso("Adicionado ao carrinho!");

}

