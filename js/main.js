// Home 
fetch('http://localhost:3000/cancion')
    .then(res => res.json())
    .then(cancion => {
        const table = document.querySelector('#body-table')

        for (let i = 0; i < cancion.length; i++) {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            const a = document.createElement('a')

            a.innerText = cancion[i].titulo
            td.appendChild(a)
            tr.appendChild(td)

            fetch('http://localhost:3000/autor')
                .then(res => res.json())
                .then(autor => {
                    for (let i = 0; i < autor.length; i++) {
                        const td = document.createElement('td')
                        const a = document.createElement('a')

                        a.innerText = autor[i].nombre
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
                })
        }
    })
