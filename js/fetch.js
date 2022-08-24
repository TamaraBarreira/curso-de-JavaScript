document.querySelector('#fetch').addEventListener('click', traer);
function traer(){
    fetch('tabla.json')
    .then( res => res.json())
    .then ( datos =>{
       // console.log(datos)
       tabla(datos)
    })
};

    function tabla(datos){
        //console.log(datos)
        contenido.innerHTML = ' '
        for( let valor of datos){
            //console.log(valor)
            contenido.innerHTML += `
                    <tr>
                        <th scope="row">${ valor.id }</th>
                        <td>${ valor.nombre }</td>
                        <td>${ valor.email }</td>
                        <td>${ valor.estado ? "Activo" : "Desactivado" }</td>
                      </tr>
            `
        }
    }