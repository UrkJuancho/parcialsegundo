// Objeto inventario con información de productos
let inventario = {
    laptops: [
        { nombre: 'Hp', precio: 1000000 },
        { nombre: 'Asus ROG', precio: 1200000 },
        { nombre: 'iMac', precio: 1500000 }
    ],
    smartphones: [
        { nombre: 'Xiaomi', precio: 50000 },
        { nombre: 'Samsung', precio: 70000 },
        { nombre: 'Huawei', precio: 60000 }
    ],
    tablets: [
        { nombre: 'Motorola', precio: 30000 },
        { nombre: 'LG', precio: 40000 },
        { nombre: 'Sony', precio: 35000 }
    ]
};

// Función para calcular el precio promedio de una categoría
function calcularPrecioPromedio(categoria) {
    // Obtener productos de la categoría especificada
    const productos = inventario[categoria];
    // Calcular el total de precios de los productos en la categoría
    const totalPrecios = productos.reduce((total, producto) => total + producto.precio, 0);
    // Calcular el promedio dividiendo el total de precios por la cantidad de productos
    const promedio = totalPrecios / productos.length;
    // Retornar el promedio
    return promedio;
}

// Función para imprimir el mensaje de precio por encima o por debajo del promedio
function imprimirDiferenciaPrecio(categoria) {
    // Calcular el precio promedio de la categoría
    const promedio = calcularPrecioPromedio(categoria);
    // Obtener productos de la categoría especificada
    const productos = inventario[categoria];

    // Crear un mensaje para cada producto
    const mensaje = productos.map(producto => {
        if (producto.precio > promedio) {
            return `${producto.nombre} está por encima del precio promedio de ${categoria}.`;
        } else if (producto.precio < promedio) {
            return `${producto.nombre} está por debajo del precio promedio de ${categoria}.`;
        } else {
            return `${producto.nombre} tiene el precio promedio de ${categoria}.`;
        }
    }).join('<br>'); // Unir los mensajes con un salto de línea

    // Retornar el mensaje
    return mensaje;
}

// Función para agregar un nuevo producto a una categoría
function agregarProducto(categoria) {
    // Solicitar al usuario ingresar el nombre y el precio del producto
    const nombre = prompt('Ingrese el nombre del producto:');
    const precio = parseFloat(prompt('Ingrese el precio del producto:'));
    // Verificar si el precio ingresado es un número válido
    if (!isNaN(precio)) {
        // Agregar el nuevo producto al inventario
        inventario[categoria].push({ nombre, precio });
        // Actualizar la tabla y los mensajes de diferencia de precio
        actualizarTabla(categoria);
        actualizarMensajesDiferenciaPrecio(categoria);
    } else {
        // Mostrar un mensaje de error si el precio no es válido
        alert('Ingrese un precio válido.');
    }
}

// Función para actualizar la tabla de productos de una categoría
function actualizarTabla(categoria) {
    // Obtener la tabla HTML correspondiente a la categoría
    const table = document.getElementById(`${categoria}-table`);
    // Limpiar el contenido existente de la tabla
    table.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
        </tr>
    `;
    // Agregar filas a la tabla con el nombre y precio de cada producto
    inventario[categoria].forEach(producto => {
        table.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
            </tr>
        `;
    });
}

// Función para actualizar los mensajes de diferencia de precio de una categoría
function actualizarMensajesDiferenciaPrecio(categoria) {
    // Obtener el mensaje de diferencia de precio para la categoría
    const mensajeDiferencia = imprimirDiferenciaPrecio(categoria);
    // Actualizar el contenido HTML del elemento correspondiente a los mensajes de diferencia de precio
    document.getElementById(`${categoria}-messages`).innerHTML = `<p>${mensajeDiferencia}</p>`;
}

// Mostrar resultados en el HTML
for (let categoria in inventario) {
    // Obtener el mensaje de diferencia de precio para la categoría
    const mensajeDiferencia = imprimirDiferenciaPrecio(categoria);
    // Agregar contenido HTML para mostrar la categoría, la tabla de productos y los mensajes de diferencia de precio
    document.getElementById('output').innerHTML += `
        <div class="category-container">
            <h2>${categoria}</h2>
            <table id="${categoria}-table"></table>
            <div id="${categoria}-messages">
                <p>${mensajeDiferencia}</p>
            </div>
        </div>
    `;
    // Actualizar la tabla de productos para la categoría actual
    actualizarTabla(categoria);
}
