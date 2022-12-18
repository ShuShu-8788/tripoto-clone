let url = 'https://636a91d9c07d8f936da2035c.mockapi.io';

let edit_div = document.querySelector('#div-edit');     // Product edit parent div
let edit_form = document.querySelector('#edit-form')    // Product edit form
let section = document.querySelector('#section');       // here data is appended

let viewProductsPageBtn = document.querySelector('#products-page'); // show products
let viewUsersPageBtn = document.querySelector('#users-page');       // show users

let toggle = document.querySelector('#search-toggle');  // search selector
let search = document.querySelector('#search-data');    // search data
let searchBtn = document.querySelector('#search');      // search submit btn

let searchType = 'id';          // default search type
let searchData;                 // search content
let endpoint='/travelWaala';    // url api endpoint eg. www.example.com/endpoint

viewProductsPageBtn.addEventListener('click', function () {
    endpoint='/travelWaala';
    getProductsData();
})

viewUsersPageBtn.addEventListener('click', function (e) {
    endpoint='/users';
    getUsersData();
});

async function getUsersData() {
    let res = await fetch(url+endpoint);
    let data = await res.json();
    toggle.innerHTML = `
        <option value="id">ID</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="mobile">Mobile</option>
    `
    displayUsersData(data);
}


async function getProductsData() {
    let res = await fetch(url+endpoint);
    let data = await res.json();
    toggle.innerHTML = `
        <option value="id">ID</option>
        <option value="location">Location</option>
    `
    displayProductsData(data);
}

getProductsData();

edit_div.style.display = 'none';


//--------------------------------------------------------------------------

// display users data on #section

function displayUsersData(data) {
    section.innerText = null;
    data.forEach(ele => {
        let div = document.createElement('div');
        div.setAttribute('class', 'section-cards')
        let id = document.createElement('h3');
        id.innerText = 'User ID : ' + ele.id;
        let name = document.createElement('p');
        name.innerText = 'Name : ' + ele.name;
        let email = document.createElement('p');
        email.innerText = 'Email : ' + ele.email;
        let mobile = document.createElement('p');
        mobile.innerText = 'Mobile : ' + ele.mobile;
        let password = document.createElement('p');
        password.innerText = 'Password : ' + ele.password;
        let del = document.createElement('button');
        del.setAttribute('class', 'delete-btn');
        del.innerText = 'Delete';
        del.addEventListener('click', function (e) {
            e.preventDefault();
            fetch(`${url}${endpoint}/${ele.id}`, {
                method: 'DELETE'
            }).then(data => getUsersData())
        })
        section.append(div);
        div.append(id, name, mobile, email, password, del)
    });
}

function displayUserById(id) {
    fetch(`${url}${endpoint}/${id}`)
        .then(data => data.json())
        .then(ele => {
            section.innerText = null;
            let div = document.createElement('div');
            div.setAttribute('class', 'section-cards')
            let id = document.createElement('h3');
            id.innerText = 'User ID : ' + ele.id;
            let name = document.createElement('p');
            name.innerText = 'Name : ' + ele.name;
            let email = document.createElement('p');
            email.innerText = 'Email : ' + ele.email;
            let mobile = document.createElement('p');
            mobile.innerText = 'Mobile : ' + ele.mobile;
            let password = document.createElement('p');
            password.innerText = 'Password : ' + ele.password;
            let del = document.createElement('button');
            del.setAttribute('class', 'delete-btn');
            del.innerText = 'Delete';
            del.addEventListener('click', function (e) {
                e.preventDefault();
                fetch(`${url}${endpoint}/${ele.id}`, {
                    method: 'DELETE'
                }).then(data => getUsersData())
            })
            section.append(div);
            div.append(id, name, mobile, email, password, del)
        })
}
// display products on #section using forEach and append on Data.

function displayProductsData(data) {
    section.innerText = null;
    data.forEach(ele => {
        let div = document.createElement('div');
        div.setAttribute('class', 'section-cards')
        let img = document.createElement('img');
        img.src = ele.img;
        let id = document.createElement('h3');
        id.innerText = 'Product ID : ' + ele.id;
        let des = document.createElement('p');
        des.innerText = 'Product Description : ' + ele.discription.substring(1, 180) + '...';
        let price = document.createElement('p');
        price.innerText = 'Price : $ ' + ele.price;
        let location = document.createElement('p');
        location.innerText = 'Location : ' + ele.location;
        let div_btn=document.createElement('div');
        div_btn.setAttribute('class', 'div-for-btn')
        let edit = document.createElement('button');
        edit.setAttribute('class', 'edit-btn');
        edit.innerText = 'Edit';
        edit.addEventListener('click', function () {
            edit_form_data(ele)
        })
        let del = document.createElement('button');
        del.setAttribute('class', 'delete-btn');
        del.innerText = 'Delete';
        del.addEventListener('click', function (e) {
            e.preventDefault();
            fetch(`${url}${endpoint}/${ele.id}`, {
                method: 'DELETE'
            }).then(data => getProductsData())
        })
        section.append(div);
        div_btn.append(edit, del)
        div.append(img, id, location, price, des, div_btn)
    });
}

