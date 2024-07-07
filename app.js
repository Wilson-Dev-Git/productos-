window.onload = () => {
    getCategorias();
}

// Obtener y mostrar categorías como botones
const getCategorias = async () => {
    await fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        mostrarCategorias(data);
    }).catch(error => {
        console.log(error);
    })
}

const mostrarCategorias = (categorias = []) => {
    let html = '';
    categorias.forEach(categoria => {
        html += `<button class="btn btn-sm btn-primary m-1" onclick="getProductos('${categoria.replace("'", "\\'")}')">${categoria}</button>`;
    });
    const sectionCategorias = document.getElementById('categorias');
    sectionCategorias.innerHTML = html;
}

// Obtener y mostrar productos de la categoría seleccionada
const getProductos = async (categoria) => {
    await fetch(`https://fakestoreapi.com/products/category/${categoria}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        tarjetaProductos(data);
    }).catch(error => {
        console.log(error);
    })
}

const tarjetaProductos = (productos = []) => {
    let html = '';
    productos.forEach(({ category, description, id, price, stock, tax, image, title }) => {
        html += `
            <div class="col-md-4 col-lg-3">
                <div class="card" style="width: 18rem;">
                    <img src="${image}" class="card-img-top product-img" alt="${title}">
                    <div class="card-body">
                        <h4 class="card-title">${title}</h4>
                        <h5 class="card-subtitle">${category}</h5>
                        <p class="card-text">${description}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><b>Precio: </b>$${price}</li>
                            <li class="list-group-item"><b>Stock: </b>${stock}</li>
                            <li class="list-group-item"><b>Impuesto: </b>${tax}%</li>
                        </ul>
                        <button onclick="getProducto(${id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Ver Producto
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    const sectionProducts = document.getElementById('productos');
    sectionProducts.innerHTML = html;
}

const getProducto = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showProducto(data);
    }).catch(error => {
        console.log(error);
    })
}

const showProducto = ({ category, description, price, stock, tax, image, title }) => {
    const srcImg = document.querySelector('.modal img');
    srcImg.src = image;

    const titleText = document.querySelector('.modal .card-title');
    titleText.textContent = title;

    const subtitleText = document.querySelector('.modal .card-subtitle');
    subtitleText.textContent = category;

    const descText = document.querySelector('.modal .card-text');
    descText.textContent = description;

    const listCategoria = document.getElementById('categoria');
    listCategoria.textContent = category;

    const listPrecio = document.getElementById('precio');
    listPrecio.textContent = `$${price}`;

    const listStock = document.getElementById('stock');
    listStock.textContent = stock;

    const listImpuesto = document.getElementById('impuesto');
    listImpuesto.textContent = `${tax}%`;
}
