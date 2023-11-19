const cors = require('cors');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let ipServer;
const port = '8070';
const path = require('path');
const filePath = '../../ip/ip.txt';
try {
ipServer = fs.readFileSync(filePath, 'utf8').trim();
console.log('kip: Cambie el ip por ti :)');
}catch (error) {
console.error('Error al leer el archivo ip.txt:');
}
app.use(express.static('public'));
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.post('/', (req, res) => {
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','GET','POST','DELETE');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
const datosRecibidos = req.body;
console.log(`Datos recibidos de ${datosRecibidos.name}`);
const promesaDatosRecibidos = new Promise((resolve) => {
/////////////////////////////////////////Registro de ususarios////////////////////////////////////////////////////////////////
if (datosRecibidos.funcion === "newUser"){
const rutaJson = 'UserRegister/howManyUser.json';
const nuevosDatos = {
"status" :  datosRecibidos.status,
"avatar":   `${datosRecibidos.avatar}`,
"name":     `${datosRecibidos.name}`,
"friends" : [],
"trofeos" : `${datosRecibidos.trofeos}`
};
nuevosDatos.friends.push(datosRecibidos.friends)
const datos = datosRecibidos.name;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
if (error) {
resolve({
"mensaje" : "Error",
"error" : " al analizar el archivo JSON"
})
console.log("Error al leer el archivo JSON");
return;
}
try{
const dataJson = JSON.parse(datosExistente);
dataJson[datos] = nuevosDatos;
const datosActualizados = JSON.stringify(dataJson, null, 2);
fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
if (error) {
resolve({
"mensaje" : "Error",
"error" : " al analizar el archivo JSON"
})
console.log('Error al escribir el archivo JSON: ' + error);
} else {
console.log(`User ${datosRecibidos.name} : ${datosRecibidos.status}`);
resolve({
"mensaje":"Guardando usuario"
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}
////////////////////////////////////////////peticion usuarios////////////////////////////////////////////////////
else if(datosRecibidos.funcion === "requestUsers"){
const filePath = path.join(__dirname, 'UserRegister', `howManyUser.json`);
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
      ///////////////////////////////////////crador de repositorio////////////////////////
else if(datosRecibidos.funcion === "createNewRepositori"){
      const nombreRepositoriCarpeta = datosRecibidos.nameRepositori; // Corregido el nombre de la variable datosRecibidos
      const ruta = 'repositori/' + nombreRepositoriCarpeta; // Usar una ruta relativa al sistema de archivos local
      fs.mkdir(ruta, { recursive: true }, (error) => {
        if (error) {
          console.error("Ups, hay un error en el servidor de creación de repositorios: " + error);
          resolve(JSON.stringify({ "mensaje": "error" }));
        } else {
          console.log("Listo, repositorio creado");
          funcioncrearJsonNotification()
          resolve({"mensaje": "ok"});
        }
      });
/////////////////////////creator notification json/////////////////////////////////////
funcioncrearJsonNotification=()=>{
  const datos = {
NOREMOVE : {
  data : true
}
};

// Ruta y nombre del archivo JSON que se creará
const filePath = `repositori/${nombreRepositoriCarpeta}/notification.json`;

// Convierte el objeto de datos a formato JSON
const contenidoJson = JSON.stringify(datos, null, 2);

// Escribe el contenido JSON en el archivo
fs.writeFile(filePath, contenidoJson, 'utf8', (err) => {
  if (err) {
    console.error('Error al escribir en el archivo JSON:', err);
  } else {
          creatorJsonRepositori()
  }
});
}
//----->///////////datajsonrepositori////////////////
creatorJsonRepositori=()=>{
let rutaDeRepositorio = `repositori/${nombreRepositoriCarpeta}/dataGame.json`;
try{ 
const data = {
  "start": "repositori",
  "request": " ",
  "acceptRequest": "",
  "Mensajes": {
    "userName": "",
    "avatar": " ",
    "chat": " ",
    "request": "false",
    "respuestaRequest": " ",
    "Datagame": {
      "status": "listoLH",
      "data":""
    }
  }
};
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
console.log(`dataJson creado en ${nombreRepositoriCarpeta}`)
creatorJsonRepositoriQuestion()
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
creatorJsonRepositoriQuestion=()=>{
let rutaDeRepositorio = `repositori/${nombreRepositoriCarpeta}/questionOnline.json`;
try{ 
const data = {
"status" : " " ,
"pregunta" : " "
  };
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
console.log(`questionJson creado en ${nombreRepositoriCarpeta}`);
creatorRepositoriJsonForPassword()
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
creatorRepositoriJsonForPassword=()=>{
  let rutaDeRepositorio = `repositori/${nombreRepositoriCarpeta}/password.json`;
try{ 
const data = {
pass : datosRecibidos.password
  };
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
console.log(`questionJson creado en ${nombreRepositoriCarpeta}`)
creatorJsonRepositoriEXA()
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
creatorJsonRepositoriEXA=()=>{
let rutaDeRepositorio = `repositori/${nombreRepositoriCarpeta}/examenes.json`;
try{ 
const data = {
'NOREMOVE':{
  'DATA' :'011101001100101'
  }
}
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
console.log(`questionJson creado en ${nombreRepositoriCarpeta}`);
creatorJsonRepositoriResultadosEXA()
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
creatorJsonRepositoriResultadosEXA=()=>{
let rutaDeRepositorio = `repositori/${nombreRepositoriCarpeta}/resultados.json`;
try{ 
const data = {
'NOREMOVE':{
  'DATA' :'011101001100101'
  }
}
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
console.log(`questionJson creado en ${nombreRepositoriCarpeta}`);
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
}
///////////////////////////////////obtener los datos de usuario/////////////////////////////////////////////////////////////
else if (datosRecibidos.funcion === "howManyUsers") {
const filePath = path.join(__dirname, 'UserRegister', `howManyUser.json`);
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
    }
/////////////////////////////////////////verificacion de fraude///////////////////////////////////////////////////////////
 else if(datosRecibidos.funcion === undefined){
       resolve({datos : "error",
                error :  "Servidor : no encuentro esa peticion .... reiniciando app",
                funcion : "closed",
               })
    }
////////////////////////////////////////conection users///////////////////////////////////////////////////////////
   else if(datosRecibidos.funcion === "conectionUsers"){
      console.log(`Agregando datos para repositorio ${datosRecibidos.name}`)
            let user = datosRecibidos.userConection;
      let rutaJson = `repositori/${user}/dataGame.json`;
      let nuevosDatos = {
     "userName" : `${datosRecibidos.name}`,
     "avatar" : `${datosRecibidos.avatar}`,
     "chat" : datosRecibidos.chat,
     "request" : `${datosRecibidos.request}`,
     "respuestaRequest" : `${datosRecibidos.respuestaRequest}`,
      "Datagame" : datosRecibidos.Datagames
};
let datos = datosRecibidos.name;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
    return;
  }
  try {
    let dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson["Mensajes"] = nuevosDatos;

    let datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`conectando a ${datosRecibidos.name} con ${user} ...`);
        resolve({
          "mensaje": `ok`
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
  });
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      else  if(datosRecibidos.funcion === "conectionQuestionUser"){
      console.log(`Agregando datos para repositorio ${datosRecibidos.name}`)
            let user = datosRecibidos.userConection;
      let rutaJson = `repositori/${user}/questionOnline.json`;
      let nuevosDatos = {
    "status" : `${datosRecibidos.status}`,
    "pregunta" : datosRecibidos.pregunta,
    "respuestas1" : datosRecibidos.respuesta1,
    "respuestas2" : datosRecibidos.respuesta2,
    "respuestas3" : datosRecibidos.respuesta3,
    "respuestaCorrecta" :datosRecibidos.respuestaCorrecta
};
let datos = datosRecibidos.name;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
    return;
  }
  try {
    let dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson["Online"] = nuevosDatos;

    let datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`conectando a ${datosRecibidos.name} con ${user} ...`);
        resolve({
          "mensaje": `ok`
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
  });
    }
////////////////////////////////////////application certification//////////////////////////////////////////////////////////////////

else if(datosRecibidos.funcion === "applicationCertification"){
const filePath = path.join(__dirname, 'repositori', `${datosRecibidos.name}`, 'dataGame.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
///////////////////////////////////////////////aplication certification questioon///////////////////////////////////////////

else if(datosRecibidos.funcion === "verificacionServerQuestion"){
const filePath = path.join(__dirname, 'repositori', `${datosRecibidos.name}`, 'questionOnline.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
//////////////////////////////////////////////peticion question/////////////////////////////////////////////////////////////
else if(datosRecibidos.funcion === "question"){
const filePath = path.join(__dirname, 'question','question.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
////////////////////////////////////////new QuestionRepositori/////////////////////////////////////////////////////////////
   else if (datosRecibidos.funcion === "newQuestion") { // Corregido el nombre de la variable datosRecibidos
      //registramos al usuario en dataJsonHowManyUser
  const rutaJson = 'question/question.json';
const nuevosDatos = {
     "pregunta" : datosRecibidos.pregunta,
      "status" : datosRecibidos.materia,
      "respuestas1" :datosRecibidos.respuesta1,
      "respuestas2" :datosRecibidos.respuesta2,
      "respuestas3" :datosRecibidos.respuesta3,
      "respuestaCorrecta" : datosRecibidos.respuestaCorrecta,
      "avatar" : `questionMedia/giphy.gif`
};
const datos = datosRecibidos.pregunta;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
    
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`ingresando nuevos datos para la materia ${datosRecibidos.materia}`);
        resolve({
          "mensaje":"ok"
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}/////////////////////////////////////DEL question//////////////////////////////////////
else if(datosRecibidos.funcion === "DELETEQuestion"){
console.log("borrando question");
const archivoJSON = 'question/question.json';
let whatQuestion = datosRecibidos.questionDelete;

fs.readFile(archivoJSON, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON', err);
    
  }

  const jsonData = JSON.parse(data);

  // Eliminar el objeto deseado utilizando la clave almacenada en 'whatQuestion'
  if (jsonData.hasOwnProperty(whatQuestion)) {
    delete jsonData[whatQuestion];
  }

  fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON', err);
    } else {
      resolve({
        "mensaje" : "ok"
      })
      console.log('Objeto eliminado y cambios guardados.');
    }
  });
});}
//////////////////////////////////////peticionTeacherJson////////////////////////////////////////////////
else if(datosRecibidos.funcion === "applicationCertificationTeacherJSON"){
const filePath = path.join(__dirname, 'DataJson', `jsonTeachers`, 'usersTeachersInfo.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
//////////////////////////////////////NewTeacher/////////////////////////////////////////////////////////
else if(datosRecibidos.funcion === "newTeacher"){
  console.log(datosRecibidos.avatarUrl)
  const rutaJson = 'DataJson/jsonTeachers/usersTeachersInfo.json';
const nuevosDatos = {
  "materia" :  `${datosRecibidos.materia}`,
  "name":     `${datosRecibidos.name}`,
  "avatar" : datosRecibidos.avatarUrl
};
const datos = datosRecibidos.name;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`Preofesor ${datosRecibidos.name} de ${datosRecibidos.materia} : inicio sesion`);
        createNewRepositoriForTeacher()
        resolve({
          "mensaje":"ok"
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
createNewRepositoriForTeacher=()=>{
      const nombreRepositoriCarpeta = datosRecibidos.name; // Corregido el nombre de la variable datosRecibidos
      const ruta = 'repositoriForTeachers/' + nombreRepositoriCarpeta; // Usar una ruta relativa al sistema de archivos local
      fs.mkdir(ruta, { recursive: true }, (error) => {
        if (error) {
          console.error("Ups, hay un error en el servidor de creación de repositorios: " + error);
          resolve(JSON.stringify({ "mensaje": "error" }));
        } else {
          console.log("Listo, repositorio creado");
          creatorJsonRepositoriTwo()
          resolve({"mensaje": "ok"});
        }
      });
//----->///////////datajsonrepositori////////////////
creatorJsonRepositoriTwo=()=>{
let rutaDeRepositorio = `repositoriForTeachers/${nombreRepositoriCarpeta}/infoAdd.json`;
try{ 
const data = {
  "start": "repositori"
  };
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
console.log(`dataJson creado en ${nombreRepositoriCarpeta}`)
creatorJsonRepositoriTree();
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
creatorJsonRepositoriTree=()=>{
let rutaDeRepositorio = `repositoriForTeachers/${nombreRepositoriCarpeta}/pass.json`;
try{ 
const data = {
"pass" : datosRecibidos.pass,
"materia" : datosRecibidos.materia,
"avatar" : datosRecibidos.avatarUrl
  };
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
creatorJsonRepositoriFor()
console.log(`dataJson creado en ${nombreRepositoriCarpeta}`)
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
creatorJsonRepositoriFor=()=>{
let rutaDeRepositorio = `repositoriForTeachers/${nombreRepositoriCarpeta}/estudenteList.json`;
try{ 
const data = {
  "Students": {
    "Students": [
      [

      ]
    ]
  }
  };
let dataJson = JSON.stringify(data, null, 2);
fs.writeFileSync(rutaDeRepositorio, dataJson);
init_resultado_carpeta();
console.log(`dataJson creado en ${nombreRepositoriCarpeta}`)
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
}
/////////////////////////////////////////////////////////////////////////////////////////////
  function init_resultado_carpeta(){ // creator carpeta resultados
const ruta =  `repositoriForTeachers/${datosRecibidos.name}/resultadosExa` // Usar una ruta relativa al sistema de archivos local
      fs.mkdir(ruta, { recursive: true }, (error) => {
        if (error) {
          console.error("Ups, hay un error en el servidor de creación de repositorios: " + error);
          resolve(JSON.stringify({ "mensaje": "error" }));
        } else {
init_registro_carpeta()
        }
      });
}
function init_registro_carpeta(){
  const ruta =  `repositoriForTeachers/${datosRecibidos.name}/registroExa` // Usar una ruta relativa al sistema de archivos local
      fs.mkdir(ruta, { recursive: true }, (error) => {
        if (error) {
          console.error("Ups, hay un error en el servidor de creación de repositorios: " + error);
          resolve(JSON.stringify({ "mensaje": "error" }));
        } else {
          console.log("Listo, repositorio creado");
          resolve({"mensaje": "ok"});
        }
      });
}
}
}
/////////////////////////////////////verificacion docentes///////////////////////////////////////////////
else if(datosRecibidos.funcion === "veriRequesteTeacher0110"){
const filePath = path.join(__dirname, 'repositoriForTeachers', `${datosRecibidos.name}`, 'pass.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else{
    let datas = JSON.parse(data)
   if(datas.pass === datosRecibidos.password){
    resolve({
      "materia" : datas.materia,
      "resultado" : true,
      "avatar" : datas.avatar
    })
   }else{
    resolve({
      "resultado" : false
    })
   } 
  }
})
}
///////////////////////////////////////////add studends/////////////////////////////////
else if(datosRecibidos.funcion === "addStudents"){
    const rutaJson = `repositoriForTeachers/${datosRecibidos.nameRepositori}/estudenteList.json`;
const nuevosDatos = {
"Students" : []
};
nuevosDatos.Students.push(datosRecibidos.Students)
// const datos = "Students";
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    
    dataJson["Students"] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`Preofesor ${datosRecibidos.nameRepositori} agregando estudiante`);
        resolve({
          "mensaje":"ok"
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}
////////////////////////////////////////////verifriends/////////////////////////////////////////////
else if(datosRecibidos.funcion === "applicationCertificationStudentList"){
const filePath = path.join(__dirname, 'repositoriForTeachers', `${datosRecibidos.name}`, 'estudenteList.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
////////////////////////////////////////saveExa//////////////////////////////////////////////////
else if(datosRecibidos.funcion === 'saveExa'){
        //registramos al usuario en dataJsonHowManyUser
  console.log(`Peticion saveExa procesada para ${datosRecibidos.user}`)
  const rutaJson = `repositoriForTeachers/${datosRecibidos.user}/infoAdd.json`;
const nuevosDatos = {
   dataconfig : datosRecibidos.config,
   questionsData : datosRecibidos.dataQuestion
};
const datos = datosRecibidos.nameExa;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
    
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`ingresando nuevos datos para la materia ${datosRecibidos.materia}`);
        creatorJsonRepositoriForResult()

}
/*requisitos : namecarpeta, */
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function  creatorJsonRepositoriForResult(){
  const datos = {
NOREMOVE : '011514415757'
};

const rutaArchivoJson = `repositoriForTeachers/${datosRecibidos.user}/registroExa/${datosRecibidos.config.nameForExa}.json`;

// Convierte el objeto a formato JSON
const contenidoJson = JSON.stringify(datos, null, 2);

// Escribe el contenido en el archivo
fs.writeFile(rutaArchivoJson, contenidoJson, 'utf8', (err) => {
    if (err) {
        console.error('Error al crear el archivo JSON:', err);
    } else {
        console.log('Archivo JSON creado correctamente.');
        creatorJsonRepositoriForRegistro()
    }
});
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function  creatorJsonRepositoriForRegistro(){
  const datos = {
NOREMOVE : '011514415757'
};

const rutaArchivoJson = `repositoriForTeachers/${datosRecibidos.user}/resultadosExa/${datosRecibidos.config.nameForExa}.json`;

// Convierte el objeto a formato JSON
const contenidoJson = JSON.stringify(datos, null, 2);

// Escribe el contenido en el archivo
fs.writeFile(rutaArchivoJson, contenidoJson, 'utf8', (err) => {
    if (err) {
        console.error('Error al crear el archivo JSON:', err);
    } else {
      resolve({
        mensaje : true
      })
    }
});
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
}
/////////////////////////////////////pushPassword_init//////////////////////////////////////////////////////////////////////
else if (datosRecibidos.funcion === 'pushPassword_init'){
  const filePath = path.join(__dirname, 'repositori', `${datosRecibidos.name}`, 'password.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else{
    let datas = JSON.parse(data)
   if(datas.pass === datosRecibidos.password){
    resolve({
      "resultado" : true
    })
   }else{
    resolve({
      "resultado" : false
    })
   } 
  }
})
}
//////////////////////////////requestExa//////////////////////////////////////////////////////////////////////////////////
else if(datosRecibidos.funcion === 'requestExa'){
const filePath = path.join(__dirname, 'repositoriForTeachers', datosRecibidos.name, 'infoAdd.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
/////////////////////////////////////newExaSendStudent/////////////////////////////////////////////////////////////////

   else if (datosRecibidos.funcion === "newExaSendStudent") { // Corregido el nombre de la variable datosRecibidos
      //registramos al usuario en dataJsonHowManyUser
  const rutaJson = `repositori/${datosRecibidos.repositoriName}/examenes.json`;
const nuevosDatos = {
nameTeacher : datosRecibidos.teacherName,
materiaTeacher : datosRecibidos.materia,
urlAvatar : datosRecibidos.avatarMateria,
dataconfig : datosRecibidos.dataconfig,
questionsData : datosRecibidos.questionsData
};
const datos = datosRecibidos.nameExa;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al leer el archivo JSON");
    
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`ingresando nuevos datos para la materia ${datosRecibidos.materia}`);
        resolve({
          "mensaje": true
        })
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : "Error",
      "error" : " al analizar el archivo JSON"
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}
///////////////////////////////////////////////requestExaForStudent////////////////////////////////////////
else if(datosRecibidos.funcion === 'requestExaForStudent'){
  const filePath = path.join(__dirname, 'repositori', `${datosRecibidos.name}`, 'examenes.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
//////////////////////////////////////////////////pushResultadorForTeachers////////////////////////////////
else if(datosRecibidos.funcion === 'pushResultadorForTeachers'){
  const rutaCompleta = path.join(__dirname, 'repositoriForTeachers', datosRecibidos.teacherConection, 'resultadosExa', `${datosRecibidos.nameExamen}.json`);

  // Imprimir en la consola si el archivo existe en la carpeta especificada
  if (fs.existsSync(rutaCompleta)) {
 init_confirm_validor()

        resolve({
        "mensaje" : true
      })
  } else {
  console.log('Bus de examen no existe')
  init_delete_exaFor_student()
        resolve({
        "mensaje" : false
      })
  }
  init_send_student_Notfication=()=>{
  const rutaJson = `repositori/${datosRecibidos.nameStudent}/notification.json`;
const nuevosDatos = {
data : `El profesor ${datosRecibidos.nameTeacher} te ha mandado un examen`
};
const datos = 'alert';
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : false
    })
    console.log("Error al leer el archivo JSON");
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : false,
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`notificando a ${datosRecibidos.nameStudent} que tiene un resultado`);
      resolve({"mensaje" : true})
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : false,
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}
function init_confirm_validor(){
        //registramos al usuario en dataJsonHowManyUser
  const rutaJson = `repositoriForTeachers/${datosRecibidos.teacherConection}/resultadosExa/${datosRecibidos.nameExamen}.json`;
const nuevosDatos = {
nameStudent : datosRecibidos.nameStudent,
data : {... datosRecibidos.data}
};
const datos = datosRecibidos.nameStudent;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
    console.log("Error al leer el archivo JSON");
    
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
    init_delete_exaFor_student()
      }
    });
  } catch (parseError) {
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}
function init_delete_exaFor_student(){
const archivoJSON = `repositori/${datosRecibidos.nameStudent}/examenes.json`;
let whatQuestion = datosRecibidos.nameExamen;

fs.readFile(archivoJSON, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON', err);
    
  }

  const jsonData = JSON.parse(data);

  // Eliminar el objeto deseado utilizando la clave almacenada en 'whatQuestion'
  if (jsonData.hasOwnProperty(whatQuestion)) {
    delete jsonData[whatQuestion];
  }

  fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON', err);
    } else {
      console.log('Objeto eliminado y cambios guardados.');
    }
  });
});
}
}
////////////////////////////////////////////////////////////////requestExaAnswers///////////////////////////////////////////////////
else if(datosRecibidos.funcion === 'requestExaAnswers'){
  const filePath = path.join(__dirname, 'repositoriForTeachers', `${datosRecibidos.name}`, 'resultadosExa', `${datosRecibidos.nameExa}.json`);
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
////////////////////////////////////////////////////////////deleteExamenes//////////////////////////////////////////////
else if(datosRecibidos.funcion === 'deleteExamenes'){
  /*
 nameTeacher,
 exaDelete,

  */
console.log("borrando question");
const archivoJSON = `repositoriForTeachers/${datosRecibidos.nameTeacher}/infoAdd.json`;
let whatQuestion = datosRecibidos.exaDelete;

fs.readFile(archivoJSON, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON', err);
  }

  const jsonData = JSON.parse(data);

  // Eliminar el objeto deseado utilizando la clave almacenada en 'whatQuestion'
  if (jsonData.hasOwnProperty(whatQuestion)) {
    delete jsonData[whatQuestion];
  }

  fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON', err);
    } else {
init_borrar_repositori_exa()
      console.log('Objeto eliminado y cambios guardados.');
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////
function init_borrar_repositori_exa(){
const archivoABorrar = `repositoriForTeachers/${datosRecibidos.nameTeacher}/resultadosExa/${datosRecibidos.exaDelete}.json`;

// Verificar si el archivo existe antes de intentar borrarlo
if (fs.existsSync(archivoABorrar)) {
    fs.unlinkSync(archivoABorrar);
    console.log(`El archivo ${archivoABorrar} ha sido borrado exitosamente.`);
  init_borrar_repositori_exaRegistro()
} else {
    console.log(`El archivo ${archivoABorrar} no existe.`);
}
}
////////////////////////////////////////////////////////////////////////////////
function init_borrar_repositori_exaRegistro(){
const archivoABorrar = `repositoriForTeachers/${datosRecibidos.nameTeacher}/registroExa/${datosRecibidos.exaDelete}.json`;

// Verificar si el archivo existe antes de intentar borrarlo
if (fs.existsSync(archivoABorrar)) {
    fs.unlinkSync(archivoABorrar);
    console.log(`El archivo ${archivoABorrar} ha sido borrado exitosamente.`);
        resolve({
        "mensaje" : true
      })
} else {
    console.log(`El archivo ${archivoABorrar} no existe.`);
        resolve({
        "mensaje" : false
      })
}}}
//////////////////////////////////////////////////////////////////////////sendStudentAndRegistro
else if(datosRecibidos.funcion === 'sendStudentAndRegistro'){
      //registramos al usuario en registro
  const rutaJson = `repositoriForTeachers/${datosRecibidos.nameTeacher}/registroExa/${datosRecibidos.registro.nameExamen}.json`;
const nuevosDatos = {
nameStudent : datosRecibidos.registro.nameStudent,
puntaje : datosRecibidos.registro.puntaje
};
const datos = datosRecibidos.registro.nameStudent;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : false
    })
    console.log("Error al leer el archivo JSON");
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : false,
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`Registrando datos de ${datosRecibidos.registro.nameStudent}`);
       init_send_student_resultado()
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : false,
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
init_send_student_resultado=()=>{
  const rutaJson = `repositori/${datosRecibidos.nameStudent}/resultados.json`;
const nuevosDatos = {
nameStudent : datosRecibidos.nameStudent,
nameTeacher : datosRecibidos.nameTeacher,
puntajeGanado : datosRecibidos.send.puntajeGanado,
puntaje : datosRecibidos.send.puntajeDeExa,
data : {... datosRecibidos.send.data}
};
const datos = datosRecibidos.send.nameExamen;
fs.readFile(rutaJson, 'utf8', (error, datosExistente) => {
  if (error) {
      resolve({
      "mensaje" : false
    })
    console.log("Error al leer el archivo JSON");
  }
  try {
    const dataJson = JSON.parse(datosExistente);
    // Usar notación de corchetes para agregar nuevosDatos al objeto existente
    dataJson[datos] = nuevosDatos;

    const datosActualizados = JSON.stringify(dataJson, null, 2);

    fs.writeFile(rutaJson, datosActualizados, 'utf8', (error) => {
      if (error) {
          resolve({
      "mensaje" : false,
    })
        console.log('Error al escribir el archivo JSON: ' + error);
      } else {
        console.log(`Registrando datos de ${datosRecibidos.registro.nameStudent}`);
      resolve({"mensaje" : true})
      }
    });
  } catch (parseError) {
    resolve({
      "mensaje" : false,
    })
    console.log("Error al analizar el archivo JSON: " + parseError);
  }
});
}
}
////////////////////////////////////////////////////////////////////requestRecord////////////////////////////////////////
else if(datosRecibidos.funcion === 'requestRecord'){
const filePath = path.join(__dirname, 'repositoriForTeachers', `${datosRecibidos.name}`, 'registroExa', `${datosRecibidos.nameExa}.json`);
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : "error",
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
///////////////////////////////////////////////////////////////////requesResultadoByStudent////////////////////////////
else if(datosRecibidos.funcion === 'requesResultadoByStudent'){
  const filePath = path.join(__dirname, 'repositori', `${datosRecibidos.name}`, 'resultados.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : false,
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
//////////////////////////////////verinotification by student////
else if(datosRecibidos.funcion === 'requestNotificationStudent'){
    const filePath = path.join(__dirname, 'repositori', `${datosRecibidos.name}`, 'notification.json');
fs.readFile(filePath, 'utf8', (err, data)=>{
  if(err){ 
    console.log(err)
    resolve({
      "mensaje" : false,
      "typeError" : `${err}`
    })
  }
  else resolve(data)
})
}
//////////////////////////////////////////////////////////////////
else if(datosRecibidos.funcion === "deleteAlert"){
console.log("borrando question");
const archivoJSON = `repositori/${datosRecibidos.name}/notification.json`;
let whatQuestion = 'alert';

fs.readFile(archivoJSON, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON', err);
    
  }

  const jsonData = JSON.parse(data);

  // Eliminar el objeto deseado utilizando la clave almacenada en 'whatQuestion'
  if (jsonData.hasOwnProperty(whatQuestion)) {
    delete jsonData[whatQuestion];
  }

  fs.writeFile(archivoJSON, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir el archivo JSON', err);
    } else {
      resolve({
        "mensaje" : "ok"
      })
      console.log('Objeto eliminado y cambios guardados.');
    }
  });
});}
  });
  promesaDatosRecibidos.then((envio) => {
    res.json(envio);
  });
});
app.listen(port,ipServer, ()=>{
  console.log(`Servidor Json listo en http://${ipServer}:${port}`)
})