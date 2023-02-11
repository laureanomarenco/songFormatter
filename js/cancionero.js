// #TODO agregar lista de canciones
// #TODO Agregar modificar y eliminar canciones del cancionero
const userLogged = localStorage.getItem('isLoggin')

const url = new URLSearchParams(location.search)
const id = url.get('id')

const fetchUser = async () => {
    const aux = await fetch(`http://localhost:3000/usuario?nickname=` + userLogged)
    const user = await aux.json()
    return user
}

const aux = await fetchUser()
const user = aux[0]

const cancioneroUser = async () => {
    const aux = await fetch(`http://localhost:3000/cancionero/` + id)
    const cancioneros = await aux.json()
    return cancioneros
}


const cancionero = await cancioneroUser()


const $content = document.querySelector('body')

const $headgroup_cancioneros = document.createElement('hgroup')
$headgroup_cancioneros.classList.add('head')

const $titulo_cancioneros = document.createElement('h1')
$titulo_cancioneros.classList.add('titulo')
$titulo_cancioneros.innerHTML = cancionero.nombre
$headgroup_cancioneros.appendChild($titulo_cancioneros)


$content.appendChild($headgroup_cancioneros)


let canciones_cancionero = []
for(let i = 0 ; i < cancionero.canciones.length; i++) {
    const songsCancionero = async () => {
        const aux = await fetch(`http://localhost:3000/cancion/` + cancionero.canciones[i].id)
        const cancion = await aux.json()
        return cancion
    }
    const cancion = await songsCancionero();
    canciones_cancionero.push(cancion)
}

for(let i = 0 ; i < canciones_cancionero.length; i++){
    
}