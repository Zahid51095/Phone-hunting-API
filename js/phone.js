const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    // step-1

    const phoneContainer = document.getElementById('phone-container');

    // clear phone container before adding new cards
    phoneContainer.textContent = '';

    // display show all button on some condition
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);

    // display only first 12 phones if not showAll
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone);

        // step-2- create a div (daisy theke je card ta anci oitai design kora abar)
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4  bg-base-100 shadow-xl';
        // step-3 - set innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn  bg-blue-400 text-white">Show Details</button>
          </div>
        </div>
        
        `

        // step-4 - append child
        phoneContainer.appendChild(phoneCard);

    });

    // hide loading spinner
    toggleLoadingSpinner(false);

}

// 
const handleShowDetail = async (id) =>{
    // console.log('clicked show details', id);
    // load single phone data
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    // show the modal
    show_details_modal.showModal();
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone?.others?.GPS}</p>
        <p><span>Sensors:</span>${phone?.mainFeatures?.sensors}</p>
        <p><span>Release Date:</span>${phone?.releaseDate}</p>
        
    
    `
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () => {
    handleSearch(true);

}

// loadPhone();