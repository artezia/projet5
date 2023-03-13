let orderId = new URL(window.location.href).searchParams; 
const id = orderId.get('orderId');
// console.log(id);
function showOrderNumber(){ 
    let orderNumber = document.getElementById("orderId"); 
    orderNumber.innerText = id; 
    localStorage.clear(); 
};
showOrderNumber(); 