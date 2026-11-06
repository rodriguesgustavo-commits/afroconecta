document.addEventListener('DOMContentLoaded', () => {
    // --- Controle de Navegação por Abas ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- Dados do Glossário ---
    const glossarioData = [
        { termo: "Antirracismo", def: "Prática ativa de combate ao racismo e às desigualdades raciais na sociedade." },
        { termo: "Racismo Estrutural", def: "Processo em que o racismo é constituinte das relações políticas, económicas e culturais." },
        { termo: "Ancestralidade", def: "Reconhecimento e valorização das origens, tradições e história dos antepassados." },
        { termo: "Representatividade", def: "Presença significativa de grupos historicamente marginalizados em espaços de poder." },
        { termo: "Equidade", def: "Garantia de oportunidades e recursos ajustados às necessidades individuais." }
    ];

    // --- Dados das Citações ---
    const citacoesData = [
        { texto: "Enquanto a memória de uns for a dor de outros, a história não estará contida.", autor: "Ailton Krenak" },
        { texto: "Numa sociedade racista, não basta não ser racista, é preciso ser antirracista.", autor: "Angela Davis" },
        { texto: "Eu não sou livre enquanto qualquer mulher for prisioneira.", autor: "Sueli Carneiro" },
        { texto: "Escrever é uma forma de existir e resistir.", autor: "Maria Firmina dos Reis" }
    ];

    // --- Dados do Quiz ---
    const quizData = [
        {
            pergunta: "Quem foi a primeira romancista negra brasileira?",
            opcoes: ["Dandara", "Maria Firmina dos Reis", "Carolina Maria de Jesus", "Sueli Carneiro"],
            correta: 1
        },
        {
            pergunta: "O que caracteriza o conceito de Antirracismo?",
            opcoes: ["Neutralidade", "Ação ativa no combate às desigualdades", "Estudo histórico", "Celebração apenas"],
            correta: 1
        }
    ];

    // --- Glossário ---
    const glossarioContainer = document.getElementById('glossarioContainer');
    const searchInput = document.getElementById('searchInput');

    function renderGlossario(filtro = '') {
        glossarioContainer.innerHTML = '';
        const itemsFiltrados = glossarioData.filter(item => 
            item.termo.toLowerCase().includes(filtro.toLowerCase()) ||
            item.def.toLowerCase().includes(filtro.toLowerCase())
        );

        if (itemsFiltrados.length === 0) {
            glossarioContainer.innerHTML = '<p>Nenhum conceito encontrado.</p>';
            return;
        }

        itemsFiltrados.forEach(item => {
            const div = document.createElement('div');
            div.className = 'glossario-item';
            div.innerHTML = `<h4>${item.termo}</h4><p>${item.def}</p>`;
            glossarioContainer.appendChild(div);
        });
    }

    searchInput.addEventListener('input', (e) => renderGlossario(e.target.value));
    renderGlossario();

    // --- Citações ---
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const btnQuote = document.getElementById('btnQuote');

    btnQuote.addEventListener('click', () => {
        const item = citacoesData[Math.floor(Math.random() * citacoesData.length)];
        quoteText.textContent = `"${item.texto}"`;
        quoteAuthor.textContent = `- ${item.autor}`;
    });

    // --- Quiz ---
    let currentQuizIndex = 0;
    let score = 0;

    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const scoreValue = document.getElementById('scoreValue');

    function loadQuiz() {
        quizFeedback.textContent = '';
        quizOptions.innerHTML = '';

        if (currentQuizIndex >= quizData.length) {
            quizQuestion.textContent = "Parabéns! Concluiu o Quiz!";
            return;
        }

        const current = quizData[currentQuizIndex];
        quizQuestion.textContent = current.pergunta;

        current.opcoes.forEach((opcao, index) => {
            const btn = document.createElement('button');
            btn.textContent = opcao;
            btn.addEventListener('click', () => checkAnswer(index));
            quizOptions.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex) {
        const current = quizData[currentQuizIndex];
        if (selectedIndex === current.correta) {
            score += 10;
            scoreValue.textContent = score;
            quizFeedback.textContent = "Correto! 🎉";
            quizFeedback.style.color = "green";
        } else {
            quizFeedback.textContent = "Incorreto. Tente novamente!";
            quizFeedback.style.color = "red";
        }

        setTimeout(() => {
            currentQuizIndex++;
            loadQuiz();
        }, 1200);
    }

    loadQuiz();
});