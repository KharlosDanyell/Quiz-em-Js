// Variávei globais utilizadas
    let questoes = null; //começa como null para posteriormente receber o array com o tema escolhido
    let contador = 0; //Usado para determinar se ainda há questões
    let corretas = 0; //Contador de questões corretas
    let seqQuestoes = 0; //Sequencia para determinar o progresso no quiz
    let quantQuest = 0; //Quantidade de questões para calculo dos resultados
    let arrayQuest = []; //Array para armazenar as questões que ja foram mostradas e não repati-las
    let questaoEscolha = 0; //Questão escolhida aleatoriamente
    
    // Eventos principais
    document.querySelector('#inicio').addEventListener('click', mostrarQuest);
    document.querySelector('.areaPontos button').addEventListener('click', resetar);

    // Funções
    // Função principal
    function mostrarQuest() {
        //If para selecionar o tema caso ainda não haja um
        if(questoes == null) {
            questoes = selecaoTema();
            quantQuest = questoes.length;
        }

         // If para verificar se ainda há questões a serem mostradas
        if (questoes[contador]) { 
            // Pegando as questões de outro script e gerando aleatoriamente a ordem em que serem mostradas
            questaoEscolha = questaosAleatorias(quantQuest);
            let questao = questoes[questaoEscolha];

            // Tirando as demais áreas da tela e deixando somente a área de questões
            document.querySelector('#tema').style.display = 'none';
            document.querySelector('#temaTitulo').style.display = 'none';
            document.querySelector('#inicio').style.display = 'none';
            document.querySelector('.areaPontos').style.display = 'none';
            document.querySelector('.areaQuest').style.display = 'block';

            // Mostrando a questão
            document.querySelector('.questao').innerHTML = questao.question;

            // Definindo a porcentagem de progresso no quiz
            let porcentagem = porCem(seqQuestoes, quantQuest);
            document.querySelector('.progresso--bar').style.width = `${porcentagem}%`;

            // Criando as opções da questão na tela
            let opcoesHtml = '';
            for (let i in questao.options) {
                opcoesHtml += `<div data-option='${i}' class='opcao'><span>${
                    parseInt(i) + 1
                }</span>${
                    questao.options[i]
                }</div>`;
            }
            // Mostrando as opções
            document.querySelector('.opcoes').innerHTML = opcoesHtml;

            // Evento para quando um opçoes for clicada
            document.querySelectorAll('.opcoes .opcao').forEach(item => {
                item.addEventListener('click', cliqueOpcoes);
            });
        } else { 
            // Finaliza o quiz caso não haja mais questões
            finalizarQuiz();
        }
    }

    //Função que seleciona o tema do quiz
    function selecaoTema() {
        let campo = document.getElementById('tema');
	    let valor = campo.options[campo.selectedIndex].value;
	    
        if(valor == 'js'){
            return questoesJs;
        }else {
            return questoesGerais;
        }
    }

    // Função executada quando se clica em uma opção
    function cliqueOpcoes(evento) { // Pega o número da questão clicada
        let opcaoClicada = evento.target.getAttribute('data-option');
        opcaoClicada = parseInt(opcaoClicada);

        // Verifica se a questão clicada está correta
        if (questoes[questaoEscolha].answer === opcaoClicada) {
            corretas++;
        }
        contador++;
        mostrarQuest();
    }

    // Função para gerar as questões aleatoriamente
    function questaosAleatorias(quantidadeQuest) { 
        // Loop que rodará para gerar as questões aleatórias
        let loop = 0;
        while (loop == 0) { 
            // Gera um número aleatório para definir o indice da questão e armazena num array
            let numero = Math.floor(Math.random() * (quantidadeQuest - 0)) + 0;
            let busca = arrayQuest.indexOf(numero);

            // Se o número não for encontrado no array é pq a questão ainda não foi mostrada
            // E armazena o novo número no array
            // Se o número for encontrado o array continua rodando
            if (busca == -1) {
                arrayQuest.push(numero);
                return numero;
                loop = 1;
            } else {
                loop = 0;
            }
        }
    }

    // Função que define a porcentagem do progresso no quiz
    function porCem(seqQuests, quantQuest) {
        seqQuestoes++;
        return Math.floor((seqQuests / quantQuest) * 100);
    }

    // Função que finaliza o quiz e mostra os resultados
    function finalizarQuiz() {
    //Calcula a quantidade de acertos
    let acertos = Math.floor((corretas /quantQuest
        ) * 100
    );

    //Gera e mostra o resultado com base na quantidade de acertos
    let texto1 = document.querySelector('.texto1');
    if (acertos < 50) {
        texto1.innerHTML = 'ESTUDE MAIS!';
        texto1.style.color = 'red';
    } else if (acertos == 50) {
        texto1.innerHTML = 'TA NA MÉDIA!';
        texto1.style.color = 'orange';
    } else if (acertos > 50 && acertos != 100) {
        texto1.innerHTML = 'ACIMA DA MÉDIA!';
        texto1.style.color = 'yellow';
    } else if (acertos === 100) {
        texto1.innerHTML = 'PARABÉNS';
        texto1.style.color = 'gree';
    }
    
    document.querySelector('.porcentagem').innerHTML = `Acertou ${acertos}%`;
    document.querySelector('.texto2').innerHTML = `Você respondeu ${quantQuest} questões e acertou ${corretas}`;
    document.querySelector('.progresso--bar').style.width = `100%`;
    document.querySelector('.areaPontos').style.display = 'block';
    document.querySelector('.areaQuest').style.display = 'none';
}

// Função que reseta o quiz
function resetar() {
    corretas = 0;
    contador = 0;
    seqQuestoes = 0;
    arrayQuest = [];
    questoes = null;

    document.querySelector('#tema').style.display = 'block';
    document.querySelector('#temaTitulo').style.display = 'block';
    document.querySelector('#inicio').style.display = 'block';
    document.querySelector('.areaPontos').style.display = 'none';
    document.querySelector('.progresso--bar').style.width = `0%`;

}
