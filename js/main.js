// ** HOME **
const fetchCanciones = async () => {
    const aux = await fetch('http://localhost:3000/cancion')
    const cancion = await aux.json()
    return cancion
}

const fetchAutores = async () => {
    const aux2 = await fetch('http://localhost:3000/autor')
    const autor = await aux2.json()
    return autor
}

const cancion = await fetchCanciones();
const autor = await fetchAutores();


for (let i = 0; i < cancion.length; i++) {
    const table = document.querySelector('#body-table')
    const tr = document.createElement('tr')
    // Agregando titulo
    const tdTitulo = document.createElement('td')
    const aTitulo = document.createElement('a')

    aTitulo.innerText = cancion[i].titulo
    tdTitulo.addEventListener("click", () => {
        cancionClickeada.push(cancion[i])
    })
    aTitulo.href = `src/song.html?id=${cancion[i].idCancion}`
    //aTitulo.href = `src/song.html`
    tdTitulo.appendChild(aTitulo)
    tr.appendChild(tdTitulo)

    for (let j = 0; j < autor.length; j++) {
        // Agregando autor
        const tdAutor = document.createElement('td')
        const aAutor = document.createElement('a')

        if (autor[j].idAutor === cancion[i].idAutor) {
            aAutor.innerText = autor[j].nombre
        } else {
            aAutor.innerText = "Desconocido"
        }
        tdAutor.appendChild(aAutor)
        tr.appendChild(tdAutor)
        
        // Agregando año 
        const td2 = document.createElement('td')
        const p = document.createElement('p')

        p.innerText = cancion[i].anio
        td2.appendChild(p)
        tr.appendChild(td2)

        // Agregando botón add
        const td3 = document.createElement('td')
        td3.classList.add("add")
        const a2 = document.createElement('a')

        a2.innerText = "+"
        td3.appendChild(a2)
        tr.appendChild(td3)

        
        table.appendChild(tr)
        console.log(table, tr)
    }
}

function cancionElegida(cancion){
    console.log(cancion);
}