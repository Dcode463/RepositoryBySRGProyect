const inputs = document.getElementById('inputSearch');
function startUsersFunctions(user,servidor){
search()
let server = servidor;
let iAmigos = document.getElementById('iUsers'); 
let iNotificacion = document.getElementById('Isolicitud') 
const friendsContainers = document.getElementById('friendsContainer'); 
const pChatAcedor = document.getElementById('statusConectionUsers2')
const userName = document.getElementById('imgNavUsers');
const arrayUser = [];
const error = [];
let iclass;
let arrayUserLocal;
iNotificacion.addEventListener('click', ()=>{
document.querySelector('.nav').style.opacity = "0.4";
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
buttonsOPacity.forEach(e=>{
e.style.display = "none"
})
pChatAcedor.innerHTML = `<p style="display:inline-block;">Buscando notificaciones ... <button class="cancelarVerificacionForNotificacion">Cancelar</button></p>`;
startVerificacionNotificacionForUsers(user,server);
})
function search(){
const iButtons = document.getElementById('iSearch');
iButtons.addEventListener('click', ()=>{
const promesaVerificadorinputs = new Promise(resolve => {
if (inputs.value.length === 0) resolve({status : "error",
TypeError : `<p>Escribe el nombre de tu amigo</p>`})
else if (inputs.value === " ") resolve({status : "error",
TypeError :  `<p>Ups, has escrito un espacio</p>`})
else resolve({status:"ok",
inf : `<p>KippBotUsers : Ok, buscando a tu amigo <i class="fa-solid fa-spinner fa-spin"></i></p>`})
})
.then(resultado => {
if (resultado.status === "error") pChatAcedor.innerHTML = resultado.TypeError
if (resultado.status === "ok"){ 
pChatAcedor.innerHTML = resultado.inf;
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "requestUsers", "name" : `${user}`
}),
headers: {"Content-Type" : "application/json"}
}
fetch(server,headers)
.then(dataServer => dataServer.json())
.then(async (jsonData) =>{
let jsonParse = await JSON.parse(jsonData)
if (jsonParse[`${inputs.value}`] != undefined){
document.getElementById('pIAmigos').innerHTML = `${jsonParse[user].friends[0].length}`
arrayUser.splice(0,1,jsonParse[`${inputs.value}`])
let arrayUserOnline = jsonParse[user].friends;
let verificacion = arrayUserOnline[0].some(name => name === inputs.value)
if(verificacion) iclass = `<img style="width: 20px;height: 20px;padding: 0; color:white;" src="iconos/yaEsTuAmigo.png">`
else{ 
iclass = `<img style="width: 20px;height: 20px;padding: 0;" src="iconos/addFriends.png" color:white; class="iAddFriends">`
arrayUserOnline[0].push(jsonParse[inputs.value].name)
arrayUserLocal = [...arrayUserOnline]
}
pChatAcedor.innerHTML=`  <b style ="color: #0097e2 ;">KippBotUsers</b>  <br> ¿Es tu amigo?`;
if(jsonParse[`${inputs.value}`].name === input.value){
const fragmento = new DocumentFragment(); 
const iSearchResultContainer = document.createElement('I'); iSearchResultContainer.innerHTML = `${iclass}`
const pSearchResultContainer = document.createElement('P'); pSearchResultContainer.classList.add('pSearchResultContainer');
pSearchResultContainer.innerHTML = "Tu";
const imgSearchResultContainer = document.createElement('IMG'); imgSearchResultContainer.classList.add('imgSearchResultContainer');
imgSearchResultContainer.src = img.src;
const divSearchResultContainer = document.createElement('DIV'); divSearchResultContainer.classList.add('divSearchResultContainer')
divSearchResultContainer.appendChild(pSearchResultContainer);
divSearchResultContainer.appendChild(imgSearchResultContainer);
fragmento.appendChild(divSearchResultContainer);
pChatAcedor.appendChild(fragmento);      
}else{
const fragmento = new DocumentFragment(); 
const iSearchResultContainer = document.createElement('I'); iSearchResultContainer.innerHTML = `${iclass}`
const pSearchResultContainer = document.createElement('P'); pSearchResultContainer.classList.add('pSearchResultContainer');
pSearchResultContainer.innerHTML = jsonParse[`${inputs.value}`].name;
const imgSearchResultContainer = document.createElement('IMG'); imgSearchResultContainer.classList.add('imgSearchResultContainer');
imgSearchResultContainer.src = jsonParse[`${inputs.value}`].avatar
const divSearchResultContainer = document.createElement('DIV'); divSearchResultContainer.classList.add('divSearchResultContainer')
divSearchResultContainer.appendChild(pSearchResultContainer);
divSearchResultContainer.appendChild(iSearchResultContainer);
divSearchResultContainer.appendChild(imgSearchResultContainer);
fragmento.appendChild(divSearchResultContainer);
pChatAcedor.appendChild(fragmento)
addFriends()     
}       
}
else pChatAcedor.innerHTML = `<p>Ups, el usuario "${inputs.value}" no esta registrado. ¡Invitalo!</p>`
pChatAcedor.addEventListener('blur', ()=>{ 
pChatAcedor.innerHTML = "KippBotUsers : Con quien jugaras hoy?"
})
})
// .catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })
}
})         
})
inputs.addEventListener('keydown',(e)=>{
	if(e.key === "Enter"){
		const promesaVerificadorinputs = new Promise(resolve => {
if (inputs.value.length === 0) resolve({status : "error",
TypeError : `<p>Escribe el nombre de tu amigo</p>`})
else if (inputs.value === " ") resolve({status : "error",
TypeError :  `<p>Ups, has escrito un espacio</p>`})
else resolve({status:"ok",
inf : `<p>KippBotUsers : Ok, buscando a tu amigo <i class="fa-solid fa-spinner fa-spin"></i></p>`})
})
.then(resultado => {
if (resultado.status === "error") pChatAcedor.innerHTML = resultado.TypeError
if (resultado.status === "ok"){ 
pChatAcedor.innerHTML = resultado.inf;
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "requestUsers", "name" : `${user}`
}),
headers: {"Content-Type" : "application/json"}
}
fetch(server,headers)
.then(dataServer => dataServer.json())
.then(async (jsonData) =>{
let jsonParse = await JSON.parse(jsonData)
if (jsonParse[`${inputs.value}`] != undefined){
document.getElementById('pIAmigos').innerHTML = `${jsonParse[user].friends[0].length}`
arrayUser.splice(0,1,jsonParse[`${inputs.value}`])
let arrayUserOnline = jsonParse[user].friends;
let verificacion = arrayUserOnline[0].some(name => name === inputs.value)
if(verificacion) iclass = `<img style="width: 20px;height: 20px;padding: 0; color:white;" src="iconos/yaEsTuAmigo.png">`
else{ 
iclass = `<img style="width: 20px;height: 20px;padding: 0;" src="iconos/addFriends.png" color:white; class="iAddFriends">`
arrayUserOnline[0].push(jsonParse[inputs.value].name)
arrayUserLocal = [...arrayUserOnline]
}
pChatAcedor.innerHTML=`  <b style ="color: #0097e2 ;">KippBotUsers</b>  <br> ¿Es tu amigo?`;
if(jsonParse[`${inputs.value}`].name === input.value){
const fragmento = new DocumentFragment(); 
const iSearchResultContainer = document.createElement('I'); iSearchResultContainer.innerHTML = `${iclass}`
const pSearchResultContainer = document.createElement('P'); pSearchResultContainer.classList.add('pSearchResultContainer');
pSearchResultContainer.innerHTML = "Yo";
const imgSearchResultContainer = document.createElement('IMG'); imgSearchResultContainer.classList.add('imgSearchResultContainer');
imgSearchResultContainer.src = img.src;
const divSearchResultContainer = document.createElement('DIV'); divSearchResultContainer.classList.add('divSearchResultContainer')
divSearchResultContainer.appendChild(pSearchResultContainer);
divSearchResultContainer.appendChild(imgSearchResultContainer);
fragmento.appendChild(divSearchResultContainer);
pChatAcedor.appendChild(fragmento);      
}else{
const fragmento = new DocumentFragment(); 
const iSearchResultContainer = document.createElement('I'); iSearchResultContainer.innerHTML = `${iclass}`
const pSearchResultContainer = document.createElement('P'); pSearchResultContainer.classList.add('pSearchResultContainer');
pSearchResultContainer.innerHTML = jsonParse[`${inputs.value}`].name;
const imgSearchResultContainer = document.createElement('IMG'); imgSearchResultContainer.classList.add('imgSearchResultContainer');
imgSearchResultContainer.src = server + jsonParse[`${inputs.value}`].avatar
const divSearchResultContainer = document.createElement('DIV'); divSearchResultContainer.classList.add('divSearchResultContainer')
divSearchResultContainer.appendChild(pSearchResultContainer);
divSearchResultContainer.appendChild(iSearchResultContainer);
divSearchResultContainer.appendChild(imgSearchResultContainer);
fragmento.appendChild(divSearchResultContainer);
pChatAcedor.appendChild(fragmento)
addFriends()     
}       
}
else pChatAcedor.innerHTML = `<p>Ups, el usuario "${inputs.value}" no esta registrado. ¡Invitalo!</p>`
pChatAcedor.addEventListener('blur', ()=>{ 
pChatAcedor.innerHTML = "KippBotUsers : Con quien jugaras hoy?"
})
})
// .catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })
}
})
	}
})
}
function addFriends(){
try{
const containerFriends = document.getElementById('friendsContainer'); 
const contenedorChat = document.getElementById('statusConectionUsers2');
const elementoI = document.querySelector('.iAddFriends');
if(elementoI === null) throw{
status : "error",
info : "Ya es tu amigo"
}
let elementoPadre = elementoI.parentElement;
let elementoHijo = elementoPadre.firstElementChild; 
elementoI.addEventListener('click', ()=>{
contenedorChat.innerHTML =`  <b style ="color: #0097e2 ;">KippBotUsers</b>  <br> guardando ...`;
let data = {
"funcion":"newUser",
"name" : `${user}`,
"status" : "online",
"avatar" : `${img.getAttribute('value')}`,
"friends" : [] 
}
data.friends = arrayUserLocal[0]
let headers = {
method :"post",
body : JSON.stringify(data),
headers :{"Content-Type": "application/json"}
}
fetch(server,headers)
.then(dataServer => dataServer.json())
.then(async (respuestaJsonP) => {
let respuestaJson = await respuestaJsonP;
if(respuestaJson.mensaje === "Error") contenedorChat.innerHTML = respuestaJson.mensaje
else{
document.getElementById('pIAmigos').innerHTML= `${arrayUserLocal[0].length}`;
contenedorChat.innerHTML = `<b style= "color: #0097e2 ;">KippBotUsers</b> <br> Tu amigo ya esta en tu lista <br> <b style="font-size :10px; color:grey;">Ahora buscalo en tu lista de amigos y conectate con el y a jugar se ah dicho</b>`
}
})
// .catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })

})
}
catch(e){
if(e.status != undefined) error.push(e.status)
else console.log(e)
}
}
iAmigos.addEventListener('click',()=>{
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
buttonsOPacity.forEach(e=>{
e.style.display = "none"
})
try{
user = userName.getAttribute('class')
pChatAcedor.innerHTML = `<p>Se paciente que mi servidor de milagro corre</p><div class="loaderFriends"></div>`;
let headers = {
method : "post",
body : JSON.stringify({
"funcion" : "requestUsers",
"name" : `${user}`
}),
headers:{
"Content-Type":"application/json"
} 
}
fetch(server,headers)
.then(respuestaServer => respuestaServer.json())
.then(async (respuestaJsonP) => {
let respuestaJson = await respuestaJsonP; 
pChatAcedor.innerHTML = "<p>¿Con quien vas a jugar?</p>"
friendsContainers.innerHTML = " "
let iButtonCancel = document.createElement('I');iButtonCancel.innerHTML = `<img src="iconos/X.png">`; iButtonCancel.classList.add('cancelContainerFriends');
iButtonCancel.addEventListener('click',()=>{
friendsContainers.innerHTML = ". "
document.querySelector('.nav').style.opacity = "1";
pChatAcedor.style.opacity = "1"
friendsContainers.style.display = "none"
buttonsOPacity.forEach(e=>{
e.style.display = "inline-block"
})
})
friendsContainers.appendChild(iButtonCancel)
document.querySelector('.nav').style.opacity = "0.4";
pChatAcedor.style.opacity = "0.6"
friendsContainers.style.display = "block"
let jsonParse = JSON.parse(respuestaJson);
let convertArray = jsonParse[user].friends[0];
for(let i=0; i < convertArray.length; i++){ 
let fragmento = new DocumentFragment();
let div = document.createElement('DIV'); div.classList.add('divFriendsContainer'); div.setAttribute('value', jsonParse[convertArray[i]].name)
let pName = document.createElement('P'); pName.classList.add('pNameFriendsContainer'); pName.textContent = jsonParse[convertArray[i]].name;
let imgAvatar = document.createElement('IMG'); imgAvatar.classList.add('imgAvatartFriendsContainer'); imgAvatar.src = `${server}${jsonParse[convertArray[i]].avatar}`;
let iGamePad = document.createElement('I'); iGamePad.classList.add('fa-solid'); iGamePad.innerHTML = `<p><img style="width: 20px;height: 20px;padding: 0; color:white;" src="iconos/gamePad.png"></p>`; iGamePad.classList.add('iGamePad');
if(jsonParse[convertArray[i]].status === "online")  imgAvatar.style.border = "solid 4px #27ff03";
else imgAvatar.style.border = "solid 4px  grey";
div.appendChild(iGamePad);
div.appendChild(pName);
div.appendChild(imgAvatar);
fragmento.appendChild(div);
friendsContainers.appendChild(fragmento);
}
const elementoIGamepad = document.querySelectorAll('.iGamePad');
elementoIGamepad.forEach(e=>{ 
e.addEventListener('click', ()=>{
friendsContainers.innerHTML = ". "
document.querySelector('.nav').style.opacity = "1";
pChatAcedor.style.opacity = "1"
friendsContainers.style.display = "none"
enviarInvitacion.play() 
document.querySelector('.nav').style.opacity = "0.4";
let buttonsOPacity = document.querySelectorAll('.buttonsNav')
buttonsOPacity.forEach(e=>{
e.style.display = "none"
})
let elementoPadreforI = e.parentElement; 
let valueElementoPadreforI = elementoPadreforI.getAttribute("value");
let img = document.getElementById('imgNavUsers');
pChatAcedor.innerHTML = `<p>Mandando invitacion a ${valueElementoPadreforI}</p>`;
sendInvitation(valueElementoPadreforI,servidor,user,img.src)
})
})
})
// .catch(error=>{
// let buttnReiniciar = document.getElementById('reinicarApp_Error')
// let containerForError = document.getElementById('EroorFetch');
// setTimeout(()=>{
// containerForError.style.opacity = "0";
// containerForError.style.display = "block"
// setTimeout(()=>{
// containerForError.style.opacity = "1";
// document.getElementById('containerMax').style.display = "none";
// buttnReiniciar.addEventListener('click',()=>{
// location.reload()
// })
// },500)
// },1000)
// })
}
catch(e){ 
document.querySelector('.nav').style.opacity = "1i";
pChatAcedor.style.opacity = "1"
friendsContainers.style.display = "none";
}
})
}