function displayProductById(id) {
    fetch(`${url}${endpoint}/${id}`)
        .then(data => data.json())
        .then(ele => {
            section.innerText = null;
            let div = document.createElement('div');
            div.setAttribute('class', 'section-cards')
            let img = document.createElement('img');
            img.src = ele.img;
            let id = document.createElement('h3');
            id.innerText = 'Product ID : ' + ele.id;
            let des = document.createElement('p');
            des.innerText = 'Product Description : ' + ele.discription.substring(1, 180) + '...';
            let price = document.createElement('p');
            price.innerText = 'Price : $ ' + ele.price;
            let location = document.createElement('p');
            location.innerText = 'Location : ' + ele.location;
            let edit = document.createElement('button');
            edit.setAttribute('class', 'edit-btn');
            edit.innerText = 'Edit';
            edit.addEventListener('click', function () {
                edit_form_data(ele)
            })
            let del = document.createElement('button');
            del.setAttribute('class', 'delete-btn');
            del.innerText = 'Delete';
            del.addEventListener('click', function (e) {
                e.preventDefault();
                fetch(`${url}${endpoint}/${ele.id}`, {
                    method: 'DELETE'
                }).then(data => getProductsData())
            })
            section.append(div);
            div.append(img, id, location, price, des, edit, del)
        })
}

// edit button eventlistener function.

function edit_form_data(ele) {
    edit_div.style.display = 'block';
    edit_form.img.value = ele.img;
    edit_form.description.value = ele.discription;
    edit_form.price.value = ele.price;
    edit_form.location.value = ele.location;
    edit_form.addEventListener('submit', async function (e) {
        e.preventDefault();
        let dataObj = { ...ele };

        dataObj.img = edit_form.img.value;
        dataObj.discription = edit_form.description.value;
        dataObj.price = edit_form.price.value;
        dataObj.location = edit_form.location.value;

        let response = await fetch(`${url}${endpoint}/${ele.id}`, {
            method: 'DELETE'
        })

        let res = await fetch(url+endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        })
        let data = await res.json();

        getProductsData()

        edit_div.style.display = 'none';
    })
}

//---------------------------------------------------------------------------

// Search functionality and sort functionality

toggle.addEventListener('change', function () {
    searchType = toggle.value; // get type of property to search
})

searchBtn.addEventListener('click', function (e) {
    searchData = search.value;
    if (endpoint == '/users') {
        if (searchType == 'id') {
            displayUserById(searchData)
        } else {
            fetch(`${url}${endpoint}?${searchType}=${searchData}`)
                .then(data => data.json())
                .then(data => displayUsersData(data))
        }
    } else {
        if (searchType == 'id') {
            displayProductById(searchData)
        } else {
            fetch(`${url}${endpoint}?${searchType}=${searchData}`)
                .then(data => data.json())
                .then(data => displayProductsData(data))
        }
    }


})


//----------------------------------------------------------------------------------------\

let logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', function(){
    localStorage.setItem('active-user', null);
    window.open('../index.html', '_self')
})

//---------------------------------------------------------------------------

// display data on #section using innerHTML property and temperal string

// function ProductsData(data){
//     section.innerHTML= `
//         ${data.map(item=>{
//             return renderAsCards(item.img, item.discription, item.price, item.location)
//         }).join(" ")}
//     `
// }

// function renderAsCards(img, des, price, location){
//     return `
//         <div id="section-cards">
//             <img src="${img}">
//             <h3>${location}</h3>
//             <p>${price}</p>
//             <p>${des}</p>
//             <button class="edit-btn">Edit</button>
//             <button class="delete-btn">Delete</button>
//         </div>
//     `
// }


//---------------------------------------------------------------------------

// For testing display property of edit-form working or not

// let view=document.querySelector('#view');
// let remove=document.querySelector('#remove');


// view.addEventListener('click', function(){
//     edit_form.style.display='block';
// })

// remove.addEventListener('click', function(){
//     edit_form.style.display='none';
// })

//---------------------------------------------------------------------------