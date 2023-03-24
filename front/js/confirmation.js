let orderId = new URL(window.location.href).searchParams; 
const id = orderId.get('orderId');
function showOrderNumber(){ 
    const orderNumber = document.getElementById("orderId"); 
    orderNumber.innerText = id; 
    localStorage.clear(); 
};
showOrderNumber(); 