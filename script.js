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

const loadGroceries = false;
const form = document.getElementById('new-item-form');
const ul = document.getElementById('grocery-list');
const groceries = [];

const addItem = (g) => {
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

const deleteItem = (event) => {
    let pe = event.target.parentElement,
        idx = Array.from(ul.children).indexOf(pe);

    groceries.splice(idx, 1);
    pe.remove();
}

const makeDeleteButton = (li) => {
    let btn = document.createElement('button');
    btn.innerHTML = 'Delete';
    btn.addEventListener('click', deleteItem);
    li.appendChild(btn);
}

const showInfo = (nameLink, info) => {
    nameLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert(info);
    });
}

const onFormSubmit = (event) => {
    event.preventDefault();
    let sku = Math.floor(Math.random() * 100000),
        formData = new FormData(form),
        _name = formData.get('name'),
        _price = +formData.get('price'),
        _aisle = +formData.get('aisle'),
        g = new Item(_name, _price, _aisle, sku);

    groceries.push(g);
    addItem(g);
    form.reset();

    localStorage.removeItem('groceries');

    let storage = JSON.stringify(groceries);
    localStorage.setItem('groceries', storage);
}

form.addEventListener('submit', onFormSubmit);

if (loadGroceries) {
    fetch('groceries.json')
        .then((response) => response.json())
        .then((data) => {
            for (d of data) {
                let g = new Item(d.name, d.aisle, d.price, d.sku);
                groceries.push(g);
                addItem(g);
            }
        });
} else {
    let storage = localStorage.getItem('groceries');

    if (storage != null) {
        storage = JSON.parse(storage);
        for (s of storage) {
            const g = new Item(s.name, s.price, s.aisle, s.sku);
            groceries.push(g);
            addItem(g);
        }
    }
}