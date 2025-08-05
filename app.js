const listaAmigos = [];
const listaAmigosUl = document.getElementById('listaAmigos');
const resultadoUl = document.getElementById('resultado');

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (!nome) {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaAmigos.includes(nome)) {
        alert('Esse nome já foi adicionado.');
        return;
    }

    listaAmigos.push(nome);
    input.value = '';
    atualizarLista();
    limparResultado();
}

function atualizarLista() {
    listaAmigosUl.innerHTML = '';
    listaAmigos.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        listaAmigosUl.appendChild(li);
    });
}

function limparResultado() {
    resultadoUl.innerHTML = '';
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('É necessário adicionar pelo menos dois amigos para fazer o sorteio.');
        return;
    }

    // Criar um array auxiliar com os nomes para sorteio
    const amigosParaSortear = [...listaAmigos];

    // Objeto para armazenar os pares sorteados
    const resultados = {};

    // Tentar sortear até conseguir um resultado válido
    let tentativas = 0;
    const maxTentativas = 1000;
    while (tentativas < maxTentativas) {
        tentativas++;
        // Embaralhar os amigosParaSortear
        const sorteados = embaralhar([...listaAmigos]);

        // Verificar se algum amigo tirou o próprio nome
        let valido = true;
        for (let i = 0; i < listaAmigos.length; i++) {
            if (listaAmigos[i] === sorteados[i]) {
                valido = false;
                break;
            }
        }

        if (valido) {
            // Montar o objeto resultados
            for (let i = 0; i < listaAmigos.length; i++) {
                resultados[listaAmigos[i]] = sorteados[i];
            }
            break;
        }
    }

    if (tentativas === maxTentativas) {
        alert('Não foi possível realizar o sorteio. Tente novamente.');
        return;
    }

    // Mostrar resultados na lista resultadoUl
    resultadoUl.innerHTML = '';
    for (const [amigo, sorteado] of Object.entries(resultados)) {
        const li = document.createElement('li');
        li.textContent = `${amigo} → ${sorteado}`;
        resultadoUl.appendChild(li);
    }
}

// Função para embaralhar array (Fisher-Yates)
function embaralhar(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
