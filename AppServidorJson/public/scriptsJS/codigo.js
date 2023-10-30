let servidor;
let buttonsSelectionModeRepositoriGames = document.getElementById('severRepositoriGameMode_Buttons');
let sectionModeServerRepositoriGames = document.getElementById('severRepositoriGameMode_Section');
let sectionModeSelectionMode = document.getElementById('electionMode');
let boxModeGames = document.querySelector('.modeGames');
let boxModeAcademic = document.querySelector('.modeAcademic');
let viajeSubLaunchuer = document.getElementById('viajeSubLaunchuer');
let buttonsSelectionModeRepositori = document.getElementById('severRepositoriMode_Buttons');
const input = document.getElementById('userName');
const img = document.getElementById('userAvatar');
let urlLocal = location.hostname;
let events = true;
servidor = `http://${urlLocal}:8070`;
console.log(`conectado a ${servidor}`);
window.addEventListener('load',()=>{
document.querySelector('.loadderViajeAlServer').style.display = "none";
document.getElementById('electionMode').style.display = "block";
})
buttonsSelectionModeRepositori.addEventListener('click',()=>{
buttonsSelectionModeRepositori.style.display = "none";
boxModeGames.style.opacity = "0";
setTimeout(()=>{
boxModeAcademic.style = `left:50%;top:50%;transform:translate(-50%,-50%)`;
setTimeout(()=>{boxModeAcademic.style.opacity = "0"; setTimeout(()=>{viajeSubLaunchuer.style.display = "block";
sectionModeServerRepositoriGames.style.style = "none"},500)},500)
},500)
})
buttonsSelectionModeRepositoriGames.addEventListener('click',()=>{
buttonsSelectionModeRepositoriGames.style.display = "none";
boxModeAcademic.style.opacity = 0;
setTimeout(()=>{
boxModeGames.style = `left:50%;top:50%;transform:translate(-50%,-50%)`;
setTimeout(()=>{
boxModeGames.style.opacity = "0";
setTimeout(()=>{
sectionModeSelectionMode.innerHTML = " "
sectionModeSelectionMode.style.display = "none"
boxModeGames.style.display = "none";
sectionModeServerRepositoriGames.style.display = "block";
inicializarModoSrgGames()
},800)
},600)
},500)
})
function inicializarModoSrgGames(){
document.querySelector('.subBody').style.display = "block";
{
const h1Animation      = document.querySelector('.h1AnimationStart');
const pAnimationStart  = document.querySelector('.pAnimationStart');
const p1AnimationStart = document.querySelector('.p1AnimationStart');
const p2AnimationStart = document.querySelector('.p2AnimationStart');
const p3AnimationStart = document.querySelector('.p3AnimationStart');
const p4AnimationStart = document.querySelector('.p4AnimationStart');
const p6AnimationStart = document.querySelector('.clickEnter');
animation()
async function animation (){
const pAnimation = await setTimeout(()=>{
pAnimationStart.style.opacity = "1"},500);
const p1Animation = await setTimeout(()=>{
p1AnimationStart.style.opacity = "1"},700);
const p2Animation = await setTimeout(()=>{
p2AnimationStart.style.opacity = "1"},800);
const p3Animation = await setTimeout(()=>{
p3AnimationStart.style.opacity = "1"},900);
const p4Animation = await setTimeout(()=>{
p4AnimationStart.style.opacity = "1"},1000);
const p6Animation = await setTimeout(()=>{
p6AnimationStart.style.opacity = "1";
p6AnimationStart.classList.add("animationFlitEnter")},1500);
}
}
{
const p7AnimationStart = document.querySelector('.clickEnterResponsive');
const contenedorLogin = document.querySelector('.LoginUserGame');
const contenedorStartAnimation = document.querySelector('.startAnimation')
const body = document.querySelector('body');
const responsive = document.getElementById('responsiveDiv');
let p6AnimationStart = document.querySelector('.clickEnter');
const clickEnterAnimacion = document.querySelector('.clickEnter');
const contenedorStartAnimationGet = contenedorStartAnimation.getAttribute('style');
if(contenedorStartAnimation.style.display === "block"){
body.addEventListener('keydown', (e)=>{
if(e.key === "Enter" && p6AnimationStart.style.opacity === "1"&& events){
events = false;
transitionLOgin();
async function transitionLOgin (){  
p6AnimationStart.style.display = "none";
p7AnimationStart.style.display = "none"
contenedorStartAnimation.style.transform = "scale(1900%)";
const temStartAnimation = await setTimeout(()=>{
contenedorStartAnimation.style.display = "none";
},500)
 const temStartAnimation2  = await setTimeout(()=>{contenedorLogin.style.opacity = "1";},1000) 
}
}
});	
const arrayImg = [
`${servidor}/perfiles/jugadorUno.gif`,`${servidor}/perfiles/jugadorDos.gif`,
`${servidor}/perfiles/jugador4.jpg`,`${servidor}/perfiles/jugador5.jpg`,
`${servidor}/perfiles/jugador6.jpg`,`${servidor}/perfiles/jugador7.jpg`,
`${servidor}/perfiles/jugador8.jpg`,`${servidor}/perfiles/jugador9.jpg`,
`${servidor}/perfiles/jugador10.jpg`,`${servidor}/perfiles/jugador11.jpg`,
`${servidor}/perfiles/jugador12.jpg`,`${servidor}/perfiles/jugador13.jpg`,
`${servidor}/perfiles/jugador14.jpg`,`${servidor}/perfiles/jugador15.jpg`,
`${servidor}/perfiles/jugador16.jpg`,`${servidor}/perfiles/jugador17.jpg`,
`${servidor}/perfiles/jugador18.jpg`,`${servidor}/perfiles/jugador19.jpg`,
`${servidor}/perfiles/jugador20.jpg`,`${servidor}/perfiles/jugador21.jpg`,
`${servidor}/perfiles/jugador22.jpg`,`${servidor}/perfiles/jugador23.jpg`,
]
let span = document.getElementById('spanChangeImguser');
let spanI = document.querySelector('.iSpan')
let contenedor = document.getElementById('imgChange');
let contenedorPadre = document.querySelector('.imgChangeContainerJS');
let imgAvatar = document.getElementById('userAvatar');
imgAvatar.src = `${servidor}/perfiles/jugadorDos.gif`;
arrayImg.forEach((srcimg)=>{//inyector de img
if(contenedorPadre.contains.length != arrayImg.length){
const img = document.createElement('IMG');
img.src = srcimg;
img.classList.add('imgUserRequestServer')
contenedorPadre.appendChild(img)
}
})
spanI.addEventListener('mouseup',()=>{
span.appendChild(contenedorPadre)
span.style.borderRadius = "10px";
span.classList.add('imgChange_responsive')
let firstChild = span.firstElementChild;
let sblingElement = firstChild.nextElementSibling;
sblingElement.style.position = "relative";
	 	sblingElement.style.display = "block";
})
const images = document.querySelectorAll('.imgUserRequestServer');
images.forEach( (e) => {
e.addEventListener('click', ()=>{
let firstChild = span.firstElementChild;
let sblingElement = firstChild.nextElementSibling;
imgAvatar.src = e.src;
sblingElement.style.position = "absolute";
sblingElement.style.display = "none";
span.style.borderRadius = "50%";
span.classList.remove('imgChange_responsive')
span.removeAttribute('class')
})
})
if(contenedorStartAnimation.style.display === "block"){
document.querySelector('html').addEventListener('click', (e)=>{
if(events){
events = false;
transitionLOgin();
async function transitionLOgin (){  
p6AnimationStart.style.display = "none";
p7AnimationStart.style.display = "none"
contenedorStartAnimation.style.transform = "scale(1900%)";
const temStartAnimation = await setTimeout(()=>{
contenedorStartAnimation.style.display = "none";
},200)
 const temStartAnimation2  = await setTimeout(()=>{contenedorLogin.style.opacity = "1";},1000) 
}
}
})
}
}
}
asyncFunction();
async function asyncFunction (){
const buttonEnvioPeticionNewUserOne = document.getElementById('buttonEnvioPeticionNewUser')	;
let pStatus = document.getElementById('statusConectionUsers');
buttonEnvioPeticionNewUserOne.addEventListener('click',()=>{
const promiseVerificacionInput = new Promise(resolve=>{
let whatInputStatus = true;
if(input.value.length === 0)resolve({ 
status : "error",
TypeError : "Ingrese un nombre valido por favor"
});if(input.value === " ")resolve({ 
status : "error",
TypeError : "Ingrese un nombre valido por favor, ingreso un espacio y no es valido"
});
if(input.value.length > 8) resolve({
status :"error",
TypeError : `Has ingresado <b style="color:red;">${input.value.length}</b>, solo es aceptable 8 caracteres` 
})
for(let i=0; i < input.value.length; i++){
if(input.value.charAt(i) === "/" ||  input.value.charAt(i) === "\\" || input.value.charAt(i) === ":" || input.value.charAt(i) === "*" 
|| input.value.charAt(i) === "?" || input.value.charAt(i) === `"` || input.value.charAt(i) === "<" || input.value.charAt(i) === ">" 
|| input.value.charAt(i) === "|"  || input.value.charAt(i) === " ")
{ 
whatInputStatus = false
resolve({ 
status : "error",
TypeError : `Ups, has ingresado el caracter <b style="color:red;">${input.value.charAt(i)}</b> y no es aceptable <b style="color:grey;">(Asegurate de no escribir un espacio)</b>`
})
}
}
if(whatInputStatus){
elementoHtml()
resolve({
status : "ok",
exito : "OK, vamos"
})
}
})
promiseVerificacionInput.then(data => { 
if(data.status === "error") pStatus.innerHTML = data.TypeError
else if(data.status === "ok"){
pStatus.innerHTML = data.exito
document.querySelector('.loginPrompt').style.display = "block";
document.querySelector('.statusRepositori').style.display = "block";
document.querySelector('.LoginUserGame').style.display = "none";
const peticionUsuarios = new XMLHttpRequest();
peticionUsuarios.addEventListener('load', async ()=>{ 
let pStatus = document.getElementById('PstatusRepositori');
let respuestaServer = await JSON.parse(peticionUsuarios.response);
let respuestaAndConvert = await JSON.parse(respuestaServer);
let respuestaAndConvertArray = Object.keys(respuestaAndConvert)
const verificacionUsers = respuestaAndConvertArray.some(user => user === input.value) 
if (verificacionUsers){
pStatus.textContent = "Ya tienes un repositorio";
document.querySelector('.statusRepositori').style.opacity = "0";
const time0 =   setTimeout(()=>{
document.querySelector('.contenedorJson').style.opacity = "1";                 
}, 100)
const time1 =  setTimeout(()=>{
document.querySelector('.contenedorJson').style.display = "block";
},500)
const time2 =  setTimeout(()=>{document.querySelector('.statusRepositori').style.display = "none";startInterface()},1000);
}else if(verificacionUsers === false){ 
 let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "newUser",
"status" : "offline",
"name" : `${input.value}`,
"avatar" : `${img.src}`,
"friends" : [],
"trofeos" : " "
}),
headers : {
"Content-Type" : "application/json"
}
}   
fetch(servidor, headers)
.then(respuestaServer => respuestaServer.json())
.then(respuestaJson => pStatus.textContent = respuestaJson.mensaje)
pStatus.textContent = "creando repositorio";
const peticionRepositori =  new XMLHttpRequest();
peticionRepositori.addEventListener('readystatechange',  ()=>{
if (pStatus.readyState === 1)  pStatus.textContent = "verificando servidor"; 
else if (pStatus.readyState === 2)  pStatus.textContent = "enviando peticion"; 
else if (pStatus.readyState === 3)  pStatus.textContent = "peticion escuchada"; 
})
peticionRepositori.addEventListener('load', async () =>{ 
let respuesta = await JSON.parse(peticionRepositori.response)
pStatus.textContent = respuesta.mensaje;
if (respuesta.mensaje === "ok" ) {
elementoHtml()
document.querySelector('.statusRepositori').style.opacity = "0";
const time0 = setTimeout(()=>{
document.querySelector('.contenedorJson').style.opacity = "1";                 
}, 100)
const time1 =  setTimeout(()=>{
document.querySelector('.contenedorJson').style.display = "block";
},500)
const time2 =  setTimeout(()=>{document.querySelector('.statusRepositori').style.display = "none";startInterface()},1000);
}
else if(respuesta.mensaje === "error"){
document.querySelector('.LoginUserGame').style.display = "none";
document.querySelector('.errorSever').style.display = "block";
}
});
peticionRepositori.open('POST', servidor);
peticionRepositori.setRequestHeader('Content-Type', 'application/json;charset=UTF8')
peticionRepositori.send(JSON.stringify({
"name" : input.value,
"funcion" : "createNewRepositori",
"nameRepositori" : input.value
}))
}
})
peticionUsuarios.open('POST', servidor);
peticionUsuarios.setRequestHeader('Content-Type', 'application/json;charset=UTF8')
peticionUsuarios.send(JSON.stringify({
"funcion":"requestUsers",
"name" : input.value,
}))
}
})
})
input.addEventListener('keydown', (e) =>{
	if(e.key === "Enter"){
		const promiseVerificacionInput = new Promise(resolve=>{
let whatInputStatus = true;
if(input.value.length === 0)resolve({ 
status : "error",
TypeError : "Ingrese un nombre valido por favor"
});if(input.value === " ")resolve({ 
status : "error",
TypeError : "Ingrese un nombre valido por favor, ingreso un espacio y no es valido"
});
if(input.value.length > 8) resolve({
status :"error",
TypeError : `Has ingresado <b style="color:red;">${input.value.length}</b>, solo es aceptable 8 caracteres` 
})
for(let i=0; i < input.value.length; i++){
if(input.value.charAt(i) === "/" ||  input.value.charAt(i) === "\\" || input.value.charAt(i) === ":" || input.value.charAt(i) === "*" 
|| input.value.charAt(i) === "?" || input.value.charAt(i) === `"` || input.value.charAt(i) === "<" || input.value.charAt(i) === ">" 
|| input.value.charAt(i) === "|"  || input.value.charAt(i) === " ")
{ 
whatInputStatus = false
resolve({ 
status : "error",
TypeError : `Ups, has ingresado el caracter <b style="color:red;">${input.value.charAt(i)}</b> y no es aceptable <b style="color:grey;">(Asegurate de no escribir un espacio)</b>`
})
}
}
if(whatInputStatus){
elementoHtml()
resolve({
status : "ok",
exito : "OK, vamos"
})
}
})
promiseVerificacionInput.then(data => { 
if(data.status === "error") pStatus.innerHTML = data.TypeError
else if(data.status === "ok"){
pStatus.innerHTML = data.exito
document.querySelector('.loginPrompt').style.display = "block";
document.querySelector('.statusRepositori').style.display = "block";
document.querySelector('.LoginUserGame').style.display = "none";
const peticionUsuarios = new XMLHttpRequest();
peticionUsuarios.addEventListener('load', async ()=>{ 
let pStatus = document.getElementById('PstatusRepositori');
let respuestaServer = await JSON.parse(peticionUsuarios.response);
let respuestaAndConvert = await JSON.parse(respuestaServer);
let respuestaAndConvertArray = Object.keys(respuestaAndConvert)
const verificacionUsers = respuestaAndConvertArray.some(user => user === input.value) 
if (verificacionUsers){
pStatus.textContent = "Ya tienes un repositorio";
document.querySelector('.statusRepositori').style.opacity = "0";
const time0 =   setTimeout(()=>{
document.querySelector('.contenedorJson').style.opacity = "1";                 
}, 100)
const time1 =  setTimeout(()=>{
document.querySelector('.contenedorJson').style.display = "block";
},500)
const time2 =  setTimeout(()=>{document.querySelector('.statusRepositori').style.display = "none";startInterface()},1000);
}else if(verificacionUsers === false){ 
 let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "newUser",
"status" : "offline",
"name" : `${input.value}`,
"avatar" : `${img.src}`,
"friends" : [],
"trofeos" : " "
}),
headers : {
"Content-Type" : "application/json"
}
}   
fetch(servidor, headers)
.then(respuestaServer => respuestaServer.json())
.then(respuestaJson => pStatus.textContent = respuestaJson.mensaje)
pStatus.textContent = "creando repositorio";
const peticionRepositori =  new XMLHttpRequest();
peticionRepositori.addEventListener('readystatechange',  ()=>{
if (pStatus.readyState === 1)  pStatus.textContent = "verificando servidor"; 
else if (pStatus.readyState === 2)  pStatus.textContent = "enviando peticion"; 
else if (pStatus.readyState === 3)  pStatus.textContent = "peticion escuchada"; 
})
peticionRepositori.addEventListener('load', async () =>{ 
let respuesta = await JSON.parse(peticionRepositori.response)
pStatus.textContent = respuesta.mensaje;
if (respuesta.mensaje === "ok" ) {
elementoHtml()
document.querySelector('.statusRepositori').style.opacity = "0";
const time0 = setTimeout(()=>{
document.querySelector('.contenedorJson').style.opacity = "1";                 
}, 100)
const time1 =  setTimeout(()=>{
document.querySelector('.contenedorJson').style.display = "block";
},500)
const time2 =  setTimeout(()=>{document.querySelector('.statusRepositori').style.display = "none";startInterface()},1000);
}
else if(respuesta.mensaje === "error"){
document.querySelector('.LoginUserGame').style.display = "none";
document.querySelector('.errorSever').style.display = "block";
}
});
peticionRepositori.open('POST', servidor);
peticionRepositori.setRequestHeader('Content-Type', 'application/json;charset=UTF8')
peticionRepositori.send(JSON.stringify({
"name" : input.value,
"funcion" : "createNewRepositori",
"nameRepositori" : input.value
}))
}
})
peticionUsuarios.open('POST', servidor);
peticionUsuarios.setRequestHeader('Content-Type', 'application/json;charset=UTF8')
peticionUsuarios.send(JSON.stringify({
"funcion":"requestUsers",
"name" : input.value,
}))
}
})
	}
})
}
function startInterface(){
let headers = { 
method : "post",
body : JSON.stringify({
"pregunta" : " ",
"respuestas1" : " ",
"respuestas2" : " ",
"respuestas3" : " ",
"respuestaCorrecta" : " ",
"funcion" : "conectionQuestionUser",
"name" : `${input.value}`,
"status" : "",
"userConection" : `${input.value}`,
}),
"headers" : {"Content-Type" : "application/json"}
}
fetch(servidor,headers)
.then(dataServer=> dataServer.json())
.then(json => {})
const promesaVerificacionServidor = new Promise((resolve)=>{
let headers = {
method : "post",
body: JSON.stringify({
"funcion" : "requestUsers", "name" : `${input.value}`
}),
headers:{"Content-Type" : "application/json"}}
fetch(servidor, headers)
.then(respuestaServer => respuestaServer.json())
.then(async (respuestaJsonOne) => {
let respuestaJson = await JSON.parse(respuestaJsonOne)
const peticionNewUser = new XMLHttpRequest();
const data = {
funcion : "newUser",
status : "online",
name : `${input.value}`,
avatar : `${img.src}`,
friends : [],
trofeos : 0 
};
let arrayAGuardar = respuestaJson[`${input.value}`].friends;
let guardarTrofeos = respuestaJson[`${input.value}`].trofeos;
data.friends = arrayAGuardar[0];
data.trofeos = guardarTrofeos;
peticionNewUser.addEventListener('load', ()=>{
let imgUserNav = document.getElementById('imgNavUsers');
imgUserNav.setAttribute("src", img.src);
imgUserNav.setAttribute("class", input.value);	
let respuesta = JSON.parse(peticionNewUser.response);
pStatus.textContent = respuesta.mensaje;
resolve(peticionNewUser.response);
// if () {}
})
peticionNewUser.open('POST',servidor);
peticionNewUser.setRequestHeader("Content-Type","application/json;charset=UTF8")
peticionNewUser.send(JSON.stringify(data));
})
});
promesaVerificacionServidor.then(async (datosRecibidos) => {
const respuestaServer = JSON.parse(datosRecibidos);
if(respuestaServer.mensaje === "Error"){
document.querySelector('.errorSever').style.display = "block";
document.querySelector('.subBody').style.display = "none";
}
})
}
function elementoHtml(){
const load = document.querySelector('.load');
const loader = document.querySelector('.loader')
const peticionUser = new XMLHttpRequest();  ////////
const pstatus = document.getElementById('pStatus');
const usersP = document.getElementById('users');
const pstatusConection = document.getElementById('statusConection');
const contenedorStatus = document.querySelector('.contenedorStatusServer')
peticionUser.addEventListener('readystatechange',()=>{
if (peticionUser.status === 0) pstatus.textContent = "Ups, el servidor esta desconectado, espere un momento";
if (peticionUser.readyState === 1) pstatus.textContent = "Buscando servidor";
if (peticionUser.readyState === 2) pstatus.textContent = "Entrando a servidor";
if(peticionUser.readyState === 3) pstatus.textContent= "Descargando Respuesta";
if(peticionUser.status === 200 || peticionUser.status === 201) {
setTimeout(()=>{pStatus.style.display ="none"})
contenedorStatus.style.display = "none";
load.style.display = "inline-block";
loader.style.display = "none";
loader.style.position = "absolute";
}
})
peticionUser.addEventListener('load', ()=>{
try{
const respuestaDeServidorUser = JSON.parse(peticionUser.response)
if (respuestaDeServidorUser.datos === "error") pstatusConection.innerHTML = `Respuesta del servidor ${respuestaDeServidorUser.error}`;
if (respuestaDeServidorUser.datos === "error" && respuestaDeServidorUser.funcion === "closed"){
if (respuestaDeServidorUser.funcion === "closed") {setTimeout(()=>{location.reload()},1000);}
}startUsersFunctions(input.value,servidor)
let respuestaServer = JSON.parse(peticionUser.response);
let respuestaServerConvert = JSON.parse(respuestaServer);
let respuestaAndConvertArray = Object.keys(respuestaServerConvert);
let iAmigos = document.getElementById('pIAmigos');
iAmigos.textContent = respuestaServerConvert[input.value].friends[0].length
let respuestaAndConvertArrayConvertUser1 = respuestaAndConvertArray.filter(user => user != input.value  )
let respuestaAndConvertArrayConvertUser = respuestaAndConvertArrayConvertUser1.filter(user => user != "nuevosDatos")
if(peticionUser.status === 200){
const data = JSON.parse(peticionUser.response);
pstatus.innerHTML= `Servidor <h6>${servidor}</h6>`;
}
}catch(e){console.log(`Ups hay un error : ${e}`)}
})
try{
peticionUser.open('POST',servidor)
peticionUser.setRequestHeader("Content-Type","application/json;charset=UTF8")
peticionUser.send(JSON.stringify({
"funcion" : "requestUsers",
"name" : input.value,
}));
}catch(error){
console.log("hola")
}
}
}