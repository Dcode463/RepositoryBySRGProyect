function startEnventEscuchaAddEstudent(){
const buttonAñadirEstudents = document.querySelectorAll('.buttonsAddEstudent');
buttonAñadirEstudents.forEach(e=>{
	e.addEventListener('click',()=>{
			 	 container_resultado_search.style.display = "none";
 container_resultado_search.innerHTML = "";
 chatbot_div_2.style.display = "inline-block";
 chatbot_p_2.innerHTML = `Espere, agregando estudiante`
        affterStudent(e.getAttribute('value'))
	console.log(e.getAttribute('value'))

	})
})
function affterStudent(i){
let headers = {
	method : "post",
	body : JSON.stringify({
		"funcion" : "applicationCertificationStudentList",
		"name" : userNames
	}),
	headers: {"Content-Type" : "application/json"}
}
fetch(servidor,headers)
.then(responseServer => responseServer.json())
.then(async(responseServerJson) => {
	let dataJson = await JSON.parse(responseServerJson)
    let valuesObject = Object.values(dataJson.Students)
    console.log(valuesObject[0][0])
	let pushDataJson = valuesObject[0][0].push(i)
	beforeStudent(valuesObject[0][0])
})
}
function beforeStudent(a){
let data = {
			"funcion" : "addStudents",
		"nameRepositori" : userNames,
		"Students" : []
}
data.Students = a
let headers = {
	method : "post",
	body : JSON.stringify(data),
	headers : {"Content-Type" : "application/json"}
}
fetch(servidor,headers)
.then(responseData => responseData.json())
.then(async(resposeDataByJson) => {
	let dataJson = await resposeDataByJson;
	 if(dataJson.mensaje === "ok"){
	 	 container_resultado_search.style.display = "none";
 container_resultado_search.innerHTML = "";
 chatbot_div_2.style.display = "block";
 chatbot_p_2.innerHTML = `Listo estudiante agregado`
 startContentEstudientes(userNames)
 setTimeout(()=>{
 chatbot_div_2.style.display = "none";
 chatbot_p_2.innerHTML = ""
 },1500)
	 }
})
}
}