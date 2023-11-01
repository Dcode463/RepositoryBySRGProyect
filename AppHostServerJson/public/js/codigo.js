//servidor port 
let servidor;
let elementosCaja = document.querySelectorAll('.caja');
let urlLocal = location.hostname
servidor = `http://${urlLocal}:8070`;
console.log(`conectado ${servidor}`);
/////////////////////////////////////////////////////////////////////////////////////////
let userNames;
let inputMat;
let guardarMateria;
let showPreguntas = document.getElementById('questionButtonShow')
const inputPass = document.getElementById('pass');
const buttonInputPass = document.getElementById('buttonPasswordVerificar')
const containerLogin = document.querySelector('.contenLogin')
const infoLogin  = document.getElementById('infoLogin');
const inputUserName = document.getElementById('inputUserName');
const  buttonSendMat = document.getElementById('enviarMat');
const subBody = document.querySelector('.subBody');
const buttonSiguinte_Name = document.getElementById('siguiente_Name');
const salaEsperaLogin = document.querySelector('.salaEsperaLogin');
const status_salaEsperaLoginP = document.getElementById('status_salaEsperaLogin');
const contetLogin = document.getElementById('contenedorMAXFORContentLogin');
const buttonAceptarNewLogin = document.getElementById('buttonAceptarNewLogin');
const butonCancelarNewLogin = document.getElementById('buttonNoAceptarNewLogin')
const containerNewLoginServer = document.getElementById('createNewUserContainer');
//////////////Chat bot/////
const pchatBot = document.getElementById('chatBotText')
/////////////inputs For login
const inputNameSendServerNewUser = document.getElementById('nombre_CreateNewUser');
const inputMateriaSendServerNewUser = document.getElementById('materia_CreateNewUser');
const inputPasswordSendServerNewUser = document.getElementById('password_CreateNewUser');
const buttonSendAlServer = document.getElementById('sendServerNewUser');
let objectModi;
//////////////////////////object content estudent
let contenedorByEstudiantes = document.getElementById('contentEstudiantes')
let containerEstudiantesPushElementJs = document.getElementById('containerEstudiantesPushElementJs');
const misEstudianteButtonNav = document.getElementById('misEstudianteButtonNav');
// const inputSearch = document.getElementById('inputSearch')
/*
containerLogin.style.display = "none";
startInterface(inputmateriaHtml.value);
 textSpam()
subBody.style.display = "block"
*/
siguiente_Name.addEventListener('click',()=>{eventoLoginForUserName()});
inputUserName.addEventListener('keydown',event=>{
 if(event.key === "Enter") eventoLoginForUserName()
})
eventoLoginForUserName=()=>{
		userNames = inputUserName.value;
	contetLogin.style.display = "none";
  salaEsperaLogin.style.display = "block";
	  let headers = {
	  	 method : "post",
	  	 body : JSON.stringify({
	  	 	"funcion" : "applicationCertificationTeacherJSON",
	  	 	"name" : "TeacherFunction"
	  	 }),
	  	 headers : {"Content-Type" : "application/json"}
	  }
	  fetch(servidor,headers)
	  .then(dataServer => dataServer.json())
	  .then(async(dataJson) => {
 let datosJsonAwait = await JSON.parse(dataJson);
 let filter = Object.keys(datosJsonAwait);
 // alert(filter)
 let obcjetoJsonNames = filter.filter(e => e != "NOREMOVE")
   if(obcjetoJsonNames.some(e => e === inputUserName.value)){
    status_salaEsperaLoginP.textContent = "Ya tiene un cuenta, conectando";

     setTimeout(()=>{
 infoLogin.textContent = "Ingrese su Contraseña"
 inputUserName.style.display = "none";
 buttonSiguinte_Name.style.display = "none";
 inputPass.style.display = "block";
 salaEsperaLogin.style.display = "none";
 contetLogin.style.display = "block";
 buttonInputPass.style.display = "block"
 buttonInputPass.addEventListener('click',()=>{eventoPass()});
 inputPass.addEventListener('keydown',event=>{if(event.key) eventoPass()})
 eventoPass=()=>{
 	 	if(inputPass.value.length > 0 && inputPass.value != " ") requestPass(inputUserName.value,inputPass.value)
 		else{
 			infoLogin.textContent = "ingrese un contraseña valida";
 			inputPass.style.border = "solid 2px red";
 			setTimeout(()=>{
 				inputPass.style.border = "none";
 			},1000)
 }
 }
     },500)
 }
   else{
   	   status_salaEsperaLoginP.innerHTML = `No tengo una cuenta que se llame ${inputUserName.value} <br> <br> 
   	                                       ¿Desea crear una cuenta?`;
   	    buttonAceptarNewLogin.style.display = "inline-block";
   	    butonCancelarNewLogin.style.display = "inline-block";
   	    buttonAceptarNewLogin.addEventListener('click',()=>{
                status_salaEsperaLoginP.innerHtml = `Ok, cambiando a modo login`;
                setTimeout(()=>{
                	    containerLogin.style.display = "none";
                	    containerNewLoginServer.style.display = "block";
                	    nameSend()
                	 },500)
   	    }) 
   	    butonCancelarNewLogin.addEventListener('click',()=>{
          location.reload();
   	    })

   } 
	  })
	 //  .catch(error=>{
	 // 	let buttnReiniciar = document.getElementById('reinicarApp_Error')
	 // 	 let containerForError = document.getElementById('EroorFetch');
	 // 	 setTimeout(()=>{
	 // 	 	containerForError.style.opacity = "0";
	 // 	 containerLogin.style.scale = "500%"
	 // 	 	containerForError.style.display = "block"
	 // 	 	setTimeout(()=>{
	 // 	 		containerForError.style.opacity = "1";
	 // 	 		containerLogin.style.display = "none";
     //        buttnReiniciar.addEventListener('click',()=>{
     //        	location.reload()
     //        })
	 // 	 	},500)
	 // 	 },1000)

	 // })
}
function nameSend(){
buttonSendAlServer.addEventListener('click',()=>{
const promiseVerificacionInput = new Promise(resolve=>{
  let whatInputStatus = true;
  if (inputNameSendServerNewUser.value.length === 0) resolve({ 
     status : "error",
     TypeError : "Ingrese un nombre valido por favor"
    });  if (inputNameSendServerNewUser.value === " ") resolve({ 
     status : "error",
     TypeError : "Ingrese un nombre valido por favor, ingreso un espacio y no es valido"
    });
    for(let i=0; i < inputNameSendServerNewUser.value.length; i++){
	if(inputNameSendServerNewUser.value.charAt(i) === "/" ||  inputNameSendServerNewUser.value.charAt(i) === "\\" || inputNameSendServerNewUser.value.charAt(i) === ":" || inputNameSendServerNewUser.value.charAt(i) === "*" 
		|| inputNameSendServerNewUser.value.charAt(i) === "?" || inputNameSendServerNewUser.value.charAt(i) === `"` || inputNameSendServerNewUser.value.charAt(i) === "<" || inputNameSendServerNewUser.value.charAt(i) === ">" 
         || inputNameSendServerNewUser.value.charAt(i) === "|"  || inputNameSendServerNewUser.value.charAt(i) === " ")
		{ 
				inputNameSendServerNewUser.style.border = "solid 2px red";
		setTimeout(()=>{
		inputNameSendServerNewUser.style.border = "none";
		},2000)
			whatInputStatus = false
			resolve({ 
           status : "error",
           TypeError : `Ups, has ingresado el caracter <b style="color:red;">${inputNameSendServerNewUser.value.charAt(i)}</b> y no es aceptable <b style="color:grey;">(Asegurate de no escribir un espacio)</b>`
         })
     }
}
if(inputMateriaSendServerNewUser.value.length === 0 || inputMateriaSendServerNewUser.value === " "){
		inputMateriaSendServerNewUser.style.border = "solid 2px red";
		setTimeout(()=>{
		inputMateriaSendServerNewUser.style.border = "none";
		},2000)
	resolve({
	status : "error",
	TypeError : "ingresa la materia porfavor"
})}
	if(inputPasswordSendServerNewUser.value.length < 4){
		inputPasswordSendServerNewUser.style.border = "solid 2px red";
		setTimeout(()=>{
		inputPasswordSendServerNewUser.style.border = "none";
		},2000)
		resolve({
		status : "error",
		TypeError : `Ingreso ${inputPasswordSendServerNewUser.value.length}, y solo se permiten como minimo 4 dijitos`
	})}
if(whatInputStatus){
 resolve({
	status : "ok",
	exito : "OK, vamos"
})
}
})
promiseVerificacionInput.then(e=>{
	 if(e.status === "error"){
  pchatBot.innerHTML = e.TypeError
	 }
	 else if (e.status === "ok") {
  salaEsperaLogin.style.display = "block";
  containerNewLoginServer.style.display = "none";
   status_salaEsperaLoginP.innerHtml = `Espere estoy conectandome al servidor
                                          <br><br> 
   	                                       Creando cuenta para "${inputNameSendServerNewUser.value}"`;
   	    buttonAceptarNewLogin.style.display = "none";
   	    butonCancelarNewLogin.style.display = "none";
   	    newUser(inputNameSendServerNewUser.value,inputPasswordSendServerNewUser.value,inputMateriaSendServerNewUser.value)
 	 }
})
})
}
function requestPass(userName,pass){
status_salaEsperaLoginP.textContent = "Verificando Contraseña";
contetLogin.style.display = "none";
salaEsperaLogin.style.display = "block";
	let headers= { 
method : "post",
body  : JSON.stringify({
	"funcion" : "veriRequesteTeacher0110",
	"name" : userName,
	"password" : pass
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidor,headers)
.then(dataServer => dataServer.json())
.then(async(dataJsons) => {
  let dataJson = await dataJsons;
	if(dataJson.resultado){
    startInterface(dataJson.materia)
	}
	else{
status_salaEsperaLoginP.textContent = "ups, la contraseña es incorrecta";
setTimeout(()=>{
contetLogin.style.display = "block";
salaEsperaLogin.style.display = "none";
},1500)
	}
})
// .catch(error=>{
// 	 	let buttnReiniciar = document.getElementById('reinicarApp_Error')
// 	 	 let containerForError = document.getElementById('EroorFetch');
// 	 	 setTimeout(()=>{
// 	 	 	containerForError.style.opacity = "0";
// 	 	 containerLogin.style.scale = "500%"
// 	 	 	containerForError.style.display = "block"
// 	 	 	setTimeout(()=>{
// 	 	 		containerForError.style.opacity = "1";
// 	 	 		containerLogin.style.display = "none";
//             buttnReiniciar.addEventListener('click',()=>{
//             	location.reload()
//             })
// 	 	 	},500)
// 	 	 },1000)

// 	 })
}
function startInterface(materia){
// textSpam()
hours()
document.getElementById('saludoP').innerHTML = `Hola ${inputUserName.value}, que desea hacer hoy?`
document.getElementById('userNameId').textContent = inputUserName.value;
document.getElementById('statusName').textContent = materia;
containerLogin.style.display = "none";
containerLogin.innerHTML = " "
subBody.style.display = "block";
guardarMateria = materia;
inputMat = materia;
//contenedores del html
const contenedorPreguntas = document.querySelector('.containerQuestion')
const dashBoard = document.querySelector(".todasLasPreguntas")
//ButtonsNav
const buttonHome = document.getElementById('inicioButton');
const buttonQuestion = document.getElementById('questionButton');
const dashBoardInicio = document.getElementById('inicioButtonDaskBoard');
const home = document.querySelector('.home')
// loadding
let loader = document.querySelector('.loader')
//guardarObject
//inputQuestionRequest
const contenedorPadreForContainerQuestion = document.querySelector('.containerListQuestion');
// const inputMateria = document.getElementById('materiaInput');
const inputPregunta = document.getElementById('PreguntaInput');
const respuestaOneInput = document.getElementById('RespuestaOneInput');
const respuestaTwoInput = document.getElementById('RespuestaTwoInput');
const respuestaTreeInput = document.getElementById('RespuestaTreeInput');
const respuestaCorrecta = document.getElementById('respuestaCorrectaInput');
const buttonSendServer = document.getElementById('buttonSendServer');
const newPost = document.getElementById('newPost')
//Eventos escuchas
dashBoardInicio.addEventListener('click', ()=>{
cerrarNav();
elementosCaja.forEach(e=>{
	if(e != home) e.style.display = "none"
	 home.style.display = "block"
})
})
newPost.addEventListener('click',()=>{
	let cancelNewpost = document.getElementById('cancelBoxContainerQuestion');
 	dashBoard.style.display = "none";
	contenedorPreguntas.style.display = "block"
	cancelNewpost.addEventListener('click',()=>{
		dashBoard.style.display = "block";
	contenedorPreguntas.style.display = "none"
	})
})
buttonHome.addEventListener('click',()=>{
	 location.reload()
});
document.getElementById('IngresarPreguntasAtajo').addEventListener('click',()=>{iniciarEventoIngresarPreguntas()})
buttonQuestion.addEventListener('click',()=>{iniciarEventoIngresarPreguntas()});
iniciarEventoIngresarPreguntas=()=>{
cerrarNav()
		elementosCaja.forEach(e=>{
		if(e != dashBoard) e.style.display = "none"
	})
 if(dashBoard.style.display === "none"){
 	dashBoard.style.display = "block";
 		contenedorPreguntas.style.display = "none"
 		contenedorPadreForContainerQuestion.innerHtml = " "
 requestQuestion()
 }else{
 	dashBoard.style.display = "none";
 }
}
document.getElementById('showQuestionAtajo').addEventListener('click',()=>{iniciarEventoTodasLasPreguntas()})
	contenedorPadreForContainerQuestion.innerHTML =" "
	showPreguntas.addEventListener('click',()=>{iniciarEventoTodasLasPreguntas()});
iniciarEventoTodasLasPreguntas=()=>{
cerrarNav()
			elementosCaja.forEach(e=>{
		if(e != dashBoard) e.style.display = "none"
	})
 if(dashBoard.style.display === "none"){
 	dashBoard.style.display = "block";
 		contenedorPreguntas.style.display = "none"
 		contenedorPadreForContainerQuestion.innerHtml = " "
 requestQuestionShow()
 }else{
 	dashBoard.style.display = "none";
 }
}
function requestQuestionShow(){
	let divAelimar = document.querySelectorAll('.questionForJS');
divAelimar.forEach(e=>{ 
contenedorPadreForContainerQuestion.removeChild(e)
})

	 let headers  = {
	 "method" : "post",
	 "body" : JSON.stringify({
	 	"funcion" : "question",
	 	"name" :`Teacher : ${inputMat}`
	 }),
	 "headers" : {"Content-Type" : "application/json"}
	 }
	 fetch(servidor,headers)
	 .then(dataServer => dataServer.json())
	 .then( async(jsons) => {
	 let json = await JSON.parse(jsons) 
	 materiaName.textContent = "Todas las preguntas"
  objectModi = await json;
  console.log(objectModi)
  let convertArrayPreguntasObjectFilter = Object.values(json)
  let convertArrayPreguntasObject;
 convertArrayPreguntasObject = convertArrayPreguntasObjectFilter.filter(e => e.status != "testing" );
  	for(let i=0; i < convertArrayPreguntasObject.length; i++){
	let div = document.createElement('DIV'); div.classList.add('questionForJS'); div.innerHTML = `<p class="containerParrafoForQuestion"><b>${convertArrayPreguntasObject[i].status}</b> <br> ${convertArrayPreguntasObject[i].pregunta}</p> <img src="media/iconos/remove.png" class="buttonRemoves">`;
	contenedorPadreForContainerQuestion.appendChild(div);
}
let buttonsRemoves = document.querySelectorAll('.buttonRemoves');
let divRam;
buttonsRemoves.forEach(e=>{
	 e.addEventListener('click',()=>{
	if(true){
 let headers = {
 	method : "post",
 	body : JSON.stringify({
 		"funcion" : "DELETEQuestion",
       "questionDelete" : e.parentElement.firstElementChild.textContent,
	 	"name" :`Teacher : ${inputMat}`

 	}),
 	headers : {"Content-Type" : "application/json"}
 }
 fetch(servidor,headers)
 .then(serverRequest => serverRequest.json())
 .then(serverRequestJson => { 
if(serverRequestJson.mensaje === "ok"){  
		e.parentElement.style.transform = " translateX(-1000px)"
		setTimeout(()=>{
 contenedorPadreForContainerQuestion.removeChild(e.parentElement)
		},500)
}
 })
	}
})
})
	 })
	 // .catch(error=>{
	 // 	let buttnReiniciar = document.getElementById('reinicarApp_Error')
	 // 	 let containerForError = document.getElementById('EroorFetch');
	 // 	 setTimeout(()=>{
	 // 	 	containerForError.style.opacity = "0";
	 // 	 subBody.style.scale = "500%"
	 // 	 	containerForError.style.display = "block"
	 // 	 	setTimeout(()=>{
	 // 	 		containerForError.style.opacity = "1";
	 // 	 		subBody.style.display = "none";
     //        buttnReiniciar.addEventListener('click',()=>{
     //        	location.reload()
     //        })
	 // 	 	},500)
	 // 	 },1000)

	 // })
}
function requestQuestion(){
let divAelimar = document.querySelectorAll('.questionForJS');
divAelimar.forEach(e=>{ 
contenedorPadreForContainerQuestion.removeChild(e)
})

	 let headers  = {
	 "method" : "post",
	 "body" : JSON.stringify({
	 	"funcion" : "question",
	 	"name" :`Teacher : ${inputMat}`
	 }),
	 "headers" : {"Content-Type" : "application/json"}
	 }
	 fetch(servidor,headers)
	 .then(dataServer => dataServer.json())
	 .then( async(jsons) => {
	 let json = await JSON.parse(jsons) 
	 materiaName.textContent = await inputMat
  objectModi = await json;
  console.log(objectModi)
  let convertArrayPreguntasObjectFilter = Object.values(json)
  let convertArrayPreguntasObject;
 convertArrayPreguntasObject = convertArrayPreguntasObjectFilter.filter(e => e.status === inputMat);
  if(contenedorPadreForContainerQuestion.contains.length <= convertArrayPreguntasObject.length){
  	for(let i=0; i < convertArrayPreguntasObject.length; i++){
	let div = document.createElement('DIV'); div.classList.add('questionForJS'); div.innerHTML = `<p class="containerParrafoForQuestion"><b>${convertArrayPreguntasObject[i].status}</b> : ${convertArrayPreguntasObject[i].pregunta}</p> <img src="media/iconos/remove.png" class="buttonRemoves">`;
	contenedorPadreForContainerQuestion.appendChild(div);
}}
let buttonsRemoves = document.querySelectorAll('.buttonRemoves');
let divRam;
buttonsRemoves.forEach(e=>{
	 e.addEventListener('click',()=>{
	if(confirm("Esta  seguro de borrar esta pregunta")){
 let headers = {
 	method : "post",
 	body : JSON.stringify({
 		"funcion" : "DELETEQuestion",
       "questionDelete" : e.parentElement.firstElementChild.textContent,
	 	"name" :`Teacher : ${inputMat}`

 	}),
 	headers : {"Content-Type" : "application/json"}
 }
 fetch(servidor,headers)
 .then(serverRequest => serverRequest.json())
 .then(serverRequestJson => { 
if(serverRequestJson.mensaje === "ok"){  
		e.parentElement.style.transform = " translateX(-1000px)"
		setTimeout(()=>{
 contenedorPadreForContainerQuestion.removeChild(e.parentElement)
		},500)
}
 })
	}
})
})
	 })
	 // .catch(error=>{
	 // 	let buttnReiniciar = document.getElementById('reinicarApp_Error')
	 // 	 let containerForError = document.getElementById('EroorFetch');
	 // 	 setTimeout(()=>{
	 // 	 	containerForError.style.opacity = "0";
	 // 	 subBody.style.scale = "500%"
	 // 	 	containerForError.style.display = "block"
	 // 	 	setTimeout(()=>{
	 // 	 		containerForError.style.opacity = "1";
	 // 	 		subBody.style.display = "none";
     //        buttnReiniciar.addEventListener('click',()=>{
     //        	location.reload()
     //        })
	 // 	 	},500)
	 // 	 },1000)

	 // })

}

buttonSendServer.addEventListener('click', ()=>{
	 const promesaForRequestSendServer = new Promise(resolve =>{

	  if(inputPregunta.value.length === 0 ||  inputPregunta.value === " "){
	 	resolve({
	 		"status" : "error",
	 		"typeError" : "Elemento vacio"
	 	})
	    inputPregunta.style.border = "solid 4px red"
	    setTimeout(()=>{inputPregunta.style.border = "solid 4px transparent"},1000)
	}else if(respuestaOneInput.value.length === 0 ||  respuestaOneInput.value === " "){
		resolve({
	 		"status" : "error",
	 		"typeError" : "Elemento vacio"
	 	})
	    respuestaOneInput.style.border = "solid 4px red"
	    setTimeout(()=>{respuestaOneInput.style.border = "solid 4px transparent"},1000)
	}else if(respuestaTwoInput.value.length === 0 ||  respuestaTwoInput.value === " "){
		resolve({
	 		"status" : "error",
	 		"typeError" : "Elemento vacio"
	 	})
	    respuestaTwoInput.style.border = "solid 4px red"
	    setTimeout(()=>{respuestaTwoInput.style.border = "solid 4px transparent"},1000)	
	}else if(respuestaTreeInput.value.length === 0 ||  respuestaTreeInput.value === " "){
				resolve({
	 		"status" : "error",
	 		"typeError" : "Elemento vacio"
	 	})
	    respuestaTreeInput.style.border = "solid 4px red"
	    setTimeout(()=>{respuestaTreeInput.style.border = "solid 4px transparent"},1000)	
	}else if(respuestaCorrecta.value.length === 0 ||  respuestaCorrecta.value === " "){
						resolve({
	 		"status" : "error",
	 		"typeError" : "Elemento vacio"
	 	})
	    respuestaCorrecta.style.border = "solid 4px red"
	    setTimeout(()=>{respuestaCorrecta.style.border = "solid 4px transparent"},1000)	
	}else{
		 resolve({
		 	"status" : "ok"
		 })
	} 
		 })
	.then(resultadoVerificacion => {
		 if(resultadoVerificacion.status === "error"){

		 }else if(resultadoVerificacion.status === "ok"){
            depuracionData()
		 }
})
})
function depuracionData(){
	let newData = {
		      "funcion" : "newQuestion",
		      "status" : inputMat,
		 	   "pregunta" :  inputPregunta.value,
		 	   "respuestas1": respuestaOneInput.value,
            "respuestas2": respuestaTwoInput.value,
            "respuestas3": respuestaTreeInput.value,
            "respuestaCorrecta": respuestaCorrecta.value
}
sendFormulari(newData)
}
async function sendFormulari(infoSend){
	contenedorPreguntas.style.display = "none"
loader.style.display = "block";
   let headers = { 
 "method" : "post",
 "body"  : JSON.stringify({
	 	"name" :`Teacher : ${inputMat}`,
	         "funcion" : "newQuestion",
		      "materia" : inputMat,
		 	   "pregunta" :  inputPregunta.value,
		 	   "respuesta1": respuestaOneInput.value,
            "respuesta2": respuestaTwoInput.value,
            "respuesta3": respuestaTreeInput.value,
            "respuestaCorrecta": respuestaCorrecta.value
 }),
 "headers" : {"Content-Type" : "application/json"}
  }
  fetch(servidor,headers)
  .then(dataServer => dataServer.json())
  .then( async (jsonData) => {
  	  if(jsonData.mensaje === "ok"){
 	dashBoard.style.display = "block";
	contenedorPreguntas.style.display = "none"
loader.style.display = "none";
requestQuestion()
inputPregunta.value = "";
respuestaOneInput.value = "";
respuestaTwoInput.value = "";
respuestaTreeInput.value = "";
respuestaCorrecta.value = "";
  	  }
  })
  // .catch(error=>{
// 	 	let buttnReiniciar = document.getElementById('reinicarApp_Error')
// 	 	 let containerForError = document.getElementById('EroorFetch');
// 	 	 setTimeout(()=>{
// 	 	 	containerForError.style.opacity = "0";
// 	 	 subBody.style.scale = "500%"
// 	 	 	containerForError.style.display = "block"
// 	 	 	setTimeout(()=>{
// 	 	 		containerForError.style.opacity = "1";
// 	 	 		subBody.style.display = "none";
  //           buttnReiniciar.addEventListener('click',()=>{
  //           	location.reload()
  //           })
// 	 	 	},500)
// 	 	 },1000)

// 	 })
}
}
let txtPresentado = [];
function startRelog(){
hours();//ACTIVAMOS EN RELOG DEL MOTOR Interno de JS
locationUrl();//ACTIVACION DE LOCATION URL
var routerPrincipal = "182.122.239.148"
function hours(){
const fechaActual = new Date();
const hora = fechaActual.getHours();
const minuto = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();
h.innerHTML = `<b style="font-size:10px;">H</b> ${hora}`;
m.innerHTML = ` : <b style="font-size:10px;">M</b> ${minuto}`;
s.innerHTML = ` : <b style="font-size:10px;">S</b> ${segundos}`;
setTimeout(resetear,10)
}}
document.getElementById('verEstudianteAtajo').addEventListener('click',()=>{iniciarEventoShowEstudiante()})
misEstudianteButtonNav.addEventListener('click',()=>{iniciarEventoShowEstudiante()});
iniciarEventoShowEstudiante=()=>{
	cerrarNav()
	contentEstudiantes.style.display = "block";
	elementosCaja.forEach(w=>{
		if(w != contentEstudiantes) w.style.display = "none";
	})
     startContentEstudientes(userNames)	 
}
function startContentEstudientes(nameTeacher){ 
 let aRSLFTs = []
 let headers = {
 	method : 'post',
 	body : JSON.stringify({
 		'funcion' : 'applicationCertificationStudentList',
 		'name' : nameTeacher
 	}),
 	headers : {"Content-Type": "application/json"}
 }
fetch(servidor,headers)
.then(resposeServer => resposeServer.json())
.then(async(responseServerByJson) => {
	let dataJson = await JSON.parse(responseServerByJson); 
	let byObjectArrayByResponse = Object.values(dataJson.Students)
	aRSLFTs = [ ... byObjectArrayByResponse[0][0]]
    sPCJs(nameTeacher,aRSLFTs)
})
}
function sPCJs(name,aRSLFTs){
containerEstudiantesPushElementJs.innerHTML = "";
let headers = { 
 method : 'post',
 body  : JSON.stringify({
 	 'funcion' : 'requestUsers',
 	 'name' : name
}),
headers : {"Content-Type" : "application/json"}
}
fetch(servidor,headers)
.then(resposeServer => resposeServer.json())
.then(async(resposeServerJson) => {
	 let jsonData = await JSON.parse(resposeServerJson);
	 for(let i=0; i < aRSLFTs.length; i++){
	 	let div  = document.createElement('DIV'); div.classList.add('estudiantesContainerJS');
	 	let p = document.createElement('P');  p.classList.add('statusEstudiantes'); if(jsonData[aRSLFTs[i]].status.what != undefined){p.textContent = `${jsonData[aRSLFTs[i]].name} | esta ${jsonData[aRSLFTs[i]].status.what}`;} else{p.textContent = jsonData[aRSLFTs[i]].name}
	 	let img  = document.createElement('IMG'); img.classList.add('avatarEstudiantes'); if(jsonData[aRSLFTs[i]].status.what != undefined){img.setAttribute('value',jsonData[aRSLFTs[i]].status.host)} img.src = jsonData[aRSLFTs[i]].avatar;
	 	let button = document.createElement('I'); button.classList.add('menuBarsEstuendJs'); button.innerHTML = `<div style="display:none;" class="divButtonContainers">
      <button class = "viemGameExpectorButton">Mirar juego</button>
	 	</div><img src="media/iconos/menuBars.png">`;
	 	div.appendChild(img)
	 	div.appendChild(p)
	 	div.appendChild(button)
	 	containerEstudiantesPushElementJs.appendChild(div)
	 }
	 eventosEschuchaForButtons()
}) 
}
function eventosEschuchaForButtons(){
const menuBarsEstuendJs = document.querySelectorAll('.menuBarsEstuendJs');
const buttonViemExpector = document.querySelectorAll('.viemGameExpectorButton');
menuBarsEstuendJs.forEach(e=>{
	e.addEventListener('click',()=>{
		let elementoHijo = e.firstElementChild;
		if( elementoHijo.style.display === "none"){
			elementoHijo.style.display = "block";
			elementoHijo.style.top = "10px";			
		}else{
			elementoHijo.style.top = "-100px";
			elementoHijo.style.display = "none";
		}
	})
})
buttonViemExpector.forEach(e=>{
	 e.addEventListener('click',()=>{
         let elementoPadre = e.parentElement;
         let elementoPadre2 = elementoPadre.parentElement;
         let elementoPadre3 = elementoPadre2.parentElement;
         let primerHijoByElementoPadre = elementoPadre3.firstElementChild;
         let hosGameConection = primerHijoByElementoPadre.getAttribute('value');
         console.log(elementoPadre)
         console.log(elementoPadre2)
         console.log(elementoPadre3)
         console.log(primerHijoByElementoPadre)
         if(hosGameConection === null || hosGameConection === undefined) alert("Tu estudiante no esta jugando")
         else alert(hosGameConection)
	 })
})
}
function hours(){
const fechaActual = new Date();
const hora = fechaActual.getHours();
const minuto = fechaActual.getMinutes();
const segundos = fechaActual.getSeconds();
h.innerHTML = `<b style="font-size:10px;">H</b> ${hora}`;
m.innerHTML = ` : <b style="font-size:10px;">M</b> ${minuto}`;
s.innerHTML = ` : <b style="font-size:10px;">S</b> ${segundos}`;
setTimeout(resetear,10)
}
function resetear(){
setTimeout(hours,10)
}
let verificacionForNav = true;
let buttonExtentNav = document.querySelector('.barraExpandirNav');
let displayComprobar = document.querySelectorAll('.p_nav_a');
buttonExtentNav.addEventListener('click',()=>{
if (verificacionForNav){
abrirNav()
}else{
cerrarNav()
}});

let navNoFocus =  document.querySelector('.sobrePonerForNav');
navNoFocus.addEventListener('click',()=>{
	if(navNoFocus.style.display === "block"){
        cerrarNav()
	}
})
abrirNav=()=>{
verificacionForNav = false;
document.querySelector('.sobrePonerForNav').style.display = "block";
displayComprobar.forEach(e=>{e.style = "font-size:15px;width:auto;opacity:0;"; setTimeout(()=>{e.style.display= "inline-block";e.style.opacity = "1"},50)});
buttonExtentNav.style = `transform: rotate(90deg);right:-15%;border-radius:8px 8px 0px 0px`;
document.querySelector('.nav_ecrtro').style = `padding-top:150px;width:300px;`;
document.querySelector('.nav_a').style =`width:90%`;
document.querySelector('.userImg').style =`border-radius: 20%;position: absolute;left: 40%;top: 1%;transform: translate(-50%,-5%);width:50%!important;`;
document.querySelector('.userName').style =`color: white;`;
document.getElementById('statusName').style =`transition: 0s;color:white!important;opacity:1;`;	
}
cerrarNav=()=>{
verificacionForNav = true;
document.querySelector('.sobrePonerForNav').style.display = "none";
buttonExtentNav.style = `transform: rotate(-90deg);right:-66%;border-radius:0px 0px 8px 8px`;
displayComprobar.forEach(e=>{e.style = "font-size:1px;opacity:0;";setTimeout(()=>{e.style.display = "none";},50)});
document.querySelector('.nav_ecrtro').style = `box-sizing: border-box;position: relative;padding-top: 30px;display: inline-block;transition: padding 0.4s, all 0.2s;
display: block;
background: #12151c ;
height: 100vh;
width: 70px;
z-index: 1000;
top: 0;
border-radius:1px;
box-shadow: 0 0 25PX BLACK;
cursor: pointer;`;
document.querySelector('.nav_a').style =`cursor:pointer;width:90%;padding: 5px;margin: 10px;display:block;text-decoration: none;color: white;`;
document.querySelector('.userImg').style =`transition:  0.4s!important;transition: width 0.6s!important;transition:  margin 10s!;width: 50px;margin: 10px;border-radius: 50%;`;
document.querySelector('.userName').style =`width: 200px;transition: 0s;color: transparent;padding: 10px;opacity:0;`
document.getElementById('statusName').style =`transition:0;opacity:0;color: transparent;font-size: 12px;`;
}