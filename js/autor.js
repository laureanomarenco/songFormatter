let url = new URLSearchParams(location.search)
const id = url.get('id')

const fetchAutor = async () => {
    const aux = await fetch(`http://localhost:3000/autor?idAutor=${id}`)
    const autor = await aux.json()
    return autor
}

const autorFetched = await fetchAutor();
const autor = autorFetched[0];

console.log(autor);

const body = document.querySelector(".box")

const head = document.createElement('hgroup')
head.classList.add("head-autor")

const h1 = document.createElement('h1')
h1.classList.add("title")
h1.innerHTML = autor.nombre
head.appendChild(h1)

const img = document.createElement('img')
img.src = autor.img
head.appendChild(img)

const desc = document.createElement('p')
desc.classList.add("photo-description")
desc.innerHTML = autor.resumen
head.appendChild(desc)

body.appendChild(head)

const parrafo = document.createElement('div')
parrafo.classList.add('paragraph')
body.appendChild(parrafo)

const p = document.createElement('p')
p.classList.add('history')
p.innerHTML = autor.detalle
body.appendChild(p)



{/* <hgroup class="head-autor">
            <h1 class="title">Simon & Garfunkel</h1>
            <img src="img/simonandGarfunkel.jpg" alt="Simon and Garfunkel en concierto">
            <p class="photo-description">Simon & Garfunkel fue un dúo de folk rock compuesto por Paul Simon y Arthur "Art" Garfunkel. Simon y Garfunkel fueron uno de los grupos musicales más populares durante la década de 1960. Algunas de sus canciones más conocidas son «The Sound of Silence», «Mrs. Robinson» y «Bridge over Troubled Water»</p>
        </hgroup>
        <div class="paragraph">
            <p class="history">Simon y Garfunkel se conocieron en la escuela primaria en Queens, Nueva York, en 1953, donde aprendieron a armonizar juntos y comenzaron a escribir canciones. En 1957, bajo el nombre Tom & Jerry, los adolescentes tuvieron un éxito menor con "Hey Schoolgirl", una canción que imitaba a sus ídolos, los Everly Brothers.2​ En 1963, durante un período de creciente interés por la música folk en Estados Unidos, firmaron un contrato con Columbia Records (hoy Sony) como Simon & Garfunkel. Su álbum debut, Wednesday Morning, 3 A.M. se vendió mal y el grupo se disolvió. Simon emprendió una carrera en solitario, esta vez en Inglaterra.3​ En junio de 1965, una nueva versión de "The Sound of Silence" apilada con guitarra eléctrica y batería se convirtió en un gran éxito, alcanzando el número uno en Estados Unidos. El dúo se reunió para lanzar un segundo álbum de estudio, Sounds of Silence y recorrió universidades en todo el país. En su tercer lanzamiento, Parsley, Sage, Rosemary and Thyme (1966), el dúo asumió un mayor control creativo. Su música apareció en la película de 1967 El graduado. Su siguiente álbum, Bookends (1968), encabezó la lista Billboard 200 e incluyó el sencillo "Mrs. Robinson" de la película, que alcanzó también el número uno.4​

                La relación a menudo inestable del dúo llevó a desacuerdos artísticos que terminaron en su ruptura en 1970. Su último álbum de estudio, Bridge over Troubled Water, fue lanzado en enero de ese año, convirtiéndose en su lanzamiento más exitoso y uno de los álbumes más vendidos de la historia.5​ Después de su ruptura, Simon lanzó varios álbumes aclamados, incluido Graceland de 1986. Garfunkel tuvo éxitos en solitario como "All I Know" y brevemente siguió una carrera como actor, con papeles principales en películas como Catch-22, Conocimiento carnal y Contratiempo. El dúo se ha reunido en varias ocasiones, la más famosa en 1981 para The Concert in Central Park en Nueva York, que atrajo a más de 500 000 personas.6​ Simon & Garfunkel ganaron diez premios Grammy, y fueron incluidos en el Salón de la Fama del Rock and Roll en 1990.7​ Richie Unterberger los describió como "el dúo de folk-rock más exitoso de la década de 1960". Se encuentran entre los artistas musicales más vendidos, con más de 100 millones de discos</p>
        </div> */}