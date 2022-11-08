
const Questions = [{
  id: 0,
  q: "As urnas eletronicas não são auditaveis!",
  a: [{ text: "VERDADE", isCorrect: false },
  { text: "FAKE NEWS", isCorrect: true },
  ],
  r: "Sim, as urnas eletrônicas brasileiras são auditáveis e seguras. Há pelo menos 9 etapas auditáveis entre o desenvolvimento dos programas e a contagem dos votos e até hoje nunca foi provada nenhuma fraude eleitoral."

},
{
  id: 1,
  q: "Não é possivel testar as urnas eletronicas antes da eleição!",
  a: [{ text: "VERDADE", isCorrect: false },
  { text: "FAKE NEWS", isCorrect: true },
  ],
  r: "O Tribunal Superior Eleitoral (TSE) realiza, preferencialmente no ano que antecede uma eleição, o chamado Teste Público de Segurança (TPS) do Sistema Eletrônico de Votação. Primeiro em todo o mundo a fazer esse tipo de teste, o TSE abre os sistemas eleitorais para que investigadores, devidamente inscritos, tentem violar as barreiras de segurança do processo de votação."
},
{
  id: 2,
  q: "Divergência entre o número de eleitores aptos na seção e votantes só para presidente é indício de fraude?",
  a: [{ text: "VERDADE", isCorrect: false },
  { text: "FAKE NEWS", isCorrect: true },
  ],
  r: "Definitivamente não. Apesar de ter havido uma intensa multiplicação de vídeos que demonstravam a divergência, a análise dos Boletins de Urna feita pelos autores das gravações estava equivocada. Isso porque eles não levaram em consideração as pessoas que solicitaram a transferência temporária para votar em uma seção diferente do domicílio eleitoral original."
},
{
  id: 3,
  q: "Descoberta de urnas com votos previamente inseridos pela PF",
  a: [{ text: "VERDADE", isCorrect: false },
  { text: "FAKE NEWS", isCorrect: true },
  ],
  r: "Novas versões sobre boatos antigos também circularam na rede mundial de computadores. Um homem não identificado afirmou em um vídeo que a Polícia Federal detectou que urnas eletrônicas estariam sendo enviadas aos municípios com votos já inseridos. O relato falso, que surgiu na época das Eleições Gerais de 2018, foi desmentido pelo TSE, por agências especializadas em checagem de fatos e pela própria PF."
},

]


var start = true;

const verdade = document.getElementById('op1');
const fakeNews = document.getElementById('op2');
const info = document.getElementById('info');
const corrige = document.getElementById('corrige');

function iterate(id) {


  var result = document.getElementsByClassName("result");
  result[0].innerText = "";


  const question = document.getElementById("question");

  question.innerText = Questions[id].q;




  verdade.innerText = Questions[id].a[0].text;
  fakeNews.innerText = Questions[id].a[1].text;



  verdade.value = Questions[id].a[0].isCorrect;
  fakeNews.value = Questions[id].a[1].isCorrect;


  var selected = "";

  verdade.addEventListener("click", () => {
    verdade.style.borderColor = "green";
    fakeNews.style.borderColor = "transparent";
    selected = verdade.value;
  })


  fakeNews.addEventListener("click", () => {
    fakeNews.style.borderColor = "red";
    verdade.style.borderColor = "transparent";
    selected = fakeNews.value;
  })

  corrige.addEventListener("click", () => {
    fakeNews.style.borderColor = "transparent";
    verdade.style.borderColor = "transparent";
    info.innerText = ""
    result[0].innerHTML = ""
    selected = "";
    id = 0
  })

  const confirmar = document.getElementsByClassName("confirmar");


  confirmar[0].addEventListener("click", () => {
    if (selected == "true") {
      result[0].innerHTML = "VOCÊ ACERTOU";
      result[0].style.color = "green";
    } else {
      result[0].innerHTML = "VOCÊ ERROU";
      result[0].style.color = "red";
    }
    info.innerText = Questions[id].r;
  })
}

if (start) {
  iterate("0");
}

const next = document.getElementsByClassName('next')[0];
var id = 0;

next.addEventListener("click", () => {
  start = false;
  fakeNews.style.borderColor = "transparent";
  verdade.style.borderColor = "transparent";
  info.innerText = ""
  if (id < 2) {
    id++;
    iterate(id);
    console.log(id);
  } else {
    id = '0'
    iterate(id)
  }
})

