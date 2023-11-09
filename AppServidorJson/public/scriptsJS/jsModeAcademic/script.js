//serverconection
let serverConection;
serverConection = `http://${location.hostname}:8070`
//function inicializador
function inicializarModoAcademico(servidor){
serverConection = servidor;
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
if(verificacionForPassword) init_Rama_principal(document.getElementById('loginForAcademic'),name)
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
init_Rama_principal(document.getElementById('loginForAcademic'),obj.name)
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
documents.style.display = 'none';
//document
let sectionRamaPrincipalDeHSRG = document.getElementById('ramaPrincipalDeHSRG');
sectionRamaPrincipalDeHSRG.style.display = 'block';
}
//nav
let displayComprobar = document.querySelectorAll('.p_nav_a');
let buttonExtentNav = document.querySelector('.barraExpandirNav');
let verificacionForNav = true;
abrirNav=()=>{
verificacionForNav = false;
document.querySelector('.sobrePonerForNav').style.display = "block";
displayComprobar.forEach(e=>{e.style = "font-size:15px;width:auto;opacity:0;"; setTimeout(()=>{e.style.display= "inline-block";e.style.opacity = "1"},50)});
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
height: 100vh;
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
