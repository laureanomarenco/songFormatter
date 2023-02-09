Instalar json-server
npm install –g json-server
Armar un json para simular la base de datos, respetar algún ejemplo, en json placeholder hay.

guardar ese json en una carpeta en la carpeta anterior a la carpeta donde esta todo el código
Después ejecutar json server asi

npx json-server ../data/data.json –watch

así se generarán los endpoints a los que podemos hacer las solicitudes desde javascript

en la carpeta del proyecto vamos a tener una carpeta js con los archivos js que vamos a utilizar para generar los elementos dinámicos que necesitemos, fetcheando los endpoints de la siguiente forma

fetch('http://localhost:3000/cancion')
    .then(res => res.json())
    .then(cancion => { acciones a realizar con lo devuelto })