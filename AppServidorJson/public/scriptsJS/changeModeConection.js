function modeAcademic(sectionInner,serverHttp){
sectionInner.innerHTML = '';
sectionInner.style.display = 'none';
document.getElementById('modeAcademicSection').style.display = 'block';
inicializarModoAcademico(serverHttp)
}