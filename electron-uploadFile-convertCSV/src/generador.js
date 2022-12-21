const XLSX = require('xlsx');
const rute = 'src/uploads';
const workbook = XLSX.readFile(rute, {cellDates: true, });
const workbookSheets = workbook.SheetNames;
const sheet = workbookSheets[0];
const dataSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); 

//Archivo destino
const fs = require('fs');
//const targetFile = 'src/formatedFile.txt';
const targetFile = 'src/uploads/Prueba.csv';

const generate = () => {
    for (const itemRow of dataSheet) {
        let content;
        let fileDate;
        let date;
        let cadena;
        let arr;
    
        //Separar cadena de Área en 2
        cadena = itemRow['Área'];
        arr = cadena.split(['-']);
    
         for (var i=0; i < arr.length; i++) {
            //console.log(arr[0] + " | " + arr[1]);
         } 
         //console.log(arr[0]);
    
        //date format
        fileDate = itemRow['Fecha de ingreso'];
        date = String(fileDate.getDate()).padStart(2, '0') + '/' + String(fileDate.getMonth() + 1).padStart(2, '0') + '/' +  fileDate.getFullYear();
        
    
        //Para agregar filtro de crear nuevo archivo con solo filtro de usuarios Activos 
        if(itemRow['Estado de empleado'] === 'Activo')
        {
            
                content = itemRow['Cod SAP'] + '|' + itemRow['Ecuador Cédula de Ciudadanía  Información de Identificación Nacional'] + '|' + itemRow['Nombre de usuario'] + '|' + itemRow['Nombre'] + " " + itemRow['Segundo Nombre'] + " " + itemRow['Apellido'] + " " + itemRow['Segundo Apellido'] + '|' + itemRow['Nombre'] + " " + itemRow['Segundo Nombre'] + '|' + itemRow['Apellido'] + " " + itemRow['Segundo Apellido'] + '|' + itemRow['Cargo Función'] + '|' + itemRow['Cargo'] + '|' + " " + '|' + itemRow['Ubicación'] + '|' + date + '|' + 'ADAM' + '|' + itemRow['Reporta a'] + '|' + arr[0] + '|' + arr[1]  + '|' + itemRow['ID de sistema del usuario supervisor'] + "\n";
    
                fs.appendFile(targetFile,  content, 'utf-8', (err) => {
                    if (err){
                        console.log('error al escribir archivo: ', err);
                    }
                });
        } 
    }     
};

window.addEventListener("DOMContentLoaded", () => {
    btnGenerate.addEventListener("click", () => {
        generate();
    });
});