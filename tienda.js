const seccion4 = document.querySelector('#insertar')
const url = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
let products = []
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : []
const bsOffcanvas = new bootstrap.Offcanvas('#staticBackdrop')
const loading = document.querySelector('#Loading')
const offcanvasBody = document.querySelector('.offcanvas-body')
const carritoIcono = document.querySelectorAll('#carritoIcono')
const cantidad = document.querySelector('#cantidad')

const objenerProductos = () => {
    fetch(url)
        .then(Response => Response.json())
        .then(response => {
            console.log(response)
            products.push(response.map(item => {
                let object = ({
                    name: item.title,
                    price: item.price,
                    img: item.images[0]
                })
                return object
            })) 
        })
        .catch(error => {
            console.warn(error)
        })
        .finally(()=>{
            products = products.flat(2)
            console.log(products, 'products')
            renderizar()
            renderizarCarrito()
        })
}

objenerProductos()



const crearHTML = (producto) => {
    return `
            <div class="col-12 col-sm-6 col-lg-3 col-xl-3 my-2">
                <div class="card shadow h-100">
                    <div class="position-relative" style="height: 240px;">
                        <img src="${producto.img}" class="card-img-top h-100 object-fit-contain" alt="${producto.name}">
                        <button class="btn btn-light position-absolute" style="border-radius: 50%; top: 5px; right: 5px; width: 40px; height: 40px;"><i class="bi bi-heart"></i></button>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${producto.name}</h5>
                        <p class="text-adapted fw-bold fs-4">$${producto.price}</p>
                        <button class="btn btn-adapted w-100" onclick="mostrarCarrito('${producto.name}')">Añadir al carrito</button>
                    </div>
                </div>
            </div>
    `
}

const contenidoCarrito = (producto) => {
    return `
    <div class="col-10 mx-auto">
        <div class="card shadow h-100">
            <div class="position-relative">
                <img src="${producto.img}" class="card-img-top h-100 object-fit-contain" alt="${producto.name}">
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${producto.name}</h5>
                <p class="text-adapted fw-bold fs-4">$${producto.price}</p>
            </div>
        </div>
    </div>
    `
}

const renderizarCarrito = () => {
    let contenido = ''
    carrito.forEach(item => {
        contenido += contenidoCarrito(item)
    })
    offcanvasBody.innerHTML = contenido
    cantidad.innerText = carrito.length
}

const renderizar = () => {
    let contenido = ''
    products.forEach(item => {
        contenido += crearHTML(item)
    })
    seccion4.innerHTML = contenido
    loading.classList.add('d-none')
}

const mostrarCarrito = (nombre) => {
    let seleccionado = carrito.find(item => item.name == nombre) || products.find(item => item.name == nombre)
    console.log(carrito, 'carrito')
    console.log(seleccionado)
    carrito.includes(seleccionado) ? alert('ya') : carrito.push(seleccionado)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderizarCarrito()
    bsOffcanvas.show()
}

carritoIcono.forEach(item => {
    item.addEventListener('click', () => bsOffcanvas.show())
})

