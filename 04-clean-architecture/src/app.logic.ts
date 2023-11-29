import fs from 'fs';

// Definir la función tabla
const tabla = (numer: number) => {
    const header =`
==========================================
               Tabla ${numer}
==========================================\n`;
    let result = header;

    for (let i = 1; i <= 10; i++) {
        result += ` ${numer} X ${i} = ${numer * i}\n`;
    }

    return result;
}



// Llamar a la función tabla
const numer = 2;
const output = tabla(numer);

// Crear la carpeta para guardar el archivo
const outputPath = 'outputs';
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
}

// Grabar en un archivo
fs.writeFileSync(`${outputPath}/tabla-${numer}.txt`, output);


console.log(tabla(numer));