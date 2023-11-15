let server;
let urlLocalS = location.hostname;
server = `http://${urlLocalS}:8070`;
const buttonBorrarPreguntas = document.getElementById('buttonBorrarPreguntas');
const buttonAñidirPregunta = document.getElementById('buttonAñadirPreguntas');
const contenedorPadre = document.getElementById('pushBoxFather');
const buttonSend = document.getElementById('buttonSendExa');
const infoPreguntas = document.getElementById('infoPreguntas');
const timeStatus = document.getElementById('timeStatus')
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
let buttonSendS = document.getElementById('ramConfig');
// EXA documents
const contenedorEXAconfig = document.getElementById('exa_cash_adjustments');
const contenedorLoadderForExa = document.getElementById('loadderForExa');
const contenedorEXAQuestion = document.getElementById('contenedorParaExamenes');
let numPreguntas = 0;
//No exit app
const checkboxNoExit = document.getElementById('notExitCheckbox');
// privateForTeacher
const checkboxPrivateForTeacher = document.getElementById('checkboxForPrivateForTeachers');
// dataSend
let pushData = {
	numero : 0,
	preguntas : []
}

let objPushDataConfig = {
	nameForExa : '',
	pointsForExa : '',
	privateForTeacher : false,
	noExitApp : false,
	limitTimeCompleteVercion : '',
	limitTime : {
	    confirm : false,
	    data : {
	 	   hours : '00',
	 	   minute : '00'
	 }
	}
}
// function value for question  'fucionProcesarDatos'
valueForQuestion=()=>{
const promaValue = new Promise((resolve,reject)=>{
 let inputsForQuestions = document.querySelectorAll('.inputsForExamenes');
 inputsForQuestions.forEach(i=>{
 	if(i.value === '' || i.value === ' '){
 	i.style.border = 'solid 2px red';
 	i.placeholder = 'ingrese una pregunta';
 	i.addEventListener('focus',()=>{
 	i.style.border = 'none';
 	i.placeholder = 'Escriba aqui la pregunta que desea mandar';
 	reject({data : 'input vacio'})
 	})
 	}else{
 		resolve({data : true})
 	}
 })
}).then(i=>{
	if(i.data) fucionProcesarDatos()
}).catch(j=>{
	console.log(j)
})
}
// Eventos click
buttonAñidirPregunta.addEventListener('click',funcionAñadirPreguntas)
buttonSend.addEventListener('click',valueForQuestion)

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
configFunctions()
function configFunctions(){
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
async function veficacionExamenIgualdad (nameInputExa){
let name = document.getElementById('addicionalInfoUserName');
let data = {
funcion : 'requestExa',
name : name.value
}
let config = {
method : 'post',
body : JSON.stringify(data),
headers : {'Content-Type':'application/json'}
}
let fetchData = await fetch(server,config);
let responseFetchOne = await fetchData.json();
let responseFetch = JSON.parse(responseFetchOne)
let jsonToArray = Object.keys(responseFetch);
let filterArray = jsonToArray.filter(e=> e != 'start');
let validorIgualdad = filterArray.some(w=> w === nameInputExa)
console.log(validorIgualdad)
if(validorIgualdad) return true
else return false 
}
async function veriDataInput (){
const promesaV = new Promise(async (resolve, reject)=>{
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
let peticionExa = await  veficacionExamenIgualdad(inputNameExa.value);
console.log(peticionExa)
if (peticionExa) reject({input:inputNameExa,method:true,data:`Ups, el nombre para el  examen '${inputNameExa.value}'' ya esta en uso.`})
else resolve(true)
}).then(e => pushDataConfig()).catch(e=>{
if(e.input != undefined){
	 e.input.style.border = 'solid 2px red';
 statusforconfigExa.innerHTML = e.data;
 setTimeout(()=>{e.input.style.border = 'none';statusforconfigExa.innerHTML = ''},3000)
}else{
	alert(e)
}
}) 
}
// Eventos
//limit time
inputTheCheckBoxLimitTimeHours.addEventListener('keyup',validacionForInputLimitTimeHours);
inputTheCheckBoxLimitTimeMinutes.addEventListener('keyup',validacionForInputLimitTimeMinutes);
checkboxLimitTime.addEventListener('change',funcionchaneForInputimit);
buttonSendS.addEventListener('click',veriDataInput)

}
function pushDataConfig(){
//Loader start
contenedorEXAconfig.style.opacity = '0';
setTimeout(()=>{contenedorEXAconfig.style.display = 'none'},1000)
// push data 
//name exa
push()
async function push(){
objPushDataConfig.nameForExa = await inputNameExa.value;
//points
objPushDataConfig.pointsForExa = await `${puntosMateria.value}`;
//No exit checked
if(checkboxNoExit.checked) objPushDataConfig.noExitApp =  true;
else if (checkboxNoExit.checked === false) objPushDataConfig.noExitApp = false;
// privateForTeachers
if(checkboxPrivateForTeacher.checked) objPushDataConfig.privateForTeacher = true;
else if(checkboxPrivateForTeacher.checked === false) objPushDataConfig.privateForTeacher = false;
//limitTime
if(checkboxLimitTime.checked){
objPushDataConfig.limitTime.confirm = true;
objPushDataConfig.limitTime.data.minute = inputTheCheckBoxLimitTimeMinutes.value;
objPushDataConfig.limitTime.data.hours = inputTheCheckBoxLimitTimeHours.value;
objPushDataConfig.limitTimeCompleteVercion = timeStatus.innerHTML;
}
else if(checkboxLimitTime.checked === false) objPushDataConfig.limitTime.confirm = false;
changeSectionForExa();
}
}
function changeSectionForExa(){
contenedorEXAQuestion.style.display = 'block';
contenedorEXAQuestion.style.display = '0';
setTimeout(()=>{contenedorEXAconfig.style.opacity = '1'},1000)
}
function fucionProcesarDatos(){
let inputsQuestion = [];
let preguntasForInputs = document.querySelectorAll('.inputsForExamenes');
preguntasForInputs.forEach(i=>{ 
 inputsQuestion.push(i.parentElement.firstElementChild.value)
});
for(let i = 0; i < inputsQuestion.length; i++){
	pushData.numero = inputsQuestion.length;
	let rams = pushData.preguntas.filter(e=> e != "")
    let copilador = rams.push(inputsQuestion[i])
    pushData.preguntas = rams;
}
centralize_data()
}
function centralize_data(){
//document
document.getElementById('salaDeEspera').style.display = 'flex';
document.getElementById('centerForExa').style.display = 'none';
let materia = document.getElementById('addicionalInfoUserMateria');
let name = document.getElementById('addicionalInfoUserName');
//data send server
let dataPushServer = {
	materia : materia.value,
	name : name.value,
	user : name.value,
	funcion : 'saveExa',
	nameExa : objPushDataConfig.nameForExa,
	config : {... objPushDataConfig},
	dataQuestion : {... pushData}
}
let configServer = {
	method: 'post',
	body : JSON.stringify(dataPushServer),
    headers : {'Content-Type' : 'application/json'}

}
fetchRequest()
async function fetchRequest(){
const fetchData = await fetch(server,configServer);
const response = await fetchData.json();
if(response.mensaje === true){
statusSaveServer.innerHTML = 'Listo, Examen guardado';
setTimeout(()=>{  

})
}
} 
}

