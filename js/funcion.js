function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//Función de ayuda: reúne los datos a exportar en un solo objeto
function obtenerDatos() {
    return {
        nombre: document.getElementById('textNombre').value,
        descripcion: document.getElementById('textDescripcion').value,
        latitud: document.getElementById('textLatitud').value,
        longitud: document.getElementById('textLongitud').value,
        
        fecha: (new Date()).toLocaleDateString()
    };
};

//Genera un objeto Blob con los datos en un archivo TXT
function generarTexto(datos) {
    var texto = [];
    texto.push('Datos del Registro \t\n');
    texto.push('Nombre: ');
    texto.push(datos.nombre);
    texto.push('\t\n');
    texto.push('Descripcion: ');
    texto.push(datos.descripcion);
    texto.push('\t\n');
    texto.push('Latitud: ');
    texto.push(datos.latitud);
    texto.push('\t\n');
    texto.push('Longitud: ');
    texto.push(datos.longitud);
    texto.push('\t\n');
    texto.push('Fecha: ');
    texto.push(datos.fecha);
    texto.push('\t\n');
    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
};


document.getElementById('boton-txt').addEventListener('click', function () {
    var datos = obtenerDatos();
    descargarArchivo(generarTexto(datos), 'archivo.txt');
}, false);