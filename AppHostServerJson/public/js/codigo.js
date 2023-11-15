//servidor port 
let servidor;
let elementosCaja = document.querySelectorAll('.caja');
let urlLocal = location.hostname
servidor = `http://${urlLocal}:8070`;
console.log(`conectado ${servidor}`);
/////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("Title").innerHTML = "HSRG | Iniciando sesion";
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
siguiente_Name.addEventListener('click',()=>{eventoLoginForUserName()});
inputUserName.addEventListener('keydown',event=>{
 if(event.key === "Enter") eventoLoginForUserName()
})
eventoLoginForUserName=()=>{
document.getElementById("Title").innerHTML = "HSRG | Esperando contraseña";
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
 inputPass.addEventListener('keydown',event=>{if(event.key === "Enter") eventoPass()})
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
   else if(inputUserName.value != "" && inputUserName.value != " "){
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

   }else if(inputUserName.value === "" || inputUserName.value === " "){
   	status_salaEsperaLogin.innerHTML = 'Ingrese un nombre, reiniciando';
   	setTimeout(()=>{
  location.reload()
   	},2000)
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
document.getElementById('addicionalInfoUserName').setAttribute('value',userName)
document.getElementById("Title").innerHTML = "HSRG | Revisando contraseña";
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
document.getElementById("Title").innerHTML = "HSRG | Esperando contraseña";
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
document.getElementById("Title").innerHTML = `HSRG | ${inputUserName.value} ${materia} ` ;
hours()
document.getElementById('saludoP').innerHTML = `Hola ${inputUserName.value}, que desea hacer hoy?`
document.getElementById('userNameId').textContent = inputUserName.value;
document.getElementById('statusName').textContent = materia;
containerLogin.style.display = "none";
containerLogin.innerHTML = " "
subBody.style.display = "block";
guardarMateria = materia;
document.getElementById('addicionalInfoUserMateria').setAttribute('value',materia)
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
newPost.style.display = 'block';
cerrarNav()
		elementosCaja.forEach(e=>{
		if(e != dashBoard) e.style.display = "none"
	})
 	dashBoard.style.display = "block";
 		contenedorPreguntas.style.display = "none"
 		contenedorPadreForContainerQuestion.innerHtml = " "
 requestQuestion()
}
document.getElementById('showQuestionAtajo').addEventListener('click',()=>{iniciarEventoTodasLasPreguntas()})
	contenedorPadreForContainerQuestion.innerHTML =" "
	showPreguntas.addEventListener('click',()=>{iniciarEventoTodasLasPreguntas()});
iniciarEventoTodasLasPreguntas=()=>{
	newPost.style.display = 'none';
		elementosCaja.forEach(e=>{
		if(e != dashBoard) e.style.display = "none"
	})
dashBoard.style.display = "block";
 		contenedorPreguntas.style.display = "none"
 		contenedorPadreForContainerQuestion.innerHtml = " "
 requestQuestionShow()
cerrarNav()
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
  let convertArrayPreguntasObjectFilter = Object.values(json)
  let convertArrayPreguntasObject;
 convertArrayPreguntasObject = convertArrayPreguntasObjectFilter.filter(e => e.status != "testing" );
  	for(let i=0; i < convertArrayPreguntasObject.length; i++){
	let div = document.createElement('DIV'); div.classList.add('questionForJS'); div.innerHTML = `<b style="color:#0034ff96;">${convertArrayPreguntasObject[i].status}</b><br><br><p class="containerParrafoForQuestion">${convertArrayPreguntasObject[i].pregunta}</p> <img src="media/iconos/remove.png" class="buttonRemoves">`;
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
       "questionDelete" : e.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent,
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
  let convertArrayPreguntasObjectFilter = Object.values(json)
  let convertArrayPreguntasObject;
 convertArrayPreguntasObject = convertArrayPreguntasObjectFilter.filter(e => e.status === inputMat);
  if(contenedorPadreForContainerQuestion.contains.length <= convertArrayPreguntasObject.length){
  	for(let i=0; i < convertArrayPreguntasObject.length; i++){
	let div = document.createElement('DIV'); div.classList.add('questionForJS'); div.innerHTML = `<b style="color:#0034ff96;">${convertArrayPreguntasObject[i].status}</b><br><br><p class="containerParrafoForQuestion">${convertArrayPreguntasObject[i].pregunta}</p> <img src="media/iconos/remove.png" class="buttonRemoves">`;
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
       "questionDelete" : e.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent,
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
iniciarEventoShowEstudiante=()=>{
	cerrarNav()
	contentEstudiantes.style.display = "block";
	elementosCaja.forEach(w=>{
		if(w != contentEstudiantes) w.style.display = "none";
	})
     startContentEstudientes(userNames)	 
}
iniciarContentCreateNewExa=()=>{
let containerCreateNewExa = document.getElementById('boxForCreateNewExa');
cerrarNav(); containerCreateNewExa.style.display = 'block'
elementosCaja.forEach(j=>{
	if(j != containerCreateNewExa) j.style.display = 'none';
});
}
document.getElementById('verEstudianteAtajo').addEventListener('click',iniciarEventoShowEstudiante)
misEstudianteButtonNav.addEventListener('click',iniciarEventoShowEstudiante);
document.getElementById('misExamenesButtonNav').addEventListener('click', iniciarContentCreateNewExa)
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
	 	let img  = document.createElement('IMG'); img.classList.add('avatarEstudiantes'); if(jsonData[aRSLFTs[i]].status.what != undefined){img.setAttribute('value',jsonData[aRSLFTs[i]].status.host)} img.src = servidor + jsonData[aRSLFTs[i]].avatar;
	 	let button = document.createElement('I'); button.classList.add('menuBarsEstuendJs'); button.innerHTML = `<div style="display:none;" class="divButtonContainers">
      <button class = "viemGameExpectorButton">Mirar juego</button>
      <button class = "sendExaButton">Mandar Examen</button>
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
const sendExaButton = document.querySelectorAll('.sendExaButton');
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
         if(hosGameConection === null || hosGameConection === undefined) alert("Tu estudiante no esta jugando")
         else alert(hosGameConection)
	 })
})
sendExaButton.forEach(e=>{
e.addEventListener('click',()=>{init_send_exa_for_studentContainer(e.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.textContent,e.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling)})
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
// click button examanes 
// document
let containerForExa = document.getElementById('containerForExamenes');
let buttonViemExamenes = document.getElementById('examenesButton');
// Events 
init_BoxExa=()=>{
cerrarNav()
elementosCaja.forEach(j=>{
	if(j != containerForExa) j.style.display = 'none';
});containerForExa.style.display = 'block';
requieredExaList()
}
buttonViemExamenes.addEventListener('click', init_BoxExa)
async function requieredExaList(){
let objQuestion;
let containerFatherForEXApush = document.getElementById('pushExaContainer');
containerFatherForEXApush.innerHTML = '';
async function requieredFetchExaList(){
let dataSend = {
	funcion : 'requestExa',
	materia : inputMat.value,
	name : inputUserName.value
}
let config = {
	method : 'post',
	body : JSON.stringify(dataSend),
	headers : {'Content-Type' : 'application/json'}
}
let fetchData = await fetch(servidor,config);
let dataResponse = await fetchData.json();
return JSON.parse(dataResponse)
}
let documentJsonResponse = await requieredFetchExaList();
objQuestion = documentJsonResponse;
let objeBydocument = Object.keys(documentJsonResponse);
let filterobjeBydocument =  objeBydocument.filter(e => e != 'start');
if(filterobjeBydocument.length === 0) ifExaNodeNOne.style.display = 'block';
else ifExaNodeNOne.style.display = 'none';
for(let i=0; i < filterobjeBydocument.length; i++){
let div = document.createElement('DIV');div.classList.add('cajaPushExa');
let pByNameExa = document.createElement('P');pByNameExa.classList.add('pNameForExaContainer','pAll');
pByNameExa.innerHTML = `<p class='pAll' style = "color:grey;">Tema</p><p class = 'pAll'>${documentJsonResponse[filterobjeBydocument[i]].dataconfig.nameForExa}</p><a href="#" class= "init_questionForExa pAll">Preguntas ${documentJsonResponse[filterobjeBydocument[i]].questionsData.numero}</a><p class="p_for_b_Puntaje pAll"><b style="color:grey;font-weight: 12;">Puntaje</b> <br> ${documentJsonResponse[filterobjeBydocument[i]].dataconfig.pointsForExa}`;
let buttonRemoveExa = document.createElement('IMG');buttonRemoveExa.classList.add('imgRemoveExa');buttonRemoveExa.src = 'media/iconos/remove.png';
let buttonEdit  = document.createElement('IMG');buttonEdit.classList.add('iconEditExa');buttonEdit.src = 'media/iconos/editIcon.png';
let buttonBars = document.createElement('IMG');buttonBars.classList.add('iconShowContainerExa');buttonBars.src = 'media/iconos/menuBars2.png';
let divBarsOther = document.createElement('DIV');divBarsOther.classList.add('divShowBars');divBarsOther.innerHTML = `<img src='media/iconos/CLOSE.png' class='closeWindow'>	<button class="resultadosButton">Ver resultados</button><button class="infoSendButton">Enviados</button><button class="allInfoButton">Toda la inf</button>
`;
div.appendChild(pByNameExa);div.appendChild(buttonRemoveExa);div.appendChild(buttonEdit);div.appendChild(buttonBars);div.appendChild(divBarsOther)
containerFatherForEXApush.appendChild(div);
}
if(ifExaNodeNOne.style.display === 'none'){
let a_init_viemQuestions = document.querySelectorAll('.init_questionForExa');
let containerPushQuestionForExa = document.getElementById('pushJSContainierViewQuestionForExa');
let containerForInforExa = document.getElementById('containerViewQuestionForExa');
let sobrePonerExa = document.getElementById('sobrePonerForExaQuestion');
let buttonclose = document.getElementById('buttonCloseContainerViewQuestion');
let buttonsForPushOpciones = document.querySelectorAll('.iconShowContainerExa');
let buttonDeleteEXA = document.querySelectorAll('.imgRemoveExa');
let buttonclosed = document.querySelectorAll('.closeWindow');
buttonDeleteEXA.forEach(e=>{ 
e.addEventListener('click',async ()=>{
let objectoSend  = await {
father:  e.parentElement,
nameExa : e.parentElement.firstElementChild.firstElementChild.nextElementSibling.textContent,
nameTeacher : addicionalInfoUserName.value
}
init_delete_exa(objectoSend)
 })
})
buttonsForPushOpciones.forEach(e=>{ // push opciones
e.addEventListener('click',()=>{ // evento open
let elementCaja =  e.parentElement.lastElementChild;
elementCaja.style.display = 'block';
let buttonClose = e.parentElement.lastElementChild.firstElementChild;
buttonclosed.forEach(e=>{
	e.addEventListener('click',()=>{ // Evento close 
elementCaja.style.display = 'none';
})
})
let butonDeVerResultados = e.nextElementSibling.firstElementChild.nextElementSibling;
butonDeVerResultados.addEventListener('click',()=>{init_view_resultados(e.parentElement.firstElementChild.firstElementChild.nextElementSibling.textContent,elementCaja)});
})
})
a_init_viemQuestions.forEach(e=>{ // evento de ver preguntas
e.addEventListener('click',()=>{
sobrePonerExa.style.display = 'block';
containerForInforExa.style.display = 'block';
containerPushQuestionForExa.innerHTML = '';
buttonclose.addEventListener('click',()=>{
	 sobrePonerExa.style.display = 'none';
containerForInforExa.style.display = 'none';
containerPushQuestionForExa.innerHTML = '';
})
init_push_questions=(nameQuestion)=>{
	console.log(objQuestion)
	console.log(nameQuestion)
let objlength = objQuestion[nameQuestion].questionsData.preguntas;
for(let i=0; i < objlength.length; i++){
let div = document.createElement('DIV'); div.classList.add('pushQuestionViemExa');
let p = document.createElement('P'); p.classList.add('questionElementP');p.textContent = objlength[i]
div.appendChild(p);containerPushQuestionForExa.appendChild(div)
}
}
init_push_questions(e.parentElement.firstElementChild.nextElementSibling.textContent)
})
})
}}
/*
transition: 0.2s;
  transform: translate(-100%);*/
async function init_delete_exa(obj){
let containerLoad = document.getElementById('containerLOADDINGBydeleteExa');
let pStatus = document.getElementById('pStatusContainerLoaddingDelete');
let sobreponer = document.getElementById('sobrePonerForExaQuestion');
let fatherPush = document.getElementById('pushExaContainer');
let elementoDiv = obj.father;
sobreponer.style.display = 'block';
pStatus.textContent = `Borrando Examen '${obj.exaDelete} ...'`;
let requestResponse = await requestDelete();
if(requestResponse){
pStatus.textContent = `Examen '${obj.exaDelete}' borrado con exito`;
setTimeout(()=>{
containerLoad.style.display = 'none';sobreponer.style.display = 'none';
elementoDiv.transform = 'translate(-100%)';
setTimeout(()=>{
fatherPush.removeChild(elementoDiv);
},500)
},1000);
}
async function requestDelete(){
let data = { 
funcion : 'deleteExamenes',
nameTeacher : obj.nameTeacher,
name : obj.nameTeacher,
exaDelete : obj.nameExa
}
let config = {
method : 'post',
body : JSON.stringify(data),
headers : {'Content-Type':'application/json'}
}
let fetchData = await fetch(servidor,config);
let response = await fetchData.json();
console.log(response)
if(response.mensaje) return true
else return false
}	
}
let nameExamenGlobal;
let puntajeGlobal; 
function pushEvents(){ // añadir eventos alas cajas de los resultados de los examenes
let divsFather = document.querySelectorAll('.divContainerOFRequestStudent');
divsFather.forEach(i=>{
let inputTrue = i.lastElementChild.firstElementChild.firstElementChild;
let inputFale = i.lastElementChild.firstElementChild.nextElementSibling.firstElementChild;
inputTrue.addEventListener('change',()=>{if (inputTrue.checked) inputFale.checked = false;
	inputFale.style.boxShadow =  'none';
	inputTrue.style.boxShadow =  'none';
});
inputFale.addEventListener('change',()=>{if (inputFale.checked) inputTrue.checked = false;
	inputFale.style.boxShadow =  'none';
	inputTrue.style.boxShadow =  'none';
});
})
}
async function init_view_resultados(nameExamen,containerClose){
nameExamenGlobal = nameExamen;
document.getElementById('nameExA').textContent = nameExamen;
try{
let sobreponer = document.getElementById('sobrePonerForExaQuestion');
let buttonCloseContenedorResultados = document.getElementById('butonCerrarResultados');
let contenedorResultados = document.getElementById('contenedorVerResultados');
contenedorResultados.style.display = 'block';
sobreponer.style.display = 'block';
call=()=>{contenedorResultados.style.display = 'none';sobreponer.style.display = 'none';buttonCloseContenedorResultados.removeEventListener('click',call)}
buttonCloseContenedorResultados.addEventListener('click', call)
}
catch(e){
console.log(e)
}
async function init_Peticion_de_resultados(){
let data = {
funcion : 'requestExaAnswers',
name : addicionalInfoUserName.value,
nameExa : nameExamen
}
let config = {
method : 'post',
body: JSON.stringify(data),
headers : {'Content-Type' : 'application/json'}
}
let fetchData = await fetch(servidor,config);
let response = await fetchData.json();
return JSON.parse(response)
}
containerClose.style.display = 'none';
let responseAnswers = await init_Peticion_de_resultados();
let objectToArray =  Object.keys(responseAnswers);
let filterMatriz = objectToArray.filter(e=>  e != 'NOREMOVE');
let fatherOne = document.getElementById('pushResultadosUsers')
fatherOne.innerHTML = '';
for(let i=0; i < filterMatriz.length; i++){
let div = document.createElement('DIV');
    div.classList.add('pushDivElementResult');
let p = document.createElement('P');
    p.classList.add('pushDivPName');
      p.textContent = filterMatriz[i];
     div.appendChild(p)
      fatherOne.appendChild(div)
}
// evento escucha de divs elements
let divsElements = document.querySelectorAll('.pushDivElementResult');
init_view_resultado_de_usuario=(name)=>{
let sectionForAllElements = document.getElementById('revisarExamenes');
sectionForAllElements.style.display = 'block'
let sectionOfSobrePoner = document.getElementById('sobrePonerForExaQuestion');
let fatherPushRevisarExamanes = document.getElementById('pushToRevisarExamanes');
let buttoncancelarRevicionDeExamanes = document.getElementById('cancelarRevicionDeExamanes');
let buttonEnviarResultadosALestudiante = document.getElementById('enviarResultados');
buttonEnviarResultadosALestudiante.textContent = `Enviar a ${name}`;
buttonEnviarResultadosALestudiante.addEventListener('click',()=>{ init_validor_divs_result()})
buttoncancelarRevicionDeExamanes.addEventListener('click',()=>{
fatherPushRevisarExamanes.innerHTML = '';
sectionOfSobrePoner.style.display = 'none';
sectionForAllElements.style.display = 'none';
})
sectionOfSobrePoner.style.display = 'block';
let objofUser = responseAnswers[name].data;
console.log(objofUser)
let objOfArray = Object.keys(objofUser);
let filterOne = objOfArray.filter(e=> e != 'infoExitApp');
let filterTwo = filterOne.filter(e=> e != 'puntaje');
puntajeGlobal = objofUser.puntaje / filterTwo.length;
document.getElementById('puntajeStatus').innerHTML = `Puntaje total ${objofUser.puntaje} <br> Puntaje por preguntas ${puntajeGlobal}`;
for(let i=0; i < filterTwo.length; i++){
let div = document.createElement('DIV');div.classList.add('divContainerOFRequestStudent');
let label = document.createElement('LABEL');
    label.textContent = objofUser[filterTwo[i]].pregunta;
let pPuntajeHtml = document.createElement('P'); pPuntajeHtml.classList.add('puntajeRevisarExamenes'); pPuntajeHtml.textContent = `Puntaje ${objofUser.puntaje / filterTwo.length}`;   
let textarea = document.createElement('TEXTAREA');
    textarea.textContent = objofUser[filterTwo[i]].respuesta;
    textarea.setAttribute('readonly','true');
let divPrompts = document.createElement('DIV');divPrompts.classList.add('promptOfRequestStudent');
 let divPromptsByInputs = document.createElement('DIV');divPromptsByInputs.classList.add('promptCorrecto');  // div prompt de input true
  let pOfDivsPrompts = document.createElement('P');pOfDivsPrompts.textContent = 'Exacto'; 
  let inputExact = document.createElement('INPUT');
    inputExact.setAttribute('type','checkbox');
    inputExact.classList.add('inputTrue')
divPromptsByInputs.appendChild(inputExact);divPromptsByInputs.appendChild(pOfDivsPrompts);
 let divPromptsByInputsIconrrect = document.createElement('DIV'); divPromptsByInputsIconrrect.classList.add('promptIncorrecto');
  let pOfDivsPrompts2 = document.createElement('P');pOfDivsPrompts2.textContent = 'Incorrecto'; 
  let inputNoExact = document.createElement('INPUT');
     inputNoExact.setAttribute('type','checkbox');
     inputNoExact.classList.add('inputFalse');
divPromptsByInputsIconrrect.appendChild(inputNoExact);divPromptsByInputsIconrrect.appendChild(pOfDivsPrompts2);
let inputCommit = document.createElement('INPUT'); inputCommit.classList.add('inputCommit');
    inputCommit.setAttribute('placeholder', `Escriba un commit para ${name}`);
divPrompts.appendChild(divPromptsByInputs);divPrompts.appendChild(divPromptsByInputsIconrrect);divPrompts.appendChild(inputCommit) // div de los prompts
div.appendChild(label);
div.appendChild(pPuntajeHtml);
div.appendChild(textarea);
div.appendChild(divPrompts);
fatherPushRevisarExamanes.appendChild(div);
}
if(filterTwo.length > 0){pushEvents()};
}
divsElements.forEach(w=>{
w.addEventListener('click',()=>{init_view_resultado_de_usuario(w.firstElementChild.textContent)})
})
}
async function init_send_exa_for_studentContainer(nameConection,pContainer){
let fatherPush = document.getElementById('pushExaContainerList');
async function requestExa(){
let dataSend = {
	funcion : 'requestExa',
	materia : inputMat.value,
	name : addicionalInfoUserName.value
}
let config = {
method : 'post',
body : JSON.stringify(dataSend),
headers : {'Content-Type':'application/json'}
}
let fetchData = await fetch(servidor,config);
let dataJson = await fetchData.json();
console.log(JSON.parse(dataJson))
return JSON.parse(dataJson);
}
let listExa = await requestExa();
fatherPush.innerHTML = '';
let objlengthReturn = Object.keys(listExa);
let objlength = objlengthReturn.filter(e=> e != 'start');
console.log(objlengthReturn)
for(let i = 0; i < objlength.length; i++){
let div = document.createElement('DIV');div.classList.add('pushJSEXAContainer');div.innerHTML = `<p style="color:grey;">Tema</p> <br> ${listExa[objlength[i]].dataconfig.nameForExa}`;
div.setAttribute('value',listExa[objlength[i]].dataconfig.nameForExa)
fatherPush.appendChild(div)
}
if(objlength.length > 0){
let containerClick = document.querySelectorAll('.pushJSEXAContainer');
containerClick.forEach(e=>{
e.addEventListener('click',()=>{
init_send_exa_for_student(nameConection,pContainer,e.getAttribute('value'),listExa)
})
})
}
let cotainerlistExa = document.getElementById('containerListExa');
let closeContainer = document.getElementById('buttonCloseContainerExaList');
cotainerlistExa.style.display = 'block';closeContainer.addEventListener('click',()=>{cotainerlistExa.style.display='none';});
}
function init_validor_divs_result(){
let validor = true;
let divsFather = document.querySelectorAll('.divContainerOFRequestStudent');
divsFather.forEach(e=>{
let inputCommit = e.lastElementChild.lastElementChild;
if(inputCommit.value === ' '){
validor = false;
inputCommit.focus()
inputCommit.style.border = 'solid 12px red';
inputCommit.value = '';
inputCommit.setAttribute('placeholder', 'Ah ingresado solo un espacio, ingrese un commit');
inputCommit.addEventListener('keydown',()=>{inputCommit.style.border = 'none'});
}
}); //  forEach
if(validor) init_copilador_de_datos()
}
function init_copilador_de_datos(){
	let validor2 = true;
let countsPuntaje = 0;
let objectoEnviar = {
puntajeDeExa : puntajeGlobal,
puntajeGanado : '' ,
nameExamen : nameExamenGlobal,
data : {}
}
let divsFather = document.querySelectorAll('.divContainerOFRequestStudent');
divsFather.forEach(e=>{
/// data 
let nombreExa = e.firstElementChild.textContent;
let respuestaExa = e.firstElementChild.nextElementSibling.nextElementSibling.textContent;
let commit = e.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.value;
let validor;
// verificacion validor
let inputcheckedTrue = e.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild;
let inputcheckedFalse = e.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild;
if(inputcheckedTrue.checked){validor = true; countsPuntaje += puntajeGlobal}
else if(inputcheckedFalse.checked) validor = false;
if(inputcheckedTrue.checked === false && inputcheckedFalse.checked === false){
	inputcheckedFalse.style.boxShadow =  '0 0 10px red';
	inputcheckedTrue.style.boxShadow =  '0 0 10px red';
	validor2 = false;
	inputcheckedFalse.focus();
}
// push data
objectoEnviar.data[nombreExa] = {
nameQuestion : nombreExa,
respuestaToQuestion : respuestaExa,
validor : validor,
commit : commit
}
})
if(validor2){
	objectoEnviar.puntajeGanado = countsPuntaje;
document.getElementById('sectionByLOader').style.display = 'block';
}else{
	alert('ingrese en que se una confirmacion')
}
}
async function init_send_exa_for_student(nameConection,pContainer,valueForExamen,obj){
async function sendRequesExa(){
let data = await {
funcion : 'newExaSendStudent',
repositoriName : nameConection,
name : nameConection,
teacherName : addicionalInfoUserName.value,
materia : addicionalInfoUserMateria.value,
dataconfig : obj[valueForExamen].dataconfig,
questionsData : obj[valueForExamen].questionsData,
nameExa : obj[valueForExamen].dataconfig.nameForExa
}
let config = await {
	method : 'post',
	body : JSON.stringify(data),
	headers : {'Content-Type':'application/json'}
}
let fetchData = await fetch(servidor,config);
let dataJson = await fetchData.json();
return dataJson
}
let cotainerlistExa = document.getElementById('containerListExa');
cotainerlistExa.style.display = 'none';
pContainer.parentElement.style = `
text-align: center;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`
pContainer.innerHTML = `<div class="loaderContainer"><div class="loaderByExaLoader" id="textInviandoExa"></div> <p>Enviando examen</p></div>`;
let send = await sendRequesExa();
if(send.mensaje){
pContainer.innerHTML = 'Examen enviando'
setTimeout(()=>{
pContainer.innerHTML = nameConection;
pContainer.parentElement.style = '';
},2000)
}
else{
pContainer.innerHTML = 'Ups, algo paso y no se envio el examamen'
setTimeout(()=>{
pContainer.innerHTML = nameConection;
pContainer.parentElement.style = ''
},2000)
}
}