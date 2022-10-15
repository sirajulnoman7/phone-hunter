
const phoneHuntLoad = (search, dataLimit) => {

    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data, dataLimit))

}

const displayPhone = (phones, dataLimit) => {
    const phoneItems = document.getElementById('phone-items');
    phoneItems.innerHTML = ``;
    // slice a all items 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // not for found a type a wrong search 
    const notFound = document.getElementById('not-found');
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none')
    }
    // phone items 
    phones.forEach(phone => {
        // console.log(phone)
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `

        <divclass="card h-100">
        <img src="${phone.image}" class="card-img-top p-4" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
        </div>
        <button onclick="showDatails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDatailModal">Show Datails</button>
       </div>

          `;
        phoneItems.appendChild(createDiv);



    });
    // stop toggle spiner 
    toggleSpiner(false);
}

// search and show all 2 functional function 
const processSearch = (dataLimit) => {

    toggleSpiner(true);
    const fieldElement = document.getElementById('search-feald');
    const fieldValue = fieldElement.value;
    phoneHuntLoad(fieldValue, dataLimit);
}
// btn search click 
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);



});
// search input field enter key handlers 
document.getElementById('search-feald').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});




// star toggle spiner 
const toggleSpiner = isLoading => {
    const loader = document.getElementById('loader-spiner');
    if (isLoading) {

        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none')
    }

}

// show all btn 

document.getElementById('show-all-btn').addEventListener('click', function () {

    processSearch();


})

// show datails btn 
const showDatails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDatails(data.data);
}

const displayPhoneDatails = phoneDatails => {

    console.log(phoneDatails);
    const modalPhoneTitale = document.getElementById('phoneModalLabel');
    modalPhoneTitale.innerText = phoneDatails.name;
    const modalBody = document.getElementById('modal-body-container');
    modalBody.innerHTML = `
    <img  src="${phoneDatails.image}" alt="">
    <p>Brand: ${phoneDatails.brand}</p>
    <p>Release Date: ${phoneDatails.releaseDate ? phoneDatails.releaseDate : 'no release date'}</p>
    <p>Main Feature: ${phoneDatails.mainFeatures.storage ? phoneDatails.mainFeatures.storage : 'Not Found'}</p>
    <p>Display Size: ${phoneDatails.mainFeatures.displaySize}</p>
    <p>Memory: ${phoneDatails.mainFeatures.memory}</p>
    `
}

// phoneHuntLoad();