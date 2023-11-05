const buttonBorrarPreguntas = document.getElementById('buttonBorrarPreguntas');
const buttonAñidirPregunta = document.getElementById('buttonAñadirPreguntas');
const contenedorPadre = document.getElementById('pushBoxFather');
const buttonSend = document.getElementById('buttonSendExa');
const infoPreguntas = document.getElementById('infoPreguntas');
let numPreguntas = 0;
// Eventos click
buttonAñidirPregunta.addEventListener('click',funcionAñadirPreguntas)
buttonSend.addEventListener('click',fucionProcesarDatos)

function funcionAñadirPreguntas(){
numPreguntas ++
statusNav.innerHTML = `Preguntas ${numPreguntas}`;
infoPreguntas.style.display = "none";
if(contenedorPadre.contains.length < 0){buttonSend.style.display = "none"}
else buttonSend.style.display = "block";
let div = document.createElement('DIV');div.classList.add('pushBox');
let label = document.createElement('LABEL');label.setAttribute('contenteditable','true');
let icon = document.createElement('IMG');icon.src = 'media/iconos/remove.png';icon.classList.add('iconForsRemoveQuestion')
let input = document.createElement('INPUT');input.setAttribute('placeholder','Escriba aqui la pregunta que desea mandar');input.classList.add('inputsForExamenes');
div.appendChild(input);div.appendChild(icon);contenedorPadre.appendChild(div);
	document.querySelectorAll('.iconForsRemoveQuestion').forEach(j=>{
	j.addEventListener('click',()=>{	
		console.clear()
	 contenedorPadre.removeChild(j.parentElement)
	 numPreguntas --
	 if(numPreguntas === 0){ 
	 	numPreguntas = 0
	 	statusNav.innerHTML = `Preguntas ${numPreguntas}`;
       statusNav.innerHTML = "Ingrese preguntas para enviarlas";
       buttonSend.style.display = "none";
       infoPreguntas.style.display = "block";
	 }else {statusNav.innerHTML = `Preguntas ${numPreguntas}`;}
	})
})

}
function fucionProcesarDatos(){
let inputsQuestion = [];
let pushData = {
	numero : 0,
	preguntas : []
}
let preguntasForInputs = document.querySelectorAll('.inputsForExamenes');
preguntasForInputs.forEach(i=>{ 
 inputsQuestion.push(i.parentElement.firstElementChild.value)
});
for(let i = 0; i < inputsQuestion.length; i++){
	pushData.numero = inputsQuestion.length;
	let rams = [ ... pushData.preguntas]
    let copilador = rams.push(inputsQuestion[i])
    pushData.preguntas = rams;
}
console.log(pushData)
}
function configByExa(){
alert('calmaye es un codigo')
}