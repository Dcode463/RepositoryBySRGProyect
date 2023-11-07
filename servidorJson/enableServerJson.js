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
          creatorJsonRepositori()
          resolve({"mensaje": "ok"});
        }
      });
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
console.log(`questionJson creado en ${nombreRepositoriCarpeta}`)
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
    return;
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
    return;
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
  const rutaJson = 'DataJson/jsonTeachers/usersTeachersInfo.json';
const nuevosDatos = {
  "materia" :  `${datosRecibidos.materia}`,
  "name":     `${datosRecibidos.name}`
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
  "start": "repositori",
  "chat" : " ",
  "examenes" : {},
  "resultadoForExamenes" : ""
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
"materia" : datosRecibidos.materia
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
console.log(`dataJson creado en ${nombreRepositoriCarpeta}`)
}catch(e){ 
console.error(`Error al crear  el archivo json de ${nombreRepositoriCarpeta}
  problema : ${e}
  `)
}
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
if(datosRecibidos.funcion === 'saveExa'){
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
    return;
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
  });
  promesaDatosRecibidos.then((envio) => {
    res.json(envio);
  });
});



app.listen(port,ipServer, ()=>{
  console.log(`Servidor Json listo en http://${ipServer}:${port}`)
})