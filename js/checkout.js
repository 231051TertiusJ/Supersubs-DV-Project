let checkTotal = 0;


displayCheck = () => {

    let data = JSON.parse(localStorage.getItem('order'));
    let items = document.getElementById('checkoutOrder');
    let totalArea = document.getElementById('totalOut');

    for(let i = 0; i< data.length; i++){
            let name = data[i].subName;
            let size = data[i].subSize;
            let base = data[i].subBase;
            let chops = data[i].subToppings;
            let price = data[i].subPrice;

            checkTotal += price;

            items.innerHTML += `
            <div class="orderLine">
                <p><strong>Name:</strong>${name}</p>
                <p><strong>Size:</strong>${size}</p>
                <p><strong>Base:</strong>${base}</p>
                <p><strong>Chops:</strong>${chops.join(', ')}</p>
                <p><strong>Price:</strong>${price}</p>
            </div>`

        totalArea.innerHTML = "R" + checkTotal + ".00"
    }


}

addDiscount = () => {
    //discount

}

resetReturn = () => {
    localStorage.removeItem('order');
    window.location.href = '../index.html';
}