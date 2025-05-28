const seccion4 = document.querySelector('#insertar')
const url = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
let products = []
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : []
const bsOffcanvas = new bootstrap.Offcanvas('#staticBackdrop')
const loading = document.querySelector('#Loading')
const offcanvasBody = document.querySelector('.offcanvas-body')
const carritoIcono = document.querySelectorAll('#carritoIcono')
const cantidad = document.querySelectorAll('.cantidad')

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
            alert('Ha ocurrido algo en el proceso de obtener los resultados de  los productos, se recomienda recargar la página (no muchas veces seguidas) y si despúes de haber hecho esto la "ALERTA" persiste, informar al desarrollador o al encargado de dar mantenimiento a la pagina, para que se le pueda pueda dar una solución rápida y efectiva a este inconveniente. ')
            console.warn(error)
        })
        .finally(()=>{
            products = products.flat(2)
            console.log(products, 'products')
            renderizar()
            if(carrito.length == 0)
            {
                let CarritoVacio = document.createElement('p')
                CarritoVacio.className = 'text-white'
                CarritoVacio.textContent = 'No hay ningún producto añadido al carrito'
                offcanvasBody.appendChild(CarritoVacio)
            }
            else 
            {
                renderizarCarrito()
            }
        })
}

objenerProductos()
cantidad[0].innerText = carrito.length
cantidad[1].innerText = carrito.length

const crearHTMLCards = (producto) => {
    let contenedorCard = document.createElement('div')
    contenedorCard.className = "col-12 col-sm-6 col-lg-3 col-xl-3 my-2"

    let card = document.createElement('div')
    card.className = "card shadow h-100"
    
    let divImagen = document.createElement('div')
    divImagen.className = "position-relative d-flex"
    
    let imagen = document.createElement('img')
    imagen.src = producto.img
    imagen.className = "card-img-top h-100 object-fit-contain"
    imagen.alt = producto.name

    let boton = document.createElement('button')
    boton.className = "btn btn-light position-absolute"
    boton.style.borderRadius = '50%'
    boton.style.top = '5px'
    boton.style.right = '5px'
    boton.style.width = '40px'

    let corazon = document.createElement('i')
    corazon.className = 'bi bi-heart'

    boton.appendChild(corazon)
    divImagen.appendChild(imagen)
    divImagen.appendChild(boton)

    let cardBody = document.createElement('div')
    cardBody.className = "card-body d-flex flex-column justify-content-end"

    let cardTitle = document.createElement('h5')
    cardTitle.className = "card-title"
    cardTitle.textContent = producto.name
    
    let pPrecio = document.createElement('p')
    pPrecio.className = "text-adapted fw-bold fs-4"
    pPrecio.textContent = '$ '+producto.price

    let botonCarrito = document.createElement('button')
    botonCarrito.className = "btn btn-adapted w-100"
    botonCarrito.textContent = 'Añadir al carrito'

    botonCarrito.addEventListener('click', () => mostrarCarrito(producto.name))

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(pPrecio)
    cardBody.appendChild(botonCarrito)

    card.appendChild(divImagen)
    card.appendChild(cardBody)

    contenedorCard.appendChild(card)

    return contenedorCard
}

const contenidoCarrito = (producto) => {
    let contenedorCard = document.createElement('div')
    contenedorCard.className = "col-10 mx-auto"

    let card = document.createElement('div')
    card.className = "card shadow h-100 back-Cardrrito"

    let contenedorImagen = document.createElement('div')
    contenedorImagen.className = "position-relative"
    contenedorImagen.style.height = '200px'

    let imagen = document.createElement('img')
    imagen.src = producto.img
    imagen.className = "card-img-top h-100 object-fit-contain"
    imagen.alt - producto.name

    contenedorImagen.appendChild(imagen)

    let cardBody = document.createElement('div')
    cardBody.className = "card-body d-flex flex-column justify-content-between"

    let cardTitle = document.createElement('h5')
    cardTitle.className = "card-title"
    cardTitle.textContent = producto.name
    
    let pPrecio = document.createElement('p')
    pPrecio.className = "text-adapted fw-bold fs-4"
    pPrecio.textContent = '$ '+producto.price

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(pPrecio)

    card.appendChild(contenedorImagen)
    card.appendChild(cardBody)

    contenedorCard.appendChild(card)

    return contenedorCard
}

const renderizarCarrito = () => {
    offcanvasBody.innerHTML = ''
    carrito.forEach(item => {
        offcanvasBody.appendChild(contenidoCarrito(item))
    })
    cantidad[0].innerText = carrito.length
    cantidad[1].innerText = carrito.length
}

const renderizar = () => {
    seccion4.innerHTML = ''
    products.forEach(item => {
        seccion4.appendChild(crearHTMLCards(item))
    })
    loading.classList.add('d-none')
}

const mostrarCarrito = (nombre) => {
    let seleccionado = carrito.find(item => item.name == nombre) || products.find(item => item.name == nombre)
    carrito.includes(seleccionado) ? '' : carrito.push(seleccionado)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    renderizarCarrito()
    bsOffcanvas.show()
}

carritoIcono.forEach(item => {
    item.addEventListener('click', () => bsOffcanvas.show())
})

