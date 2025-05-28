const seccion4 = document.querySelector('#insertar')
const url = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
let products = []
const loading = document.querySelector('#Loading')


const objenerProductos = () => {
    fetch(url)
        .then(Response => Response.json())
        .then(response => {
            products.push(response.map(item => {
                let object = ({
                    name: item.title,
                    price: item.price,
                    img: item.category.image, 
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
                        <button class="btn btn-adapted w-100">Añadir al carrito</button>
                    </div>
                </div>
            </div>
    `
}

const renderizar = () => {
    let contenido = ''
    products.forEach(item => {
        contenido += crearHTML(item)
    })
    seccion4.innerHTML = contenido
    loading.classList.add('d-none')
}


