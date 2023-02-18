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
    const canciones = await aux.json()
    return canciones
}

const cancionero = await cancioneroUser()


const canciones_cancioneroUser = async () => {
    const aux = await fetch(`http://localhost:3000/cancion_cancionero?idCancionero=` + id)
    const canciones = await aux.json()
    return canciones
}


const cancionesIds = await canciones_cancioneroUser()


const $content = document.querySelector('body')

const $headgroup_cancioneros = document.createElement('hgroup')
$headgroup_cancioneros.classList.add('head')

const $titulo_cancioneros = document.createElement('h1')
$titulo_cancioneros.classList.add('titulo')
$titulo_cancioneros.innerHTML = cancionero.nombre
$headgroup_cancioneros.appendChild($titulo_cancioneros)


$content.appendChild($headgroup_cancioneros)


let canciones_cancionero = []
for (let i = 0; i < cancionesIds.length; i++) {
    const songsCancionero = async () => {
        const aux = await fetch(`http://localhost:3000/cancion/` + cancionesIds[i].idCancion)
        const cancion = await aux.json()
        return cancion
    }
    const cancion = await songsCancionero();
    canciones_cancionero.push(cancion)
}
console.log(canciones_cancionero);


const div = document.createElement('div')
$content.appendChild(div)
// ## CANCIONES DEL CANCIONERO ##

if (!canciones_cancionero.length) {
    const no_cancion = document.createElement('p')
    no_cancion.innerHTML = "Aun no tienes canciones agregadas"
    div.appendChild(no_cancion)
} else {

    const table = document.createElement('table')

    const thead = document.createElement('thead')
    const cancion_th = document.createElement('th')
    cancion_th.innerHTML = "Canción"
    thead.appendChild(cancion_th)

    table.appendChild(thead)
    for (let i = 0; i < canciones_cancionero.length; i++) {
        const tr_cancion = document.createElement('tr')
        const td_titulo = document.createElement('td')
        td_titulo.innerHTML = canciones_cancionero[i].titulo

        tr_cancion.appendChild(td_titulo)
        table.appendChild(tr_cancion)

        // Agregando botón delete
        const delete_btn = document.createElement('td')
        delete_btn.id = `${canciones_cancionero[i].canciones}`
        delete_btn.classList.add("delete")
        const a = document.createElement('a')
        //a.href = ``
        const icon = document.createElement('i')
        icon.classList.add("fa-regular")
        icon.classList.add("fa-trash-can")
        a.appendChild(icon)
        delete_btn.appendChild(a)
        tr_cancion.appendChild(delete_btn)

        delete_btn.addEventListener('click', function (e) {
            const cancionParaBorrar = cancionesIds[i].id
            console.log(cancionParaBorrar);

            let cancionesNew = canciones_cancionero.filter(e => e.id === cancionParaBorrar)
            canciones_cancionero = cancionesNew
            delete(canciones_cancionero[i])

            const objConfig = {
                method: 'DELETE', // Método HTTP (Verbo) CREATE
                headers: { 'Content-type': 'application/json' },
            }
            const resultado = fetch('http://localhost:3000/cancion_cancionero/' + cancionParaBorrar, objConfig)
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
                    window.location.href = 'cancionero.html?id='+cancionero.id
                })
                .catch(function (err) {
                    console.error(err)
                })
        })
    }

    div.appendChild(table)
}