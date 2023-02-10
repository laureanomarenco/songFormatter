const body = document.querySelector('body')

const isLoggin = localStorage.getItem('isLoggin')

const $nav = document.createElement('nav')

const $inicio = document.createElement('a')
$inicio.classList.add('inicio')
$inicio.href = "home.html"
$inicio.innerHTML = "Inicio"

$nav.appendChild($inicio)

const $title = document.createElement('h1')
$title.classList.add('title')
$title.innerHTML = 'Song Formatter'

$nav.appendChild($title)

if (isLoggin) {
    const $profile = document.createElement('a')
    $profile.classList.add('menu')
    const $icon = document.createElement('i')
    $icon.classList.add('fa-regular')
    $icon.classList.add('fa-user')

    $profile.appendChild($icon)
    $nav.appendChild($profile)
    // modal user
    const modal_div = document.createElement('div')
    modal_div.classList.add('modal-user')

    const content_div = document.createElement('div')
    content_div.classList.add('modal-content-user')

    const close_span = document.createElement('span')
    close_span.classList.add('close-menu')
    close_span.innerHTML = "&times;"
    content_div.appendChild(close_span)

    const link_modal = document.createElement('a')
    link_modal.classList.add('modal-link-user')
    link_modal.innerHTML = "Perfil"
    link_modal.href = 'profile.html'
    content_div.appendChild(link_modal)

    // const link_cancioneros = document.createElement('a')
    // link_cancioneros.classList.add('modal-link-user')
    // link_cancioneros.innerHTML = "Nuevo Cancionero"
    // link_cancioneros.href = 'nuevoCancionero.html'
    // content_div.appendChild(link_cancioneros)

    
    const link_cancion = document.createElement('a')
    link_cancion.classList.add('modal-link-user')
    link_cancion.innerHTML = "Nueva Cancion"
    link_cancion.href = 'create-song.html'
    content_div.appendChild(link_cancion)

        
    const cerrar_session = document.createElement('a')
    cerrar_session.classList.add('modal-link-user')
    cerrar_session.innerHTML = "Cerrar Sesión"
    content_div.appendChild(cerrar_session)

    modal_div.appendChild(content_div)

    $nav.appendChild(modal_div)

    $profile.onclick = function () {
        modal_div.style.display = "flex";
    }

    close_span.onclick = function () {
        modal_div.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal_div) {
            modal_div.style.display = "none";
        }
    }

    cerrar_session.onclick = function () {
        localStorage.clear();
        window.location.href = 'home.html'
    }
} else {
    const $logearse = document.createElement('a')
    $logearse.classList.add('menu')
    $logearse.href = '../index.html'
    $logearse.innerHTML = 'Ingresar'
    $nav.appendChild($logearse)
}




body.appendChild($nav)





{/* <nav>
<a href="index.html" class="inicio">Inicio</a>
<h1 class="title">Song Formatter</h1>

<a href="src/profile.html" class="menu"><i class="fa-regular fa-user"></i></a>
</nav> */}