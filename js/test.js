const fetchProductos = async () => {
    const aux = await fetch('http://localhost:8080/api-rest-1.0-SNAPSHOT/api/productos')
    const productos = await aux.json()
    return productos
}

const productos = await fetchProductos();

console.log(productos);