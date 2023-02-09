// const url = new URLSearchParams(location.search)
// const id = url.get('id')
// #TODO obtener usuario
// #TODO estilar datos de usuario y agregar modificación
// #TODO Agregar modificar y eliminar canciones publicadas
// #TODO agregar cancioneros del usuario con links a cada uno (poner la lista arriba de las canciones agregadas)
// #TODO Crear cancioneros
// #TODO Agregar modificar y eliminar cancioneros

const userLogged = localStorage.getItem('isLoggin')

const fetchUser = async () => {
    const aux = await fetch(`http://localhost:3000/usuario?nickname=` + userLogged)
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

const autorSongs = async () => {
    const aux = await fetch(`http://localhost:3000/autor`)
    const autor = await aux.json()
    return autor
}

const cancionerosUser = async () => {
    const aux = await fetch(`http://localhost:3000/cancionero?idUser=` + user.id)
    const cancioneros = await aux.json()
    return cancioneros
}

const cancion = await songsUser()
const autor = await autorSongs()
const cancioneros = await cancionerosUser()
console.log(user);


const content = document.querySelector('#content')

// ## USER DATA ##
const head = document.createElement('hgroup')

const edit = document.createElement('i')
edit.classList.add("edit-user")
edit.classList.add("fa-solid")
edit.classList.add("fa-pen")

head.appendChild(edit)

head.classList.add('head')
const h1 = document.createElement('h1')
h1.classList.add('title')
h1.innerHTML = "Usuario"
head.appendChild(h1)

const username = document.createElement('p')
username.innerHTML = "Username: " + user.nickname
head.appendChild(username)


const mail = document.createElement('p')
mail.innerHTML = "Mail: " + user.mail
head.appendChild(mail)

const password = document.createElement('p')
password.innerHTML = "Password: *******"
head.appendChild(password)

content.appendChild(head)

// ## BOTONES ##
const div_botones = document.createElement('div')
div_botones.classList.add('div-botones')

const nueva_cancion = document.createElement('a')
nueva_cancion.classList.add('boton')
nueva_cancion.href = 'create-song.html'
nueva_cancion.innerHTML = 'Nueva canción'
div_botones.appendChild(nueva_cancion)

const nuevo_cancionero = document.createElement('a')
nuevo_cancionero.classList.add('boton')
nuevo_cancionero.href = 'nuevoCancionero.html'
nuevo_cancionero.innerHTML = 'Nuevo cancionero'
div_botones.appendChild(nuevo_cancionero)

content.appendChild(div_botones)

// ## CANCIONEROS ##
const div_cancioneros = document.createElement('div')
div_cancioneros.classList.add('div-cancioneros')

const cancioneros_title = document.createElement('h2')
cancioneros_title.innerHTML = 'Cancioneros'
div_cancioneros.appendChild(cancioneros_title)

if(!cancioneros.length){
    const no_cancioneros = document.createElement('p')
    no_cancioneros.innerHTML = "No tienes cancioneros, crea uno."
    div_cancioneros.appendChild(no_cancioneros)
}

content.appendChild(div_cancioneros)


// ## CANCIONES PUBLICADAS ##

const div = document.createElement('div')
const subtitle = document.createElement('h2')
subtitle.innerHTML = "Canciones publicadas"
div.appendChild(subtitle)
if(!cancion.length){
    const no_cancion = document.createElement('p')
    no_cancion.innerHTML = "No tienes canciones publicadas"
    div.appendChild(no_cancion)
} else {

    content.appendChild(div)
    
const table = document.createElement('table')

const thead = document.createElement('thead')
const cancion_th = document.createElement('th')
cancion_th.innerHTML = "Canción"
thead.appendChild(cancion_th)

const autor_th = document.createElement('th')
autor_th.innerHTML = "Autor"
thead.appendChild(autor_th)

const anio_th = document.createElement('th')
anio_th.innerHTML = "Año"
thead.appendChild(anio_th)

table.appendChild(thead)


for (let i = 0; i < cancion.length; i++) {
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
    
    // Agregando botón delete
    const td3 = document.createElement('td')
    td3.classList.add("delete")
    const a = document.createElement('a')
    //a.href = ``
    const icon = document.createElement('i')
    icon.classList.add("fa-regular")
    icon.classList.add("fa-trash-can")
    a.appendChild(icon)
    td3.appendChild(a)
    tr.appendChild(td3)
    
    
    // Agregando botón update
    const td4 = document.createElement('td')
    td4.classList.add("edit")
    const a2 = document.createElement('a')
    //a2.href = ``
    const icon2 = document.createElement('i')
    icon2.classList.add("fa-solid")
    icon2.classList.add("fa-pen")
    a2.appendChild(icon2)
    td4.appendChild(a2)
    tr.appendChild(td4)
    
    
    table.appendChild(tr)
}



content.appendChild(table)
}

// <!-- <h1 class="title">Nombre de usuario</h1>
// <p>Nickname: Lau1234 </p>
// <p>Mail: lau@mail.com</p>
// <p>Password: *******</p>
// <p>Canciones publicadas: 1</p>
// <a href="create-song.html">Agregar canción</a>
// <table>
//     <thead>
//         <th>Canción</th>
//         <th>Autor</th>
//         <th>Año</th>
//     </thead>         
//     <tbody>
//         <td><a href="src/example.html">The song of silence</a></td>
//         <td><a href="src/autor.html">Simon & Garfunkel</a></td>
//         <td>1968</td>
//         <td><a href="#" data-title="Editar tu canción">Edit</a></td>
//         <td class="delete"><a href="#" data-title="Editar tu canción">Delete</a></td>
//     </tbody>  

// </table> -->