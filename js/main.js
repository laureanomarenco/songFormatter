function getData() {
    fetch('../data/data.json')
        .then(res => res.json())
        .then(datos => {
            datos.cancion.letra.map(e => {
                const p = document.createElement("p");
                p.innerText = e;
                document.body.appendChild(p);
             })
        })
} 
getData()