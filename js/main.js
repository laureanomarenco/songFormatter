// ** HOME **

const isLoggin = localStorage.getItem('isLoggin')
const userLogged = localStorage.getItem('isLoggin')

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
let cancioneros;
if(isLoggin){

    const fetchUser = async () => {
        const aux = await fetch(`http://localhost:8080/songApp-1.0-SNAPSHOT/api/usuarios?nickname=` + userLogged)
        const user = await aux.json()
        return user
    }

    const aux = await fetchUser()
    const user = aux[0]
    
    const songsUser = async () => {
        const aux = await fetch(`http://localhost:3000/cancion?idUsuario=` + user.id)
        const cancion = await aux.json()
        return cancion
    }
    
    const cancionerosUser = async () => {
        const aux = await fetch(`http://localhost:3000/cancionero?idUser=` + user.id)
        const cancioneros = await aux.json()
        return cancioneros
    }
    
    cancioneros = await cancionerosUser()
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
    aTitulo.href = `song.html?id=${cancion[i].id}`
    //aTitulo.href = `src/song.html`
    tdTitulo.appendChild(aTitulo)
    tr.appendChild(tdTitulo)

    let auxAutor = false;
    for (let j = 0; j < autor.length; j++) {
        // Agregando autor
        if (autor[j].id === cancion[i].idAutor) {
            const tdAutor = document.createElement('td')
            const aAutor = document.createElement('a')
            aAutor.innerText = autor[j].nombre
            aAutor.href = `autor.html?id=${autor[j].id}`
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

    if(isLoggin){
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
        
        cancioneros.map(c => {

            const link_modal = document.createElement('button')
            link_modal.classList.add('boton')
            link_modal.innerHTML = c.nombre
            content_div.appendChild(link_modal)
            
            link_modal.addEventListener('click', function(e){
                e.preventDefault()
                
                const objPost = {
                    idCancionero: c.id,
                    idUser: c.idUser,
                    idCancion: cancion[i].id,
                }
                
                const objConfig = {
                    method: 'POST', // Método HTTP (Verbo) CREATE
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(objPost) // transforma un obj js en un string
                }
                const resultado = fetch('http://localhost:3000/cancion_cancionero?idCancionero='+c.id, objConfig)
                resultado
                .then(function (respuesta) {
                    console.log(respuesta)
                    console.log(respuesta.ok)
                    console.log(respuesta.status)
                    // console.log(respuesta.json())
                    return respuesta.json() // <= promesa
                })
                .then(function (dataPostCreado) {
                    console.log(dataPostCreado)
                    alert('Canción agregada exitosamente')
                    //window.location.href = "profile.html"
                })
                .catch(function (err) {
                    console.error(err)
                })
            })
        })
        
        
        modal_div.appendChild(content_div)
        
        table.appendChild(modal_div)
        
        icon.onclick = function () {
            modal_div.style.display = "block";
        }
        
        close_span.onclick = function () {
            modal_div.style.display = "none";
        }
        
        window.onclick = function (event) {
            if (event.target == modal_div) {
                modal_div.style.display = "none";
            }
        }
    }
    table.appendChild(tr)

}