let url = 'https://636a91d9c07d8f936da2035c.mockapi.io';

let edit_div = document.querySelector('#div-edit');     // Product edit parent div
let edit_form = document.querySelector('#edit-form')    // Product edit form
let section = document.querySelector('#section');       // here data is appended

let add_div = document.querySelector('#div-add');
let add_form = document.querySelector('#add-form');
let add_prod_btn = document.querySelector('#add-product-btn');

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
    add_prod_btn.style.display='block';
    getProductsData();
})

viewUsersPageBtn.addEventListener('click', function (e) {
    endpoint='/users';
    add_prod_btn.style.display='none';
    getUsersData();
});

add_prod_btn.style.display='block';

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
add_div.style.display = 'none';

//------------------------------------------------------------------------------------------------------------

// Event listener for add product button.

add_prod_btn.addEventListener('click', function(){
    add_div.style.display = 'block';
});

// Event listener for product form submit.

add_form.addEventListener('submit', async function(e){
    e.preventDefault();

    let dataObj = {};

    dataObj.img = add_form.add_img.value;
    dataObj.discription = add_form.add_description.value;
    dataObj.price = add_form.add_price.value;
    dataObj.location = add_form.add_location.value;

    let res = await fetch(url+'/travelWaala', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    })
    let data = await res.json();

    getProductsData()

    alert('Package added to website sucessfully')

    add_div.style.display = 'none';
})


//------------------------------------------------------------------------------------------------------------

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
            }).then(data => { 
                alert('Account Deleted Sucessfully');
                getUsersData()
            })
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
                }).then(data => { 
                    alert('Account Deleted Sucessfully');
                    getUsersData()
                })
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
            }).then(data => { 
                alert('Package Deleted Sucessfully');
                getProductsData();
            })
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
                }).then(data => { 
                    alert('Package Deleted Sucessfully');
                    getProductsData();
                })
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

        alert('Package Edited Sucessfully');

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