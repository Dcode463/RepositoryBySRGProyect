const chatbot_div_2 = document.querySelector('.chatBot2');
const chatbot_p_2 = document.getElementById('chatBotText2');
const container_resultado_search = document.getElementById('resultadoForSearch');
const inputSearch = document.getElementById('inputSearch')
document.getElementById('startSearch').addEventListener('click',()=>{search(userNames,inputSearch.value); inputSearch.value = ""} )
function search(nameTeacher,search){
   let headers = {
   	 method : "post",
   	 body : JSON.stringify({
          "funcion" : "requestUsers", "name" : `${nameTeacher}`
      }),
      headers: {"Content-Type" : "application/json"}
   }
   fetch(servidor,headers)
   .then(dataServerResponse => dataServerResponse.json())
   .then(async(dataServerResponseJson) => {
   	let datajsonResponse = await JSON.parse(dataServerResponseJson)
   	let objetoBydatajsonResponse = Object.keys(datajsonResponse);
   	let filterBtyObjeto = objetoBydatajsonResponse.filter(e => e === search)
   	if(filterBtyObjeto.length === 0){
 container_resultado_search.style.display = "none";
 container_resultado_search.innerHTML = "";
 chatbot_div_2.style.display = "block";
 chatbot_p_2.innerHTML = `Ups el estudiante ${search}, no esta registrado <br> ¡invitalo a que se registre!`
 inputSearch.addEventListener('keydown',()=>{
 	 container_resultado_search.style.display = "none";
     container_resultado_search.innerHTML = "";
 	 chatbot_p_2.innerHTML = " ";
 	 chatbot_div_2.style.display = "none";
 })
}else{
let headers2 = {
   method : "post",
   body : JSON.stringify({
      "funcion" : "applicationCertificationStudentList",
      "name" : nameTeacher
   }),
   headers : {"Content-Type" : "application/json"}
}
fetch(servidor,headers2) 
.then(responseServer => responseServer.json())
.then(async responseServerJsons => {
    let json = await JSON.parse(responseServerJsons)
   let dataArrayByObjec = Object.values(json.Students);
   console.log(dataArrayByObjec[0][0])
   let verificacionStudents = dataArrayByObjec[0][0].some(e => e === search)
   if (verificacionStudents){
     let div_create = document.createElement('DIV'); div_create.classList.add('containerJsSearchResultado');
 let p_create = document.createElement('P'); p_create.innerHTML = datajsonResponse[search].name; p_create.classList.add('nameUserForSearch')
 let img_create = document.createElement('IMG'); img_create.src = datajsonResponse[search].avatar; img_create.classList.add('imgForSearch');
 let button_create = document.createElement('IMG'); button_create.src = 'media/iconos/yaEsTuAmigo.png';button_create.classList.add('buttonsAddEstudentNoFriends');button_create.setAttribute('value',datajsonResponse[search].name) 
 div_create.appendChild(img_create);
 div_create.appendChild(p_create);
 div_create.appendChild(button_create);
 container_resultado_search.innerHTML = "";
 container_resultado_search.style.display = "block"
 container_resultado_search.appendChild(div_create);  
   }else{
       let div_create = document.createElement('DIV'); div_create.classList.add('containerJsSearchResultado');
 let p_create = document.createElement('P'); p_create.innerHTML = datajsonResponse[search].name; p_create.classList.add('nameUserForSearch')
 let img_create = document.createElement('IMG'); img_create.src = datajsonResponse[search].avatar; img_create.classList.add('imgForSearch');
 let button_create = document.createElement('IMG'); button_create.src = 'media/iconos/addFriends.png';button_create.classList.add('buttonsAddEstudent');button_create.setAttribute('value',datajsonResponse[search].name) 
 div_create.appendChild(img_create);
 div_create.appendChild(p_create);
 div_create.appendChild(button_create);
 container_resultado_search.innerHTML = "";
 container_resultado_search.style.display = "block"
 container_resultado_search.appendChild(div_create);
 startEnventEscuchaAddEstudent()
   }
})
}
   })
}