const fetchAutores = async () => {
    const aux2 = await fetch('http://localhost:3000/autor')
    const autor = await aux2.json()
    return autor
}

const autores = await fetchAutores();

const content = document.querySelector('main')

// ################ HEADER ##################
const $hgroup = document.createElement('hgroup')
$hgroup.classList.add('head')

const $title_form = document.createElement('h1')
$title_form.classList.add('title')
$title_form.innerHTML = 'Agrega una canción'
$hgroup.appendChild($title_form)

// const $subtitle = document.createElement('p')
// $subtitle.innerHTML = 'Canción'
// $hgroup.appendChild($subtitle)

content.appendChild($hgroup)

// ############### FORM ###################
const $form = document.createElement('form')
$form.method = 'POST'

const $titulo_input = document.createElement('input')
$titulo_input.classList.add('input-titulo')
$titulo_input.type = 'text'
$titulo_input.name = 'titulo'
$titulo_input.placeholder = 'Titulo de la canción'
$form.appendChild($titulo_input)


const $autor_select = document.createElement('select')
$autor_select.classList.add('select-autor')
$autor_select.name = 'autor'
$autor_select.placeholder = 'Autor de la canción'
for(let i = 0 ; i < autores.length; i++){
    const $select_option = document.createElement('option')
    $select_option.innerHTML = autores[i].nombre
    $autor_select.appendChild($select_option)
}
$form.appendChild($autor_select)

const $descripcion_input = document.createElement('input')
$descripcion_input.classList.add('input-descripcion')
$descripcion_input.type = 'text'
$descripcion_input.name = 'descripcion'
$descripcion_input.placeholder = 'Descripcion de la canción'
$form.appendChild($descripcion_input)

const $anio = document.createElement('input')
$anio.classList.add('input-anio')
$anio.type = 'text'
$anio.name = 'anio'
$anio.placeholder = 'Año de publicación de la canción'
$form.appendChild($anio)

const $letra_textarea = document.createElement('textarea')
$letra_textarea.name = 'letra'
$letra_textarea.classList.add('textarea-letra')
$letra_textarea.rows = '20'
$letra_textarea.cols = '80'
$letra_textarea.placeholder = 'Letra de la canción \n\n Te recomendamos escribir por versos \ny dejando un espacio entre parrafos.'
$form.appendChild($letra_textarea)

const $submit_letra = document.createElement('button')
$submit_letra.classList.add('boton')
$submit_letra.type = 'submit'
$submit_letra.innerHTML = 'Enviar'
$form.appendChild($submit_letra)

content.appendChild($form)


// ######### GET USER y CANCIONES #########

const userLogged = localStorage.getItem('isLoggin')

const fetchUser = async () => {
    const aux = await fetch(`http://localhost:3000/usuario?nickname=` + userLogged)
    const user = await aux.json()
    return user
}

const fetchCanciones = async () => {
    const aux = await fetch('http://localhost:3000/cancion')
    const cancion = await aux.json()
    return cancion
}



const cancion = await fetchCanciones();

const aux = await fetchUser()
const user = aux[0]

// ######### POST CANCION ##########
$form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e);
    
    let nombreAutor = e.target[1].value

    const autor = autores.filter(e => e.nombre === nombreAutor)
    console.log(autor);
    let letraArray =  e.target[4].value.split(/\n/)


    const objPost = {
        id: (cancion[cancion.length - 1].id + 1),
        idUsuario: user.id,
        idAutor: autor[0].id,
        titulo: e.target[0].value,
        detalles: e.target[2].value,
        anio: e.target[3].value,
        letra: letraArray
    }

    const objConfig = {
        method: 'POST', // Método HTTP (Verbo) CREATE
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(objPost) // transforma un obj js en un string
    }
    const resultado = fetch('http://localhost:3000/cancion', objConfig)
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
            alert('Canción creada exitosamente')
            window.location.href = "profile.html"
        })
        .catch(function (err) {
            console.error(err)
        })


})