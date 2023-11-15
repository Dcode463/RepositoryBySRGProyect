//serverconection
let serverConection;
serverConection = `http://${location.hostname}:8070`
let contaienerForExa = document.getElementById('section_Exa');
let docenteConection;
let nameConectionUserLocal = 'onfire';
let nameExass;
let puntajeGlobal;
//function inicializador
inicializarModoAcademico()
function inicializarModoAcademico(){
loginForAcademic.style.display ='block';
}
// documents HTML
let pWarnig = document.getElementById('pWarnig')
let containerLong = document.getElementById('loginForAcademic');
let buttonSendUserName = document.getElementById('siguiente_Name');
let buttonSendUserPassword = document.getElementById('siguiente_Password');
let inputSendUserName = document.getElementById('inputUserName');
let inputSendUserPassword = document.getElementById('inputUserPassword');
let infoLoginP = document.getElementById('infoLogin');
let alertContent = document.getElementById('alertForNewLogin');
let sobrePonerForLogin = document.getElementById('sobrePonerAlert');
let sectionSingup = document.getElementById('singupContainer');
let buttonCloseContainersingUp = document.getElementById('cancelarLogin');
//funciones flecha =>
validorForPasswordByUser=(name)=>{
inputSendUserPassword.style.display = 'block';
inputSendUserName.style.display = 'none';
buttonSendUserPassword.style.display = 'block';
buttonSendUserName.style.display = 'none';
infoLoginP.innerHTML = 'Ingrese su contraseña';
//Eventos for veriPassword
init_password=async (name)=>{
let verificacionForPassword = await fetch_Init_Password(inputSendUserPassword.value);
if(verificacionForPassword) init_Rama_principal(containerLong,name)
else alert('contraseña incorrecta')
async function fetch_Init_Password(password){
let config = {
method : 'post',
body : JSON.stringify({
funcion : 'pushPassword_init',
name : name,
password : password}),
headers : {'Content-Type':'application/json'}
}
let fetchRequest = await fetch(serverConection,config);
let fetchResponse = await fetchRequest.json();
if(fetchResponse.resultado) return true
else if(fetchResponse.resultado === false) return false
}
}
buttonSendUserPassword.addEventListener('click',()=>{init_password(name)})
inputSendUserPassword.addEventListener('keydown',(w)=>{if(w.key === 'Enter')init_password(name)})
}
loginPass=(obj)=> {
containerLong.style.display = 'none';
sectionSingup.style.opacity = '0';
sectionSingup.style.scale = '40%';
init_Rama_principal(containerLong,obj.name)
setTimeout(()=>{sectionSingup.style.display = 'none';},2000)
}
loginNoPass=()=>{
let buttonListoSignup = document.getElementById('buttonLitoLogin');
let buttonCancelarsingUp = document.getElementById('cancelarSingup');
let buttonLogin = document.getElementById('crearCuentaButton');
let siguientForPassword_singup = document.getElementById('siguiente_NameForPassword');
let inputSingUpForUserName = document.getElementById('UserNameLogin');
let contentFormularioUserPassword = document.getElementById('formUserPassword');
let contentFormularioUserName = document.getElementById('formUserName');
let inputPassword = document.getElementById('UserPasswordLogin');
let verificadorInputPassword = document.getElementById('verificadorUsersPasswordLogin');
functionCancelSingup=()=>{
sobrePonerForLogin.style.display = 'none';
alertContent.style.scale = '40%';
alertContent.style.opacity = '0';
setTimeout(()=>{alertContent.style.display = 'none'},100)
}
funcionSingup=()=>{ // function for login
let objPush = { // objecto send serverJSON
	funcion: '',
	name : '',
	status : 'online',
	avatar : '',
	friends : [],
	password : '',
	trofeos : ' ',
	nameRepositori: ''
}
// animations
alertContent.style.scale = '40%';
alertContent.style.opacity= '0';
setTimeout(()=>{containerLong.style.display = 'none';sobrePonerForLogin.style.display = 'none';setTimeout(()=>{alertContent.style.display = 'none'},100)},200) 
sectionSingup.style.display = 'block';
sectionSingup.style.opacity = '1';
sectionSingup.style.scale = '100%';
// function for singup
functionVerificadorsUserName=()=>{ // function for verificador user name validor
pWarnig.innerHTML = 'Verificando ...';
async function requestUsers(nameConection){ // request users
	let config = {
	method : 'post',
	body : JSON.stringify({
	     funcion : 'requestUsers',
	     name : nameConection
	}),
	headers : {'Content-Type' : 'application/json'}
}
	let fetchData = await fetch(serverConection,config);
	let fetchDataJson = await fetchData.json();
	let dataJson =  await JSON.parse(fetchDataJson);
	let arrayForObjResponse = await Object.keys(dataJson);
	let validor = arrayForObjResponse.some(e=> e === nameConection);
	if(validor) return true
	else  return false
}
async function readyUser(name){
let time = 5;
statusForLoginResponseSever.innerHTML =  `Cuenta '${name}' creada, no olvides tu contraseña <img src="iconos/yaEsTuAmigo.png">`;
timeForLanucherAutoLogin.style.display = 'block';
timeForLanucherAutoLogin.style.opacity = '1';
recursividadTimer=()=>{
time --
timeForLanucherAutoLogin.innerHTML = `Inicio de sesion automatico en ${time}`;
if(time === 0) loginPass(objPush)
else setTimeout(recursividadTimer,1000)
}
recursividadTimer()
}
async function dataLuncher(password){
buttonCloseContainersingUp.style.display = 'none'
statusForLoginResponseSever.innerHTML = 'Procesando datos ...';
contentFormularioUserPassword.style.display = 'none';
statusSingupContainer.style.display = 'block';
let peticionSaveNewUser = await pushDataForNewUser(password); //howManyUser
let peticionCreateRepositorio = await pushDataForCreateNewRepositori(password);
if (peticionSaveNewUser && peticionCreateRepositorio) readyUser(inputSendUserName.value)
else {
let typeError;
if(peticionSaveNewUser === false) typeError = 'Error al crear al nuevo usuario'
else if(peticionCreateRepositorio === false) typeError = 'Error al crear el repositorio'
statusForLoginResponseSever.innerHTML = typeError;
}
async function pushDataForCreateNewRepositori(password){
objPush.funcion = 'createNewRepositori';
objPush.password = password;
objPush.nombreRepositoriCarpeta = inputSendUserName.value;
statusForLoginResponseSever.innerHTML = `Creando repositorio para '${inputSendUserName.value}' ...`;
let config = {
	method : 'post',
	body : JSON.stringify(objPush),
	headers : {'Content-Type' : 'application/json'}
}
let fetchRequest = await fetch(serverConection,config);
let fetchResponse = await fetchRequest.json();
if(fetchResponse.mensaje === 'ok') return true
	else return false
}
async function pushDataForNewUser(password){
objPush.funcion = 'newUser';
statusForLoginResponseSever.innerHTML = 'Guardando usuario y contraseña'
	let config = {
	method : 'post',
	body : JSON.stringify(objPush),
	headers : {'Content-Type' : 'application/json'}
}
	let fetchData = await fetch(serverConection,config);
	let fetchDataJson = await fetchData.json();
    if(fetchDataJson.mensaje === 'Guardando usuario') return true
    else return false
}
}
function nextPasswordSendForSingup(namePush){// function next password
objPush.nameRepositori = namePush;
siguientForPassword_singup.style.display = 'none';
buttonListoSignup.style.display = 'block';
objPush.name = namePush;
objPush.avatar = '/perfiles/studentPerfil.png';
contentFormularioUserPassword.style.display = 'block';
contentFormularioUserName.style.display = 'none';
initValidorPassword=()=>{
const promiseValidorPassword = new Promise((resolve,reject)=>{
if(inputPassword.value.length < 4) reject({data : 'Ingresa un  contraseña con mas de 4 caracteres'});
else if(inputPassword.value === verificadorInputPassword.value) resolve({data : true})
else if(inputPassword.value != verificadorInputPassword.value){reject({data : 'SU contraseña no coinceden'});verificadorInputPassword.placeholder = 'Ingrese correctamente su contraseña'; verificadorInputPassword.style.border = 'solid 2px red'; verificadorInputPassword.addEventListener('click',()=>{verificadorInputPassword.style.border = 'none';})}
}).then(e=>{if(e.data){objPush.password = verificadorInputPassword.value;dataLuncher(verificadorInputPassword.value)}}).catch(i=>{ppWarnig.innerHTML = i.data})
}
buttonListoSignup.addEventListener('click',initValidorPassword)
}
// promise validor name
const promiseValidorName = new Promise ((resolve,reject)=>{
 validorSigno = true;
let stringForInputName = inputSingUpForUserName.value;
 if(inputSingUpForUserName.value === '' || inputSingUpForUserName.value === ' ') reject({error : 'input vacio', data : 'Escriba un nombre para su cuenta'});
 else if(inputSingUpForUserName.value.length < 4) reject({error : 'Insuficiente length para un user name', data : 'ups, lo sentimos pero no puede añadir menos de 4 caracteres'})
 for(let i=0; i < inputSingUpForUserName.value.length; i++){
 if(inputSingUpForUserName.value.charAt(i) === ' ') reject({error : 'Se detecto un espacio', data : 'Asegurese que no alla ningun espacio',position : i})
 }
for(let j = 0; j < inputSingUpForUserName.value.length; j++){
if(inputSingUpForUserName.value.charAt(j) === "/"  ||  inputSingUpForUserName.value.charAt(j) === "\\" || inputSingUpForUserName.value.charAt(j) === ":" || inputSingUpForUserName.value.charAt(j) === "*" 
|| inputSingUpForUserName.value.charAt(j) === "?"  || inputSingUpForUserName.value.charAt(j) === `"` || inputSingUpForUserName.value.charAt(j) === "<" || inputSingUpForUserName.value.charAt(j) === ">" 
|| inputSingUpForUserName.value.charAt(j) === "|"  || inputSingUpForUserName.value.charAt(j) === " "){
validorSigno = false;
 reject({error : 'signo no permitido', data : `Ups, lo sentimos pero no puedes ingresar el caracter <b style = "color:red;">${inputSingUpForUserName.value.charAt(j)}</b>`})
}
}
if(validorSigno) resolve({data : true, nameConection : inputSingUpForUserName.value})
}).then(e=>{if(e.data){
funcionResponseByrequestUsers= async ()=>{
let funcionCallback = await requestUsers(e.nameConection);
if(funcionCallback) pWarnig.innerHTML = `Ups, el nombre ${e.nameConection} ya esta en uso`
else nextPasswordSendForSingup(e.nameConection);
}
funcionResponseByrequestUsers()
}}).catch(i=>{pWarnig.innerHTML = `Type error : ${i.data}`})
}
// Eventos
resetFormulari=()=>{ // functions
pWarnig.innerHTML = 'Cree su cuenta asi podra revisar sus examanes y jugar tambien.';
inputSendUserName.value ='';
inputSingUpForUserName.value = '';
contentFormularioUserName.style.display ='block';
contentFormularioUserPassword.style.display = 'none';
infoLoginP.innerHTML = 'Ingrese su nombre';
verificadorInputPassword.value = '';
inputPassword.value = '';
ppWarnig.innerHTML = 'Ya casi terminamos, ahora crea una contraseña';
siguientForPassword_singup.style.display = 'block';
buttonListoSignup.style.display = 'none';
} 
siguientForPassword_singup.addEventListener('click',functionVerificadorsUserName)
buttonCloseContainersingUp.addEventListener('click',()=>{resetFormulari();sectionSingup.style.opacity = '0'; sectionSingup.style.scale = '20%';setTimeout(()=>{sectionSingup.style.display = 'none';containerLong.style.display = 'block'},200)})
}
buttonLogin.addEventListener('click', funcionSingup)
buttonCancelarsingUp.addEventListener('click',functionCancelSingup);
alertContent.style.opacity = '1';
alertContent.style.display = 'block';sobrePonerForLogin.style.display = 'block';setTimeout(()=>{alertContent.style.scale = '100%';},10)
}
initProcessData=()=>{
fetchRequest()
async function fetchRequest(){
let configRequest = {
	method : 'post',
	body : JSON.stringify({
	 funcion : 'requestUsers',
	 name : inputSendUserName.value
	}),
	headers : {'Content-Type' : 'application/json'}
}
let fetchData = await fetch(serverConection,configRequest);
let responseForFetchData = await fetchData.json();
let jsonModifierJSON = await JSON.parse(responseForFetchData);
let objInitArray = Object.keys(jsonModifierJSON);
let verificadorArrayForUserName = objInitArray.some(e => e === inputSendUserName.value);
if(verificadorArrayForUserName) validorForPasswordByUser(inputSendUserName.value);
else loginNoPass()
}
}
sendRequestUserName=()=>{
const promiseInputChecker = new Promise((resolve,reject)=>{
let veri = true;
if(inputSendUserName.value === ' ' || inputSendUserName.value === '') reject({error : 'input vacio',data : 'Ingrese un nombre, porfavor'});
else {
let string = inputSendUserName.value;
for (i=0; i < string.length; i++){
if(string.charAt(i) === ' '){reject({error : 'Un espacio en el input', data : 'No puede ingresar un espacio'}); veri = false}
}
}
if(veri) resolve({data : true});
}).then(j=>{if(j.data){infoLoginP.innerHTML = 'Verificando si tienes una cuenta';initProcessData()}}).catch(i=>{infoLoginP.innerHTML = i.data})  
}
//Eventos
buttonSendUserName.addEventListener('click',sendRequestUserName) // send user name for button
inputSendUserName.addEventListener('keydown',(e)=>{if(e.key === 'Enter') sendRequestUserName()}) // send user name for input
function init_Rama_principal(documents,nameConection){
nameConectionUserLocal = nameConection
documents.style.display = 'none';
//document
let sectionRamaPrincipalDeHSRG = document.getElementById('ramaPrincipalDeHSRG');
sectionRamaPrincipalDeHSRG.style.display = 'block';
examenes_Contenedor()
}
//nav
let displayComprobar = document.querySelectorAll('.p_nav_a');
let buttonExtentNav = document.querySelector('.barraExpandirNav');
let verificacionForNav = true;
abrirNav=()=>{
verificacionForNav = false;
document.querySelector('.sobrePonerForNav').style.display = "block";
displayComprobar.forEach(e=>{e.style = "font-size:15px;width:auto;opacity:0;"; setTimeout(()=>{e.style.display= "inline-block";e.style.opacity = "1"},100)});
buttonExtentNav.style = `transform: rotate(90deg);right:-15%;border-radius:8px 8px 0px 0px`;
document.getElementById('nav_a_containers').style.height = '90%';
document.getElementById('nav_a_containers').style.paddingBottom = '30px';
document.querySelector('.nav_ecrtro').style = `padding-right:5px; padding-top:150px;width:300px;`;
document.querySelector('.nav_a').style =`width:90%`;
document.querySelector('.userImg').style =`border-radius: 20%;position: absolute;left: 40%;top: 1%;transform: translate(-50%,-5%);width:50%!important;`;
document.querySelector('.userName').style =`color: white;`;
document.getElementById('statusName').style =`transition: 0s;color:white!important;opacity:1;`;	
}
cerrarNav=()=>{
verificacionForNav = true;
document.querySelector('.sobrePonerForNav').style.display = "none";
document.getElementById('nav_a_containers').style.height = '100%';
buttonExtentNav.style = `transform: rotate(-90deg);right:-66%;border-radius:0px 0px 8px 8px`;
displayComprobar.forEach(e=>{e.style = "font-size:1px;opacity:0;";setTimeout(()=>{e.style.display = "none";},50)});
/*  padding-right: 5px;*/
document.querySelector('.nav_ecrtro').style = `padding-right:0; box-sizing: border-box;position: relative;padding-top: 30px;display: inline-block;transition: padding 0.4s, all 0.2s;
display: block;
background: #12151c ;
height: 101vh;
width: 70px;
z-index: 1000;
top: 0;
border-radius:1px;
box-shadow: 0 0 25PX BLACK;
cursor: pointer;`;
document.querySelector('.nav_a').style =`cursor:pointer;width:90%;padding: 5px;margin: 5px;display:block;text-decoration: none;color: white;`;
document.querySelector('.userImg').style =`transition:  0.4s!important;transition: width 0.6s!important;transition:  margin 10s!;width: 50px;margin: 10px;border-radius: 50%;`;
document.querySelector('.userName').style =`width: 200px;transition: 0s;color: transparent;padding: 10px;opacity:0;`
document.getElementById('statusName').style =`transition:0;opacity:0;color: transparent;font-size: 12px;`;
}
buttonExtentNav.addEventListener('click',()=>{
if (verificacionForNav){
abrirNav()
}else{
cerrarNav()
}});
document.querySelector('.sobrePonerForNav').addEventListener('click',cerrarNav)
async function examenes_Contenedor(){
let buttonInitFinallyExa = document.getElementById('buttonInit_SendExa');
let father = document.getElementById('pushJS_Section_Exa')
async function requestExa(){
let data = {
funcion : 'requestExaForStudent',
name : nameConectionUserLocal
}
let config = { 
method : 'post',
body : JSON.stringify(data),
headers : {'Content-Type':'application/json'}
}
let fetchData = await fetch(serverConection,config);
let dataJson = await fetchData.json();
return JSON.parse(dataJson);
}
let requestResultado = await requestExa();
father.innerHTML = '';
let filterObj = Object.keys(requestResultado);;
let objLength = filterObj.filter(e=> e != 'NOREMOVE'); 
if(objLength.length > 0){
document.getElementById('infoNoExa').style.display = 'none';
}
else{
document.getElementById('infoNoExa').style.display = 'block';
}
for(let i=0; i < objLength.length; i++){
let div = document.createElement('DIV');div.classList.add('pForPush');div.classList.add('divpushElementExa')
// let imgAvatar = document.createElement('IMG');imgAvatar.classList.add('imgExa');imgAvtar.src = requestResultado[objLength[i]].urlAvatar 
let pNameExa = document.createElement('P');pNameExa.classList.add('pForPush');pNameExa.innerHTML = `<b>Materia</b> <br> ${requestResultado[objLength[i]].materiaTeacher}`;
let pTema = document.createElement('P');pTema.classList.add('pForPush');pTema.innerHTML = `<b>Tema</b>  <b class = 'bForP'>${requestResultado[objLength[i]].dataconfig.nameForExa}</b>`;
let pPuntaje = document.createElement('P');pPuntaje.classList.add('pForPush');pPuntaje.innerHTML = `<b>Puntaje</b> <br> ${requestResultado[objLength[i]].dataconfig.pointsForExa}`
let pInfoExit = document.createElement('P');pInfoExit.classList.add('pForPush');
if(requestResultado[objLength[i]].dataconfig.noExitApp) pInfoExit.innerHTML = `<b>Salir de la app</b> <br> Permitido`;	
else pInfoExit.innerHTML = `<b>Salir de la app</b> <br> No permitido`;
let pTimeLimit = document.createElement('P');pTimeLimit.classList.add('pForPush');
if(requestResultado[objLength[i]].dataconfig.limitTime.confirm) pTimeLimit.innerHTML = `<b>Tiempo limite</b> ${requestResultado[objLength[i]].dataconfig.limitTimeCompleteVercion}`
else pTimeLimit.innerHTML = `<b>Tiempo limite</b> <br> No hay limite`;
div.appendChild(pNameExa);div.appendChild(pTema);div.appendChild(pPuntaje);div.appendChild(pInfoExit);div.appendChild(pTimeLimit);father.appendChild(div)
}
init_Rama_Exa=(nameExa)=>{
let obj = requestResultado[nameExa]
docenteConection = obj.nameTeacher;
nameExass = obj.dataconfig.nameForExa
puntajeGlobal = obj.dataconfig.pointsForExa;
function init_Se_Acabo_time(){
alert('se acabo el tiempo')
}
let validorExitAPP = false;
let validorExitAPPinfo;
init_exit_limit=()=>{
if(validorExitAPP === false){
	let alertDocumentNoExitApp = document.getElementById('alertModeNoExit');
	alertDocumentNoExitApp.style.display = 'block'
let avisoDocumentExit = document.getElementById('exitAppInfo');
let buttonCloseInfoExitApp = document.getElementById('buttonCloseInfoExitApp');
document.addEventListener('visibilitychange', ()=>{
if(document.visibilityState === 'visible'){
console.log('conectado')
}
else{
	if(validorExitAPP === false){
		avisoDocumentExit.style.display = 'block';
funcionCloseInfoExitApp=()=>{
avisoDocumentExit.style.display = 'none';

buttonCloseInfoExitApp.removeEventListener('click',funcionCloseInfoExitApp)
}
buttonCloseInfoExitApp.addEventListener('click',funcionCloseInfoExitApp)
alertDocumentNoExitApp.style.display = 'block'
	}
	validorExitAPP = true;
	validorExitAPPinfo =  'Se ha salido de la app'
}
})	
}
}
init_timeLimit=()=>{
let divAnimation = document.getElementById('timeLimet'); 
let horas = parseInt(obj.dataconfig.limitTime.data.hours);
let minutos = parseInt(obj.dataconfig.limitTime.data.minute);
let processData = (horas * 3600) + (minutos * 60);

// Formatear a cadena con dos decimales
let duracionTransicion = processData.toFixed(2);

divAnimation.style.transition = `all ${duracionTransicion}s ease 0s`;
setTimeout(function(){divAnimation.style.width = '0%';divAnimation.style.background = 'red'},10)
var temporizadorForExaCreator = setTimeout(()=>{init_Se_Acabo_time()}, duracionTransicion * 1000);
buttonInitFinallyExa.addEventListener('click',async ()=>{
let veri = await initValidorInputsVacios();
if(veri){clearTimeout(temporizadorForExaCreator);divAnimation.style.transition = 'all 0.2s ease 0s'; divAnimation.style.width = '100%'; divAnimation.style.background = 'green';initProcessDataByCreatorExa(divAnimation)}
});
}
init_Focus_INputIcompleto=(input)=>{
input.style.border = 'solid 3px red';
input.focus();
input.addEventListener('keydown',()=>{input.style.border = 'none'})
}
initValidorInputsVacios=()=>{
let containersForDocumentExa = document.querySelectorAll('.questionContainerJs');
let verficador = true;
containersForDocumentExa.forEach(d=>{ 
let inputs = d.firstElementChild.nextElementSibling;
if(inputs.value === " " || inputs.value === ''){verficador = false;init_Focus_INputIcompleto(inputs)}
})
if(verficador) return true
else return false
}
let father = document.getElementById('push_JS_ExaCreator');
document.querySelectorAll('.questionContainerJs').forEach(e=>{father.removeChild(e)})
let containerByCreatorExa = document.getElementById('byExaCreatorAndSend');
let objLengthPregntas = [ ... obj.questionsData.preguntas];
if(obj.dataconfig.noExitApp === false) init_exit_limit()
if(obj.dataconfig.limitTime.confirm) init_timeLimit()
else{
let divAnimation = document.getElementById('timeLimet');
divAnimation.style.display = 'none';
buttonInitFinallyExa.addEventListener('click',async ()=>{
if(initValidorInputsVacios()){
if(validorExitAPP){

initProcessDataByCreatorExa(true)
}else{
initProcessDataByCreatorExa(false)
}
}
});
}
for(let i=0; i< objLengthPregntas.length; i++){
let div = document.createElement('DIV');div.classList.add('questionContainerJs');
let label = document.createElement('LABEL');label.textContent = objLengthPregntas[i];
let textarea = document.createElement('TEXTAREA');textarea.setAttribute('placeholder','Escriba aqui su respuesta');
div.appendChild(label);div.appendChild(textarea);father.appendChild(div)
}
console.log(obj)

containerByCreatorExa.style.display = 'block';
}
init_event_containerExa=()=>{
init_conatinerInfoConfirmExa=(name)=>{
let nameExa = name;
contaienerForExa.scrollTop = 0;
let containerbyInfoExa = document.getElementById('contenedorHcaerExa');
let p_ForContenedor_Exa_Materia = document.getElementById('p_ForContenedor_Exa_Materia');
let p_ForContenedor_Exa_Tema = document.getElementById('p_ForContenedor_Exa_Tema');
let p_ForContenedor_Exa_Preguntas = document.getElementById('p_ForContenedor_Exa_Preguntas');
let p_ForContenedor_Exa_Puntaje = document.getElementById('p_ForContenedor_Exa_Puntaje');
let p_ForContenedor_Exa_Docente = document.getElementById('p_ForContenedor_Exa_Docente');
let p_ForContenedor_Exa_Tiempo = document.getElementById('p_ForContenedor_Exa_Tiempo');
let buttonInit_Exa = document.getElementById('buttonInit_Exa');
containerbyInfoExa.style.display = 'block'; // container
buttonInitFinallyExa.textContent = `Enviar Examen al doc ${requestResultado[nameExa].nameTeacher}`
p_ForContenedor_Exa_Docente.textContent = `Docente : ${requestResultado[nameExa].nameTeacher}`;
p_ForContenedor_Exa_Materia.textContent = `Materia : ${requestResultado[nameExa].materiaTeacher}`
p_ForContenedor_Exa_Tema.textContent = `Tema : ${requestResultado[nameExa].dataconfig.nameForExa}`;
p_ForContenedor_Exa_Preguntas.textContent = ` Preguntas : ${requestResultado[nameExa].questionsData.numero}`;
p_ForContenedor_Exa_Puntaje.textContent = `Puntaje : ${requestResultado[nameExa].dataconfig.pointsForExa}`;
p_ForContenedor_Exa_Tiempo.textContent = `Tiempo limite ${requestResultado[nameExa].dataconfig.limitTimeCompleteVercion}`;
events(buttonInit_Exa,buttonCloseForElements,containerbyInfoExa,nameExa)
}
let divpushElementExa = document.querySelectorAll('.divpushElementExa');
divpushElementExa.forEach(e=>{
e.addEventListener('click',()=>{
init_conatinerInfoConfirmExa(e.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent);
})
})
}
if(objLength.length > 0) init_event_containerExa()
	else{
// pendiente loader
	}
}
let verificacionPush = true;
let nameExa;
function events(buttonInit_Exa,buttonCloseForElements,containerbyInfoExa,nameExas){
nameExa = nameExas;
if(verificacionPush) funcionCallback2(buttonInit_Exa,buttonCloseForElements,containerbyInfoExa)
verificacionPush = false;

}
function funcionCallback2(buttonInit_Exa,buttonCloseForElements,containerbyInfoExa){
funcionEscucha=()=>{
init_Rama_Exa(nameExa)
}
buttonInit_Exa.addEventListener('click', funcionEscucha)
buttonCloseForElements.addEventListener('click',()=>{
containerbyInfoExa.style.display = 'none'; // container
})
}
async function initProcessDataByCreatorExa(confirm,nameExamen){
let divs = document.querySelectorAll('.questionContainerJs');
let objSendQuestion = {
	puntaje : puntajeGlobal
};
if(confirm) objSendQuestion['infoExitApp'] = true;
else objSendQuestion['infoExitApp'] = false
let loader = document.querySelector('.loaderBySendExaForTeacher');
loader.style.display = 'flex';
for(let i =0; i < divs.length; i++){
let label = divs[i].firstElementChild.textContent;
let inputTextArea = divs[i].firstElementChild.nextElementSibling.value;
objSendQuestion[label] = {
 pregunta : label,
 respuesta : inputTextArea,
}
}
let veriCacionPost = await fetchPushResultado();
async function fetchPushResultado(){
let data = {
	funcion : 'pushResultadorForTeachers',
	nameStudent : nameConectionUserLocal,
	teacherConection : docenteConection,
	nameExamen : nameExass,
	data : { ... objSendQuestion},
	name : nameConectionUserLocal
}
let config = {
 method : 'post',
 body : JSON.stringify(data),
 headers : {'Content-Type' : 'application/json'}
}
console.log(data)
let fetchData = await fetch(serverConection,config);
let response = await fetchData.json();
if(response.mensaje) return true
	else return false
}
if(veriCacionPost){
loader.style.display = 'none';
document.getElementById('byExaCreatorAndSend').style.display = 'none';
document.getElementById('contenedorHcaerExa').style.display = 'none';
examenes_Contenedor();
}
}