const contenidoPrincipal= document.querySelector("#contenidoPrincipal")
const verCarrito=document.querySelector("#verCarrito")
const containerCarrito=document.querySelector("#containerCarrito")
const cantidadCarrito= document.querySelector("#count")

let carrito= JSON.parse(localStorage.getItem("carrito")) || []


const funcionAsync= async ()  =>{
const res = await fetch("scripts/productos.json")
const data = await res.json()
    data.forEach((prod)=>{
        let content = document.createElement("div");
      content.className = "card";
      content.innerHTML += `
        <img src="${prod.img}">
        <h2>${prod.nombre}</h2>
        <p class="desc">${prod.desc}</p>
        <p class="price">${prod.precio} $</p>
      `;
    
      contenidoPrincipal.append(content)
    
      let botonCompra= document.createElement("button")
      botonCompra.className= "botonCompra"
      botonCompra.innerText= "Agregar al carrito"
      content.append(botonCompra)
    
      botonCompra.addEventListener("click", () =>{
        const repeat = carrito.some((repeatProd) => repeatProd.id === prod.id)
        if (repeat){
          carrito.map((product) =>{
            if(product.id === prod.id){
              product.cantidad++
            }
          })
        }else{
        carrito.push({
          id: prod.id,
          img: prod.img,
          nombre: prod.nombre,
          precio: prod.precio,
          cantidad: prod.cantidad
          
        })
      }
      Toastify({

        text: `Agregaste ${prod.nombre} al carrito, su costo es de ${prod.precio}.`,

        duration: 1700
        
        }).showToast();
      sumarCarrito()
      saveLocal()
      })
    })
    
  }
  funcionAsync()



function pintarCarrito(){
  containerCarrito.innerHTML=""
  containerCarrito.style.display="flex"

  const headerCarrito= document.createElement("div")
  headerCarrito.className="headerCarrito"
  headerCarrito.innerHTML=`
  <h2 class="tituloCarrito">Carrito de compras</h2>
  `

  containerCarrito.append(headerCarrito)
  
  const botonCarrito=document.createElement("h2")
  botonCarrito.innerText="X"
  botonCarrito.className="botonX"

botonCarrito.addEventListener("click", () =>{
  containerCarrito.style.display ="none"
})
  headerCarrito.append(botonCarrito)
  

  carrito.forEach((prod)=>{
    const contenidoCarrito=document.createElement("div")
    contenidoCarrito.className= "contenidoCarrito"
    contenidoCarrito.innerHTML=`
    <img src="${prod.img}">
    <h3>${prod.nombre}</h3>
    <p>${prod.precio} $</p>
    <p>Cantidad: ${prod.cantidad}</p>
    <p>Total: ${prod.cantidad * prod.precio}</p>
    `

    containerCarrito.append(contenidoCarrito)
    const eliminar=document.createElement("span")
    eliminar.innerText="❌"
    eliminar.className="botonEliminar"
    contenidoCarrito.append(eliminar)
    eliminar.addEventListener("click", eliminarProd)
  })


  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);


  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `
  Total a pagar: ${total} $
  `;
  containerCarrito.append(totalBuying);

  
  const botonFinalizar= document.createElement("button")
  botonFinalizar.className= "botonFinalizar"
  botonFinalizar.innerText= "Finalizar la compra!"
  containerCarrito.append(botonFinalizar)
botonFinalizar.addEventListener("click", finalizarCompra)


  saveLocal()
}


verCarrito.addEventListener("click", pintarCarrito)



function eliminarProd(){
  const foundId = carrito.find((e) => e.id )

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId
  })
  pintarCarrito()
  saveLocal()
  sumarCarrito()
}




function finalizarCompra(){
  if(carrito.length !== 0){
    Swal.fire({
      icon: 'success',
      title: 'Felicidades! su compra se realizo con exito',
    })
}else{
  Swal.fire({
    icon: 'error',
    title: 'Por favor agregue elementos al carrito',
  })
}
containerCarrito.innerHTML=""
carrito = []
sumarCarrito()
saveLocal()
}



function sumarCarrito(){

  const carritoLength = carrito.length;
  
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}


const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};


sumarCarrito()