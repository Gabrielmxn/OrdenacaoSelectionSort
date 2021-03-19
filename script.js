let i, j, aux, menor;
var alunos = [[]]
var tamanho;
const VARIAVEL_POS_MEDIA = 4
const VARIAVEL_POS_FALTA = 5;
const VARIAVEL_POS_NUMERO_CHAMADA = 0;

//Colocar os valores dentro do array na tabela.
function verificarFila(){
  const table = document.querySelector("table tbody");
  table.innerHTML = "";
  alunos.forEach(aluno => {
    if(aluno[0] != undefined){
      let tr = document.createElement("tr");
      let tdNumeroChamada =  document.createElement("td");
      let tdNome =  document.createElement("td");
      let tdA1 =  document.createElement("td");
      let tdA2 =  document.createElement("td");
      let tdMedia =  document.createElement("td");
      let tdFaltas =  document.createElement("td");
      let tdDisciplina =  document.createElement("td");
      tdNumeroChamada.innerHTML = aluno[0]
      tr.appendChild(tdNumeroChamada)
      tdNome.innerHTML = aluno[1].toUpperCase()
      tr.appendChild(tdNome)
      tdA1.innerHTML = aluno[2]
      tr.appendChild(tdA1)
      tdA2.innerHTML = aluno[3]
      tr.appendChild(tdA2)
      tdMedia.innerHTML = aluno[4]
      tr.appendChild(tdMedia)
      tdFaltas.innerHTML = aluno[5]
      tr.appendChild(tdFaltas)
      tdDisciplina.innerHTML = aluno[6].toUpperCase();
      tr.appendChild(tdDisciplina)
      table.appendChild(tr);
    }
  })
}
//Ordenando pelo número da chamada em ordem crescente.
function ordenarNumeroChamada(){
  for(i = 1; i <= tamanho; i++){
    menor = i;
    for(j = i + 1; j <= tamanho; j++){
      if(alunos[j][VARIAVEL_POS_NUMERO_CHAMADA] < alunos[menor][VARIAVEL_POS_NUMERO_CHAMADA]){
        menor = j;
      }
    }
    aux = alunos[i]
    alunos[i] = alunos[menor]
    alunos[menor] = aux;
  }
  verificarFila();
}
//Ordenando pelas medias classificadas em ordem decrescente
function ordenarMedia(){
  for(i = tamanho; i >= 1 ; i--){
    menor = i;
    for(j = i - 1 ; j >= 1; j--){
      if(alunos[j][VARIAVEL_POS_MEDIA] < alunos[menor][VARIAVEL_POS_MEDIA]){
        menor = j;
      }
    }
    aux = alunos[i]
    alunos[i] = alunos[menor]
    alunos[menor] = aux;
  }
  verificarFila();
}
//Ordenando pelas faltas em ordem crescente
function ordenarFaltas(){
  for(i = 1; i <= tamanho; i++){
    menor = i;
    for(j = i + 1; j <= tamanho; j++){
      if(alunos[j][VARIAVEL_POS_FALTA] < alunos[menor][VARIAVEL_POS_FALTA]){
        menor = j;
      }
    }
    aux = alunos[i]
    alunos[i] = alunos[menor]
    alunos[menor] = aux;
  }
  verificarFila();
}
//calculando a média do aluno
function calcularMedia(nota1, nota2){
  resultado = ( parseInt(nota1) + parseInt(nota2)) / 2
  return resultado;
}
//limpar o formulário
function limparFormulario(form){
  form.forEach(arvoreForm => {
    arvoreForm.value = ""
  })
}
//cadastrar o aluno dentro do array alunos.
function cadastrarAluno(form){
  let valoresForm = []
  form.forEach(value => {
    valoresForm.push(value.value)  
  })
  tamanho = alunos.length;
  alunos.push([valoresForm[0], valoresForm[1], valoresForm[2], valoresForm[3]])
  let media = calcularMedia(alunos[tamanho][2], alunos[tamanho][3]);
  alunos[tamanho].push(media, valoresForm[4], valoresForm[5]);
  limparFormulario(form);
  chamarFuncao();
}
//verificar todo o preenchimento de notas
function verificarPreenchimentoDeNotas(event){
  let notas = event.target.value;
  let verificador;
  if(notas >= 0 && notas <= 10){
    verificador = true;
  }else{
    event.target.value = "";
   alert("Preencha um valor entre 0 e 10")
  }
  return verificador;
}
//verificar todo o preenchimento do formulário
function verificarTodoPreenchimento(form){
  //verificando se o formulário foi todo preenchido.
  let verificador;
  for(i = 0; i <= form.length - 1; i++){
    if(form[i].value != ""){
      verificador = true;
    }else {
      verificador = false;
      break;
    }
  }
  return verificador;
}
//colocando um evento 'input' no input de notas.
document.querySelectorAll(".nota").forEach(notas => {
  notas.addEventListener("input", (event) => {
    verificarPreenchimentoDeNotas(event);
  })
})
//colcoando um evento dentro do botão de clique.
document.querySelector("#button").addEventListener("click", () => {
  const form = document.querySelectorAll("input")
  let verificarPreenchimento = verificarTodoPreenchimento(form);
  verificarPreenchimento  ? cadastrarAluno(form) : alert("Preencha tudo")
})
//Escolher qual modo que tem que ordenar 
function chamarFuncao(){
  const select = document.querySelector("#opcao")
  if(select.value == "ordenarPorMedia") {
    ordenarMedia()
   }else if(select.value == "ordernarPorFalta"){
    ordenarFaltas()
   }else {
    ordenarNumeroChamada();
   }
}