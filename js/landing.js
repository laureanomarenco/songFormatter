const content = document.querySelector('#content')
// ## HEAD ##
const $headGroup = document.createElement('hgroup')
//title
const $headTitle = document.createElement('h1')
$headTitle.innerHTML = 'Song Formatter'
$headGroup.appendChild($headTitle)
//descripcion
const $headResumen = document.createElement('p')
$headResumen.innerHTML = 'Bienvenido a Song Formatter, aquí podrás explorar canciones, agregar las que quieras, y crear tus propios cancioneros con tus canciones favoritas. Registraté para disfrutar la experiencia completa o haz click para navegar'
$headGroup.appendChild($headResumen)

const $homeLink = document.createElement('a')
$homeLink.classList.add('home-link')
$homeLink.href ="src/home.html"

$homeLink.appendChild($headGroup)
content.appendChild($homeLink)


// ## LOGIN ##
const $loginDiv = document.createElement('div')
$loginDiv.classList.add('login-div')

const $loginForm = document.createElement('form')
const $loginTitle = document.createElement('h2')
$loginTitle.innerHTML = 'Ingresar'
$loginForm.appendChild($loginTitle)
//user
const $labelUser = document.createElement('label')
$labelUser.innerHTML = "Ingrese su usario"
$loginForm.appendChild($labelUser)
const $inputUser = document.createElement('input')
$loginForm.appendChild($inputUser)
//pass
const $labelPassword = document.createElement('label')
$labelPassword.innerHTML = "Ingrese su constraseña"
$loginForm.appendChild($labelPassword)
const $inputPassword = document.createElement('input')
$inputPassword.type = "password"
$loginForm.appendChild($inputPassword)
//submit
const $loginSubmit = document.createElement('button')
$loginSubmit.innerHTML = 'Ingresar'
$loginForm.appendChild($loginSubmit)
//register
const $registerLink = document.createElement('a')
$registerLink.classList.add('register-modal')
$registerLink.innerHTML = 'Registrarse'
$loginForm.appendChild($registerLink)

$loginDiv.appendChild($loginForm)

content.appendChild($loginDiv)

// modal register
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
$modal_desc.innerHTML = 'Registrate'
$content_div.appendChild($modal_desc)

const $registerForm = document.createElement('form')
$registerForm.classList.add('register-form')
//user
const $labelRegister = document.createElement('label')
$labelRegister.innerHTML = "Ingrese su usuario"
$registerForm.appendChild($labelRegister)
const $registerUser = document.createElement('input')
$registerForm.appendChild($registerUser)
//email
const $labelEmail = document.createElement('label')
$labelEmail.innerHTML = "Ingrese su email"
$registerForm.appendChild($labelEmail)
const $inputEmail = document.createElement('input')
$inputEmail.type = "email"
$registerForm.appendChild($inputEmail)
//pass
const $labelPassRegister = document.createElement('label')
$labelPassRegister.innerHTML = "Ingrese su constraseña"
$registerForm.appendChild($labelPassRegister)
const $registerPassword = document.createElement('input')
$registerPassword.type = "password"
$registerForm.appendChild($registerPassword)
//pass de vuelta
const $labelPasswordAgain = document.createElement('label')
$labelPasswordAgain.innerHTML = "Ingrese su constraseña nuevamente"
$registerForm.appendChild($labelPasswordAgain)
const $registerPasswordAgain = document.createElement('input')
$registerPasswordAgain.type = "password"
$registerForm.appendChild($registerPasswordAgain)
//submit
const $registerSubmit = document.createElement('button')
$registerSubmit.innerHTML = 'Registrate'
$registerForm.appendChild($registerSubmit)

$content_div.appendChild($registerForm)

$modal_div.appendChild($content_div)

content.appendChild($modal_div)



$registerLink.onclick = function() {
    $modal_div.style.display = "block";
}

$close_span.onclick = function() {
    $modal_div.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == $modal_div) {
      $modal_div.style.display = "none";
    }
}


// ## COMPROBANDO USER ##

const fetchUsers = async () => {
    const aux = await fetch('http://localhost:3000/usuario')
    const usuario= await aux.json()
    return usuario
}

const usuarios = await fetchUsers();

let isLoggin = false;

$loginForm.addEventListener('submit', function(e){
    e.preventDefault()
    usuarios.map(u => {
        if(u.nickname === e.target[0].value && u.password === e.target[1].value){
            isLoggin = true;
            localStorage.setItem('isLoggin', e.target[0].value);
            window.location.href = 'src/home.html'
            console.log("logeado correctamente");
        }
    })
    if(!isLoggin){
        localStorage.setItem('isLoggin', 'false');
        const error = document.createElement('p')
        error.classList.add('error')
        error.innerHTML = "Datos incorrectos"
        $loginForm.appendChild(error)
    }
})

// ## REGISTRANDO NUEVO USUARIO ##

$registerForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(e.target[2].value !== e.target[3].value){
        const passError = document.createElement('p')
        passError.classList.add('error')
        p.innerHTML = 'Las claves no coinciden'
        $registerForm.appendChild(passError)
    } else {
        const objPost = {
            id: (usuarios[usuarios.length-1].id + 1),
            nickname: e.target[0].value, 
            password: e.target[2].value,
            mail: e.target[1].value,
            img: null
        }

        const objConfig = {
            method: 'POST', // Método HTTP (Verbo) CREATE
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(objPost) // transforma un obj js en un string
        }
        const resultado = fetch('http://localhost:3000/usuario', objConfig)
        resultado
        .then(function(respuesta) {
            console.log(respuesta)
            console.log(respuesta.ok)
            console.log(respuesta.status)
            // console.log(respuesta.json())
            return respuesta.json() // <= promesa
        })
        .then(function(dataPostCreado) {
            console.log(dataPostCreado)
            const success = document.createElement('p')
            success.classList.add('success')
            success.innerHTML = 'Usuario creado exitosamente, ¡Ahora ingresá con el!'
            $registerForm.appendChild(success)
        })
        .catch(function(err) {
            console.error(err)
        })
        
    }
})