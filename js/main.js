// ** HOME **
// #TODO controlar isLoggin
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

// ## FILTRO DE BUSQUEDA ##
// #TODO busqueda
const input = document.querySelector("#searcher")

input.addEventListener("change", (e) => {
    cancion.filter((c) => c.titulo !== e.target.value)
    autor.filter((a) => a.nombre !== e.target.value)
    console.log(cancion);
    console.log(autor);
})



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

    let auxAutor = false;
    for (let j = 0; j < autor.length; j++) {
        // Agregando autor
        if (autor[j].idAutor === cancion[i].idAutor) {
            const tdAutor = document.createElement('td')
            const aAutor = document.createElement('a')
            aAutor.innerText = autor[j].nombre
            aAutor.href = `src/autor.html?id=${autor[j].idAutor}`
            tdAutor.appendChild(aAutor)
            tr.appendChild(tdAutor)
            auxAutor = true;
        }
    }
    if (!auxAutor) {
        const tdAutor = document.createElement('td')
        const aAutor = document.createElement('a')
        aAutor.innerText = 'Desconocido'
        //aAutor.href = `src/autor.html?id=${autor[j].idAutor}`
        tdAutor.appendChild(aAutor)
        tr.appendChild(tdAutor)
        auxAutor = true;
    }

    // Agregando año 
    const td2 = document.createElement('td')
    const p = document.createElement('p')

    p.innerText = cancion[i].anio
    td2.appendChild(p)
    tr.appendChild(td2)

    // Agregando botón add
    const td3 = document.createElement('td')
    td3.classList.add("add")
    // const a2 = document.createElement('a')
    // a2.id = "btn"
    //a2.href = "+"
    const icon = document.createElement('i')
    icon.classList.add("fa-solid")
    icon.classList.add("fa-plus")
    //a2.appendChild(icon)
    td3.appendChild(icon)
    tr.appendChild(td3)

    table.appendChild(tr)


    // modal add
    const modal_div = document.createElement('div')
    modal_div.classList.add('modal')

    const content_div = document.createElement('div')
    content_div.classList.add('modal-content')
    modal_div.appendChild(content_div)

    const close_span = document.createElement('span')
    close_span.classList.add('close')
    close_span.innerHTML = "&times;"
    content_div.appendChild(close_span)

    const modal_desc = document.createElement('h1')
    modal_desc.classList.add('modal-title')
    modal_desc.innerHTML = 'Selecciona un cancionero'
    content_div.appendChild(modal_desc)

    const link_modal = document.createElement('a')
    link_modal.classList.add('modal-link')
    link_modal.innerHTML = "Cancionero hardcodeao"
    //link_modal.href = `src/cancionero.html`
    // #TODO agregar canción a cancionero
    content_div.appendChild(link_modal)

    modal_div.appendChild(content_div)

    table.appendChild(modal_div)
    
    icon.onclick = function() {
        modal_div.style.display = "block";
    }

    close_span.onclick = function() {
        modal_div.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal_div.style.display = "none";
        }
    }
}