// ** HOME **
const fetchAll = async () => {
    // ** Renderiza tabla **
    const aux = await fetch('http://localhost:3000/cancion')
    const cancion = await aux.json()

    const aux2 = await fetch('http://localhost:3000/autor')
    const autor = await aux2.json()
    const table = document.querySelector('#body-table')

    for (let i = 0; i < cancion.length; i++) {
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        const a = document.createElement('a')

        a.innerText = cancion[i].titulo
        td.appendChild(a)
        tr.appendChild(td)

        for (let j = 0; j < autor.length; j++) {
            const td = document.createElement('td')
            const a = document.createElement('a')
            if (autor[j].idAutor === cancion[i].idAutor) {
                a.innerText = autor[j].nombre
            } else {
                a.innerText = "Desconocido"
            }
            td.appendChild(a)
            tr.appendChild(td)
            const td2 = document.createElement('td')
            const p = document.createElement('p')

            p.innerText = cancion[i].anio
            td2.appendChild(p)
            tr.appendChild(td2)

            const td3 = document.createElement('td')
            td3.classList.add("add")
            const a2 = document.createElement('a')

            a2.innerText = "+"
            td3.appendChild(a2)
            tr.appendChild(td3)
            table.appendChild(tr)
        }
    }
}

fetchAll();