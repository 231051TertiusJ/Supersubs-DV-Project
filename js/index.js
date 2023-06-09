displaySubs = () => {
    let monthSubs = document.getElementById('subOut');

    for(let i = 0; i < subData.length; i++){
            let name = subData[i].subName;
            let size = subData[i].subSize;
            let base = subData[i].subBase;
            let chops = subData[i].subChops;
            let price = subData[i].subPrice; 
    
        monthSubs.innerHTML += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text"><strong>Base:</strong> ${base}</p>
                <p class="card-text"><strong>Size:</strong> ${size}</p>
                <p class="card-text"><strong>Chops:</strong> ${chops.join(', ')}</p>
                <p class="card-text"><strong>Cost:</strong> R${price}.00</p>
            </div>
        </div>`
    
    }
}

let subOrder = [];

makeSub = () =>{

    let subTotal = 0;

    let subName = document.getElementById("subName").value;
    let size = document.getElementById("size").value;

    if(size === "Regular"){
        subTotal = subTotal + 20;
    } else if(size === "Large"){
        subTotal = subTotal + 40;
    } else if(size === "Jumbo"){
        subTotal = subTotal + 60;
    } else if(size === "Mountain"){
        subTotal = subTotal + 80;
    } 

          // Get Radio Options
    let baseOption = document.getElementsByName("baseRadio");
    let baseValue; 
    for(let i = 0; i < baseOption.length; i++){
        if(baseOption[i].checked){
            baseValue = baseOption[i].value
            subTotal = subTotal + +baseOption[i].dataset.cost
        }
    }

    let chopsOptions = document.getElementsByName("chops");
    let topArray = [];
    for(let i = 0; i < chopsOptions.length; i++){
        if(chopsOptions[i].checked){
            topArray.push(chopsOptions[i].value);
            subTotal = subTotal + +chopsOptions[i].dataset.cost
        }
    }

    subOrder.push({
        subName: subName,
        subSize: size,
        subBase: baseValue,
        subChops: topArray,
        subPrice: subTotal
    });

    console.log(subOrder)

    document.getElementById("realTimeCost").innerHTML = "R0.00"
    document.getElementById("subForm").reset();

}

realTimeCost = () => {

    realTimePrice = 0; 

    let size = document.getElementById("size").value;
    if(size === "Regular"){
        realTimePrice = realTimePrice + 20;
    } else if(size === "Large"){
        realTimePrice = realTimePrice + 40;
    } else if(size === "Jumbo"){
        realTimePrice = realTimePrice + 60;
    } else if(size === "Mountain"){
        realTimePrice = realTimePrice + 80;
    } 

    let baseOption = document.getElementsByName("baseRadio"); 
    for(let i = 0; i < baseOption.length; i++){
        if(baseOption[i].checked){
            realTimePrice = realTimePrice + +baseOption[i].dataset.cost
        }
    }

    let chopsOptions = document.getElementsByName("chops");
    for(let i = 0; i < chopsOptions.length; i++){
        if(chopsOptions[i].checked){
            realTimePrice = realTimePrice + +chopsOptions[i].dataset.cost
        }
    }

    document.getElementById("realTimeCost").innerHTML = "R" + realTimePrice + ".00"

}

displayOrder = () => {

    let area = document.getElementById("orders");
    let total = document.getElementById("orderTotal");

    area.innerHTML = "";

    let overallTotal = 0; 

    for(let i = 0; i < subOrder.length; i++){

        let name = subOrder[i].subName;
        let size = subOrder[i].subSize;
        let base = subOrder[i].subBase;
        let chops = subOrder[i].subToppings;
        let price = subOrder[i].subPrice; 

        overallTotal += price;

        area.innerHTML += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text"><strong>Base:</strong> ${base}</p>
                        <p class="card-text"><strong>Size:</strong> ${size}</p>
                        <p class="card-text"><strong>Chops:</strong> ${chops}</p>
                        <p class="card-text"><strong>Cost:</strong> R${price}.00</p>
                    </div>
                </div>`

        total.innerHTML = "R" + overallTotal + ".00"

    }
}

checkOut = () => {
    let data = JSON.stringify(subOrder)
    localStorage.setItem('order', data)
    window.location.href = 'checkout.html';
}