// const url = new URLSearchParams(location.search)
// const id = url.get('id')
// #TODO agregar modificación de user
// #TODO Agregar modificar canciones publicadas
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
console.log(cancioneros);


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

const nuevo_cancionero = document.createElement('button')
nuevo_cancionero.classList.add('boton')
// nuevo_cancionero.href = 'nuevoCancionero.html'
nuevo_cancionero.innerHTML = 'Nuevo cancionero'
div_botones.appendChild(nuevo_cancionero)

content.appendChild(div_botones)

// ## MODAL NUEVO CANCIONERO 
const $modal_div = document.createElement('div')
$modal_div.classList.add('modal')

const $content_div = document.createElement('div')
$content_div.classList.add('modal-content')
$modal_div.appendChild($content_div)

const $close_span = document.createElement('span')
$close_span.classList.add('close')
$close_span.innerHTML = "&times;"
$content_div.appendChild($close_span)

const $modal_desc = document.createElement('h1')
$modal_desc.classList.add('modal-title')
$modal_desc.innerHTML = 'Nuevo cancionero'
$content_div.appendChild($modal_desc)

const $cancioneroForm = document.createElement('form')
$cancioneroForm.classList.add('register-form')
//nombre
const $labelCancionero = document.createElement('label')
$labelCancionero.innerHTML = "Nombre de su nuevo cancionero"
$cancioneroForm.appendChild($labelCancionero)
const $registerUser = document.createElement('input')
$registerUser.classList.add('input-registerUser')
$cancioneroForm.appendChild($registerUser)
//submit
const $registerSubmit = document.createElement('button')
$registerSubmit.classList.add('boton')

$registerSubmit.classList.add('btn-registerUser')
$registerSubmit.innerHTML = 'Crear'
$cancioneroForm.appendChild($registerSubmit)

$content_div.appendChild($cancioneroForm)

$modal_div.appendChild($content_div)

content.appendChild($modal_div)

nuevo_cancionero.onclick = function () {
    $modal_div.style.display = "block";
}

$close_span.onclick = function () {
    $modal_div.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == $modal_div) {
        $modal_div.style.display = "none";
    }
}



$cancioneroForm.addEventListener('submit', function (e) {
    const objPost = {
        id: (cancioneros[cancioneros.length - 1]++),
        nombre: e.target[0].value,
        idUser: user.id,
        canciones: []
    }
    console.log(e);
    const objConfig = {
        method: 'POST', // Método HTTP (Verbo) CREATE
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(objPost) // transforma un obj js en un string
    }
    const resultado = fetch('http://localhost:3000/cancionero', objConfig)
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
            alert('Canciónero creado exitosamente')
            //window.location.href = "profile.html"
        })
        .catch(function (err) {
            console.error(err)
        })
})

// ## CANCIONEROS ##
const div_cancioneros = document.createElement('div')
div_cancioneros.classList.add('div-cancioneros')

const cancioneros_title = document.createElement('h2')
cancioneros_title.innerHTML = 'Cancioneros'
div_cancioneros.appendChild(cancioneros_title)

if (!cancioneros.length) {
    const no_cancioneros = document.createElement('p')
    no_cancioneros.innerHTML = "No tienes cancioneros, crea uno."
    div_cancioneros.appendChild(no_cancioneros)
} else {
    for (let i = 0; i < cancioneros.length; i++) {
        const cancionero_link = document.createElement('a')
        cancionero_link.href = `cancionero.html?id=${cancioneros[i].id}`
        const cancionero_div = document.createElement('div')
        cancionero_div.classList.add('div-cancionero')
        cancionero_div.innerHTML = cancioneros[i].nombre
        cancionero_link.appendChild(cancionero_div)
        div_cancioneros.appendChild(cancionero_link)
    }
}

content.appendChild(div_cancioneros)


// ## CANCIONES PUBLICADAS ##

