const loadPhone = async () =>{
    const res = await fetch (' https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {

    // step-1

    const phoneContainer = document.getElementById('phone-container');


    phones.forEach(phone => {
        console.log(phone);

        // step-2- create a div (daisy theke je card ta anci oitai design kora abar)
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card p-4  bg-base-100 shadow-xl';
        // step-3 - set innerHtml
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        
        `

        // step-4 - append child
        phoneContainer.appendChild(phoneCard);

    })

}

// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.ariaValueMax;
    console.log(searchText)
}

loadPhone();