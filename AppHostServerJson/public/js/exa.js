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
configFunctions()
function configFunctions(){
// Document HTML
//limit time
let checkboxLimitTime = document.getElementById('limitTimeCheckBox');
let inputTheCheckBoxLimitTimeMinutes = document.getElementById('inputForTimeConfigMinutes');
let inputTheCheckBoxLimitTimeHours = document.getElementById('inputForTimeConfigHours');
let labelLimitTime = document.getElementById('labelLimitTime');
// no OPtional
let inputNameExa = document.getElementById('nameForExa');
let puntosMateria = document.getElementById('puntosMateria');
// global
let buttonSend = document.getElementById('ramConfig');
//-->functions
//limit time
statusTimeLimitFunction=()=>{
 if(inputTheCheckBoxLimitTimeHours.value.length === 0 && inputTheCheckBoxLimitTimeMinutes.value.length >= 1){if(inputTheCheckBoxLimitTimeMinutes.value > 1) timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeMinutes.value} minutos`; else timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeMinutes.value} minuto`;}
 else if(inputTheCheckBoxLimitTimeHours.value.length === 0 && inputTheCheckBoxLimitTimeMinutes.value.length === 0 ) timeStatus.innerHTML = '';
 else if(inputTheCheckBoxLimitTimeMinutes.value.length === 0){if(inputTheCheckBoxLimitTimeHours.value > 1){timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeHours.value} horas`;}else timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeHours.value} hora`;}
 else if(inputTheCheckBoxLimitTimeHours.value > 1 && inputTheCheckBoxLimitTimeMinutes.value > 1) timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeHours.value} horas y ${inputTheCheckBoxLimitTimeMinutes.value} minutos`;
 else if(inputTheCheckBoxLimitTimeHours.value <= 1 && inputTheCheckBoxLimitTimeMinutes.value <= 1) timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeHours.value} hora y ${inputTheCheckBoxLimitTimeMinutes.value} minuto`; 
 else if(inputTheCheckBoxLimitTimeHours.value >= 1 && inputTheCheckBoxLimitTimeMinutes.value <= 1) timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeHours.value} horas y ${inputTheCheckBoxLimitTimeMinutes.value} minuto`; 
 else timeStatus.innerHTML = `${inputTheCheckBoxLimitTimeHours.value} hora y ${inputTheCheckBoxLimitTimeMinutes.value} minutos`;
}
validacionForInputLimitTimeHours=()=>{
	statusTimeLimitFunction()
	if(inputTheCheckBoxLimitTimeHours.value > 24) {inputTheCheckBoxLimitTimeHours.value = 24; 	statusTimeLimitFunction()}
	else if(inputTheCheckBoxLimitTimeHours.value < 0){inputTheCheckBoxLimitTimeHours.value = 0}	
}
validacionForInputLimitTimeMinutes=()=>{
	statusTimeLimitFunction()
	if(inputTheCheckBoxLimitTimeMinutes.value > 59) {inputTheCheckBoxLimitTimeMinutes.value = 59; 	statusTimeLimitFunction()}
	else if(inputTheCheckBoxLimitTimeMinutes.value < 0){inputTheCheckBoxLimitTimeMinutes.value = 0}	
}
funcionchaneForInputimit=()=>{
if(checkboxLimitTime.checked){labelLimitTime.style.display = "none";inputTheCheckBoxLimitTimeMinutes.style.display = "inline-block";inputTheCheckBoxLimitTimeHours.style.display = "inline-block";}
else if(checkboxLimitTime.checked === false){timeStatus.innerHTML = ''; labelLimitTime.style.display = "inline-block";inputTheCheckBoxLimitTimeMinutes.style.display = "none";inputTheCheckBoxLimitTimeMinutes.value = '';inputTheCheckBoxLimitTimeHours.style.display = "none";inputTheCheckBoxLimitTimeHours.value = '';}
}
// global
veriDataInput=()=>{
const promesaV = new Promise((resolve, reject)=>{
let veri = true;
if(checkboxLimitTime.checked){
if(inputTheCheckBoxLimitTimeHours.value.length === 0 && inputTheCheckBoxLimitTimeMinutes.value.length === 0) reject({input : inputTheCheckBoxLimitTimeHours, method : true, data : 'Ingrese el tiempo que desea como limite'});
else if (isNaN(inputTheCheckBoxLimitTimeHours.value))reject({input : inputTheCheckBoxLimitTimeHours, method : true, data : 'ingrese un valor correcto'});
//MINUTES VERI
else if (inputTheCheckBoxLimitTimeMinutes.value.length === 0 && inputForTimeConfigHours.value.length === 0) reject({input : inputTheCheckBoxLimitTimeMinutes, method : true, data : 'Ingrese el tiempo que desea como limite'});
else if (isNaN(inputTheCheckBoxLimitTimeMinutes.value))reject({input : inputTheCheckBoxLimitTimeMinutes, method : true, data : 'ingrese un valor correcto'});
}
if(inputNameExa.value.length === 0 || inputNameExa.value === " ")reject({input : inputNameExa,method : true, data : 'Ingrese un nombre a su examen (obligatorio)'});
else if(puntosMateria.value.length === 0 || puntosMateria.value === " ")reject({input: puntosMateria,method : true, data : 'Ingrese el puntaje de su examen (obligatorio)'});
else resolve(true)
}).then(e => pushDataConfig()).catch(e=>{
 e.input.style.border = 'solid 2px red';
 statusforconfigExa.innerHTML = e.data
 setTimeout(()=>{e.input.style.border = 'none';statusforconfigExa.innerHTML = ''},3000)
}) 
}
// Eventos
//limit time
inputTheCheckBoxLimitTimeHours.addEventListener('keyup',validacionForInputLimitTimeHours);
inputTheCheckBoxLimitTimeMinutes.addEventListener('keyup',validacionForInputLimitTimeMinutes);
checkboxLimitTime.addEventListener('change',funcionchaneForInputimit);
buttonSend.addEventListener('click',veriDataInput)
//No exit app
let checkboxNoExit = document.getElementById('notExitCheckbox');
}
function pushDataConfig(){
alert("todo bien papu")
}