const div = document.createElement('div')
const subtitle = document.createElement('h2')
subtitle.innerHTML = "Canciones publicadas"
div.appendChild(subtitle)
if (!cancion.length) {
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
        td3.id = `${cancion[i].id}`
        td3.classList.add("delete")
        const a = document.createElement('a')
        //a.href = ``
        const icon = document.createElement('i')
        icon.classList.add("fa-regular")
        icon.classList.add("fa-trash-can")
        a.appendChild(icon)
        td3.appendChild(a)
        tr.appendChild(td3)

        td3.addEventListener('click', function (e) {
            const cancionParaBorrar = td3.id
            const objConfig = {
                method: 'DELETE', // Método HTTP (Verbo) CREATE
                headers: { 'Content-type': 'application/json' },
                //body: JSON.stringify(cancionParaBorrar) // transforma un obj js en un string
            }
            const resultado = fetch('http://localhost:3000/cancion/' + cancionParaBorrar, objConfig)
            resultado
                .then(function (respuesta) {
                    console.log(respuesta)
                    console.log(respuesta.ok)
                    console.log(respuesta.status)
                    // console.log(respuesta.json())
                    return respuesta.json() // <= promesa
                })
                .then(function (borrada) {
                    console.log(borrada)
                    window.location.href = 'profile.html'
                })
                .catch(function (err) {
                    console.error(err)
                })
        })

        // Agregando botón update
        const td4 = document.createElement('td')
        td4.id = `${cancion[i].id}`
        td4.classList.add("edit")
        const a2 = document.createElement('a')
        //a2.href = ``
        const icon2 = document.createElement('i')
        icon2.classList.add("fa-solid")
        icon2.classList.add("fa-pen")
        a2.appendChild(icon2)
        td4.appendChild(a2)
        tr.appendChild(td4)

        // MODAL EDIT
        const $modal_edit = document.createElement('div')
        $modal_edit.classList.add('modal-edit')

        const $content_div = document.createElement('div')
        $content_div.classList.add('modal-content-edit')
        $modal_edit.appendChild($content_div)

        const $close_span = document.createElement('span')
        $close_span.classList.add('close')
        $close_span.innerHTML = "&times;"
        $content_div.appendChild($close_span)

        const $modal_desc = document.createElement('h1')
        $modal_desc.classList.add('modal-title')
        $modal_desc.innerHTML = 'Modificar canción'
        $content_div.appendChild($modal_desc)

        const $editForm = document.createElement('form')
        $editForm.classList.add('register-form')
        //titulo
        const $label_titulo = document.createElement('label')
        $label_titulo.innerHTML = "Modificar titulo"
        $editForm.appendChild($label_titulo)
        const $input_titulo = document.createElement('input')
        $input_titulo.value = cancion[i].titulo
        $editForm.appendChild($input_titulo)
        //detalles
        const $label_detalles = document.createElement('label')
        $label_detalles.innerHTML = "Modificar detalle"
        $editForm.appendChild($label_detalles)
        const $input_detalles = document.createElement('input')
        $input_detalles.value = cancion[i].detalles
        $editForm.appendChild($input_detalles)
        //anio
        const $label_anio = document.createElement('label')
        $label_anio.innerHTML = "Modificar año"
        $editForm.appendChild($label_anio)
        const $input_anio = document.createElement('input')
        $input_anio.value = cancion[i].anio
        $editForm.appendChild($input_anio)
        //letra

        const $label_letra = document.createElement('label')
        $label_letra.innerHTML = "Modificar letra"
        $editForm.appendChild($label_letra)
        const $input_letra = document.createElement('textarea')
        $input_letra.rows = '20'
        $input_letra.cols = '60'
        $input_letra.value = cancion[i].letra.map(l => l)
        $editForm.appendChild($input_letra)
        //submit
        const $modificarSubmit = document.createElement('button')
        $modificarSubmit.classList.add('button-modificar')
        $modificarSubmit.innerHTML = 'Modificar'
        $editForm.appendChild($modificarSubmit)

        $content_div.appendChild($editForm)

        $modal_edit.appendChild($content_div)

        content.appendChild($modal_edit)



        td4.onclick = function () {
            $modal_edit.style.display = "block";
        }

        $close_span.onclick = function () {
            $modal_edit.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == $modal_edit) {
                $modal_edit.style.display = "none";
            }
        }

        table.appendChild(tr)

        $editForm.addEventListener('submit', function (e) {
            let letraArray =  e.target[3].value.split(/\n/)

            const update = {
                idUsuario: cancion[i].idUsuario,
                idAutor: cancion[i].idAutor,
                titulo: e.target[0].value,
                detalles: e.target[1].value,
                anio: e.target[2].value,
                letra: letraArray,
                acordes: []
            }

            const objConfig = {
                method: 'PUT', // Método HTTP (Verbo) CREATE
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(update) // transforma un obj js en un string
            }
            const resultado = fetch('http://localhost:3000/cancion/' + cancion[i].id, objConfig)
            resultado
                .then(function (respuesta) {
                    console.log(respuesta)
                    console.log(respuesta.ok)
                    console.log(respuesta.status)
                    // console.log(respuesta.json())
                    return respuesta.json() // <= promesa
                })
                .then(function (modificada) {
                    console.log(modificada)
                    //window.location.href = 'profile.html'
                })
                .catch(function (err) {
                    console.error(err)
                })
        })
    }



    content.appendChild(table)
}