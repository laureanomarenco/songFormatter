
const userLogged = localStorage.getItem('isLoggin')

const fetchUser = async () => {
    const aux = await fetch(`http://localhost:8080/songApp-1.0-SNAPSHOT/api/usuarios/` + userLogged)
    const user = await aux.json()
    return user
}

const user = await fetchUser()

const songsUser = async () => {
    const aux = await fetch(`http://localhost:8080/songApp-1.0-SNAPSHOT/api/cancion?idUsuario=` + user.idUsuario)
    const cancion = await aux.json()
    return cancion
}

const autorSongs = async () => {
    const aux = await fetch(`http://localhost:3000/autor`)
    const autor = await aux.json()
    return autor
}

const cancionerosUser = async () => {
    const aux = await fetch(`http://localhost:3000/cancionero?idUser=` + user.idUsuario)
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

// modal edit usuario
const $modal_div_user = document.createElement('div')
$modal_div_user.classList.add('modal')

const $content_div_user = document.createElement('div')
$content_div_user.classList.add('modal-content')
$modal_div_user.appendChild($content_div_user)

const $close_edit_span = document.createElement('span')
$close_edit_span.classList.add('close')
$close_edit_span.innerHTML = "&times;"
$content_div_user.appendChild($close_edit_span)

const $modal_edit_desc = document.createElement('h1')
$modal_edit_desc.classList.add('modal-title')
$modal_edit_desc.innerHTML = 'Editar usuario'
$content_div_user.appendChild($modal_edit_desc)

const $userEditForm = document.createElement('form')
$userEditForm.classList.add('register-form')
//nickname
const $nicknameLabel = document.createElement('label')
$nicknameLabel.innerHTML = "Nickname"
$userEditForm.appendChild($nicknameLabel)
const $editUserNickname = document.createElement('input')
$editUserNickname.classList.add('input-modal')
$editUserNickname.value = user.nickname
$userEditForm.appendChild($editUserNickname)
//mail
const $mailLabel = document.createElement('label')
$mailLabel.innerHTML = "Mail"
$userEditForm.appendChild($mailLabel)
const $editUserMail = document.createElement('input')
$editUserMail.classList.add('input-modal')
$editUserMail.value = user.mail
$userEditForm.appendChild($editUserMail)
//password
const $passwordLabel = document.createElement('label')
$passwordLabel.innerHTML = "Password"
$userEditForm.appendChild($passwordLabel)
const $editUserPassword = document.createElement('input')
$editUserPassword.classList.add('input-modal')
$editUserPassword.type = "password"
$editUserPassword.value = user.password
$userEditForm.appendChild($editUserPassword)
//password otra vez
const $password2Label = document.createElement('label')
$password2Label.innerHTML = "Ingrese password nuevamente"
$userEditForm.appendChild($password2Label)
const $editUserPassword2 = document.createElement('input')
$editUserPassword2.classList.add('input-modal')
$editUserPassword2.type = "password"
$editUserPassword2.value = user.password
$userEditForm.appendChild($editUserPassword2)
//submit
const $editSubmit = document.createElement('button')
$editSubmit.classList.add('boton')

$editSubmit.classList.add('btn-modal')
$editSubmit.innerHTML = 'Modificar datos'
$userEditForm.appendChild($editSubmit)

$content_div_user.appendChild($userEditForm)

$modal_div_user.appendChild($content_div_user)

content.appendChild($modal_div_user)

edit.onclick = function () {
    $modal_div_user.style.display = "block";
}

$close_edit_span.onclick = function () {
    $modal_div_user.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == $modal_div) {
        $modal_div_user.style.display = "none";
    }
}
head.classList.add('head')


// edit listener
$userEditForm.addEventListener('submit', function (e) {

    if (e.target[2].value === e.target[3].value) {

        const objPut = {
            nickname: e.target[0].value,
            mail: e.target[1].value,
            password: e.target[2].value
        }

        const objConfig = {
            method: 'PUT', // Método HTTP (Verbo) CREATE
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(objPut) // transforma un obj js en un string
        }
        const resultado = fetch('http://localhost:8080/songApp-1.0-SNAPSHOT/api/usuarios/' + user.idUsuario, objConfig)
        resultado
            .then(function (respuesta) {
                console.log(respuesta)
                console.log(respuesta.ok)
                console.log(respuesta.status)
                // console.log(respuesta.json())
                // return respuesta.json() // <= promesa
            })
            .then(function (dataPostCreado) {
                console.log(dataPostCreado)
                alert('Usuario actualizado exitosamente')
                //window.location.href = "profile.html"
            })
            .catch(function (err) {
                console.error(err)
            })
    } else {
        alert('Las claves no coinciden')
    }
})


const $dataDiv = document.createElement('div')
$dataDiv.classList.add('data-div')

const h1 = document.createElement('h1')
h1.classList.add('title')
h1.innerHTML = "Usuario"
$dataDiv.appendChild(h1)

const username = document.createElement('p')
username.innerHTML = "Username: " + user.nickname
$dataDiv.appendChild(username)

const mail = document.createElement('p')
mail.innerHTML = "Mail: " + user.mail
$dataDiv.appendChild(mail)

const password = document.createElement('p')
password.innerHTML = "Password: *******"
$dataDiv.appendChild(password)

head.appendChild($dataDiv)
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
$registerUser.classList.add('input-modal')
$cancioneroForm.appendChild($registerUser)
//submit
const $registerSubmit = document.createElement('button')
$registerSubmit.classList.add('boton')

$registerSubmit.classList.add('btn-modal')
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
        idUser: user.idUsuario,
    }

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
        aTitulo.href = `song.html?id=${cancion[i].idCancion}`
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
        td3.id = `${cancion[i].idCancion}`
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
            const resultado = fetch('http://localhost:8080/songApp-1.0-SNAPSHOT/api/cancion/' + cancionParaBorrar, objConfig)
            resultado
                .then(function (respuesta) {
                    console.log(respuesta)
                    console.log(respuesta.ok)
                    console.log(respuesta.status)
                    // console.log(respuesta.json())
                    // return respuesta.json() // <= promesa
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
        $input_letra.value = cancion[i].letra
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
            //let letraArray = e.target[3].value.split(/\n/)

            const update = {
                idUsuario: cancion[i].idUsuario,
                idAutor: cancion[i].idAutor,
                titulo: e.target[0].value,
                detalles: e.target[1].value,
                anio: e.target[2].value,
                letra: e.target[3].value,
            }

            const objConfig = {
                method: 'PUT', // Método HTTP (Verbo) CREATE
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(update) // transforma un obj js en un string
            }
            const resultado = fetch('http://localhost:8080/songApp-1.0-SNAPSHOT/api/cancion/' + cancion[i].idCancion, objConfig)
            resultado
                .then(function (respuesta) {
                    console.log(respuesta)
                    console.log(respuesta.ok)
                    console.log(respuesta.status)
                    // console.log(respuesta.json())
                    // return respuesta.json() // <= promesa
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