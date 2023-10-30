function newUser(name,password,materia,estudiantes){
	let headers = {
		method : "post",
		body : JSON.stringify({
			"funcion" : "newTeacher",
			"materia" : materia,
			"name" : name,
			"pass" : password
        }),
        headers : {"Content-Type" : "application/json"}
	}
	fetch(servidor,headers)
	.then(resquestServer => resquestServer.json())
	.then(jsonData => {
   if(jsonData.mensaje === "ok"){
   status_salaEsperaLoginP.innerHtml = `Cuanta creada con exito
                                          <br><br> 
   	                                       Cuenta creada : "${name}"`;
   	                                       requestPass(name,password)
   }else{
   	   status_salaEsperaLoginP.innerHtml = `Ups, hay un error
                                          <br><br> 
   	                                       Tipo de error : I.299`;
   	 setTimeout(()=>{
   	 	location.reload()
   	 },1000)
   }
	}).catch(error=>{
	 	let buttnReiniciar = document.getElementById('reinicarApp_Error')
	 	 let containerForError = document.getElementById('EroorFetch');
	 	 setTimeout(()=>{
	 	 	containerForError.style.opacity = "0";
	 	 subBody.style.scale = "500%"
	 	 	containerForError.style.display = "block"
	 	 	setTimeout(()=>{
	 	 		containerForError.style.opacity = "1";
	 	 		subBody.style.display = "none";
            buttnReiniciar.addEventListener('click',()=>{
            	location.reload()
            })
	 	 	},500)
	 	 },1000)

	 })
}