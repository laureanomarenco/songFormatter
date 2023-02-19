const url = new URLSearchParams(location.search)
const id = url.get('id')

const fetchCancion = async () => {
    const aux = await fetch(`http://localhost:8080/songApp-1.0-SNAPSHOT/api/cancion/${id}`)
    const cancion = await aux.json()
    return cancion
}

const cancion = await fetchCancion();


const fetchAutor = async () => {
    const aux = await fetch(`http://localhost:3000/autor?id=${cancion.idAutor}`)
    const autor = await aux.json()
    return autor
}
const autorFetched = await fetchAutor();
const autor = autorFetched[0];


const body = document.querySelector(".box")

// ### HEAD ###
const head = document.createElement('hgroup')
head.classList.add("head")

const h1 = document.createElement('h1')
h1.classList.add("song-title")
h1.innerHTML = cancion.titulo
head.appendChild(h1)

const desc = document.createElement('p')
desc.classList.add("description")
desc.innerHTML = cancion.detalles
head.appendChild(desc)

const sub = document.createElement('em')
sub.classList.add("sub-title")
sub.innerHTML = `Por ${autor.nombre} en el año ${cancion.anio}`
head.appendChild(sub)

body.appendChild(head)

const hr = document.createElement('hr')
body.appendChild(hr)


// ### LETRA ###
const letraString = cancion.letra.replace(/\n/g, "<br />")

const line = document.createElement('p')
line.classList.add("line")
line.innerHTML = letraString
body.appendChild(line);



{/* <hgroup class="head">
<h1 class="title">The song of silence</h1>
<p class="description">Canción dedicada a las sensaciones posteriores al asesinato del presidente estadounidense Jhon F. Kennedy, haciendo referencia al atronador silencio que se sintió en la multitud que presenció el disparo</p>
<em class="sub-title">Por Simon & Garfunken en el año 1968</em>
</hgroup>
<div id="body-table"></div>
<script type="module" src="../js/song.js"></script> -->
<!-- <div class="paragraph">
<p class="line">Hello darkness, my old friend</p>
<p class="line">I've come to talk with you again</p>
<p class="line">Because a vision softly creeping</p>
<p class="line">Left its seeds while I was sleeping</p>
<p class="line">And the vision that was planted in my brain</p>
<p class="line">Still remains</p>
<p class="line">Within the sound of silence</p>
</div> */}