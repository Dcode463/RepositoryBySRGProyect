const buttonBorrarPreguntas = document.getElementById('buttonBorrarPreguntas');
const buttonAñidirPregunta = document.getElementById('buttonAñadirPreguntas');
const contenedorPadre = document.getElementById('pushBoxFather');
const buttonSend = document.getElementById('buttonSendExa');
const infoPreguntas = document.getElementById('infoPreguntas');
let numPreguntas = 0;
buttonAñidirPregunta.addEventListener('click',funcionAñadirPreguntas)

buttonBorrarPreguntas.addEventListener('click',()=>{
funcionBorrarPreguntas()
})

function funcionAñadirPreguntas(){
numPreguntas ++
statusNav.innerHTML = `Preguntas ${numPreguntas}`;
infoPreguntas.style.display = "none";
if(contenedorPadre.contains.length < 0){buttonSend.style.display = "none"}
else buttonSend.style.display = "block";
let div = document.createElement('DIV');div.classList.add('pushBox');
let label = document.createElement('LABEL');label.setAttribute('contenteditable','true');
let input = document.createElement('INPUT');input.setAttribute('placeholder','Escriba aqui la pregunta que desea mandar');input.classList.add('inputsForExamenes');
div.appendChild(label);div.appendChild(input);contenedorPadre.appendChild(div);
}
function funcionBorrarPreguntas(){
try{
if(numPreguntas == 0) statusNav.innerHTML = "No hay preguntas para borrar"
else statusNav.innerHTML = "Selcione la pregunta que desea eliminar"
let forInputs = document.querySelectorAll('.inputsForExamenes');
forInputs.forEach(e=>{
e.addEventListener('click',()=>{
if(numPreguntas > 0) numPreguntas = numPreguntas - 1
 if(numPreguntas === 0){numPreguntas = 0;buttonSend.style.display = "none";infoPreguntas.style.display = "block"}
statusNav.innerHTML = `Preguntas ${numPreguntas}`;
contenedorPadre.removeChild(e.parentElement)
})
})
}
catch(e){
infoPreguntas.innerHTML = "No hay preguntas para borrar"
}
}