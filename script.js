// const btn = document.getElementById('foo');

// function hello(event) {
//     console.log(event);
// }

// btn.addEventListener('click', hello);

// const myLink = document.getElementById('myLink');

// function cancelLink(event) {
//     event.preventDefault();
//     alert('ah ah ah, you didn\'t say the magic word!');
// }

// myLink.addEventListener('click', cancelLink);

class Item {
    constructor(name, price, aisle, sku) {
        this.name = name;
        this.price = price;
        this.aisle = aisle;
        this.sku = sku;
    }

    getInfo() {
        return this.name + ": $" + this.price + ", aisle " + this.aisle;
    }
}

// let groceries = [
//     {name: 'bananas', price: 3.49, aisle: 1, sku: 52039},
//     {name: 'milk', price: 2.99, aisle: 4, sku: 24837},
//     {name: 'peanut butter', price: 3.99, aisle: 7, sku: 18563}
// ];
let groceries = [];

groceries.push(new Item('bananas', 3.49, 1, 52039));
groceries.push(new Item('milk', 2.99, 4, 24837));
groceries.push(new Item('peanut butter', 3.99, 7, 18563));
groceries.push(new Item('Pepsi', 2.49, 8, 12457));

const ul = document.getElementById('grocery-list');

function deleteItem(event) {
    let pe = event.target.parentElement,
        idx = Array.from(ul.children).indexOf(pe);

    groceries.splice(idx, 1);
    pe.remove();
    console.log(groceries.length);
}

function makeDeleteButton(li) {
    let btn = document.createElement('button');
    btn.innerHTML = 'Delete';
    btn.addEventListener('click', deleteItem);
    li.appendChild(btn);
}

function showInfo(nameLink, info) {
    nameLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert(info);
    });
}

function listItem(g) {
    let li = document.createElement('li');
    li.dataset.sku = g.sku;
    let nameLink = document.createElement('a');
    li.appendChild(nameLink);
    nameLink.innerHTML = g.name;
    nameLink.href = "#";
    makeDeleteButton(li);
    showInfo(nameLink, g.getInfo());
    ul.appendChild(li);
}

for (let g of groceries) {
    listItem(g);
}


// for (let i=0, ii=groceries.length; i<ii; i++) {
//     console.log(i, groceries[i])
// }

// let item = {
//     name: "bananas",
//     price: 3.49,
//     aisle: 1
// };

// for (x in item) {
//     console.log(x, item[x]);
// }