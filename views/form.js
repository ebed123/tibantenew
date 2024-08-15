let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let grossAmountInput = document.getElementById('grossAmount');
let paketSelect = document.getElementById('paket');

// Initialize or load listCards from localStorage
let listCards = JSON.parse(localStorage.getItem('listCards')) || [];

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Pasar Pancingan',
        image: 'https://ebed123.github.io/Data_Gambar_Tibante/images/aset%20wisata/pasar%20pancingan.avif',
        price: 7000
    },
    {
        id: 2,
        name: 'Sepeda',
        image: 'https://ebed123.github.io/Data_Gambar_Tibante/images/profildemo.jpg',
        price: 120000
    },
    {
        id: 3,
        name: 'ATV',
        image: 'https://ebed123.github.io/Data_Gambar_Tibante/images/aset%20wisata/atv1.jpg',
        price: 220000
    },
    {
        id: 4,
        name: 'Pijat',
        image: 'https://ebed123.github.io/Data_Gambar_Tibante/images/aset%20wisata/pijat2.jpg',
        price: 123000
    },
    {
        id: 5,
        name: 'Cooking Class',
        image: 'https://ebed123.github.io/Data_Gambar_Tibante/images/aset%20wisata/cooking1.jpg',
        price: 320000
    },
];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">Rp ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Tambahkan ke Keranjang</button>`;
        list.appendChild(newDiv);
    });

    // Reload the card from listCards
    reloadCard();
}

function addToCard(key) {
    let foundIndex = listCards.findIndex(item => item.id === products[key].id);
    if (foundIndex !== -1) {
        listCards[foundIndex].quantity++;
    } else {
        listCards.push({
            id: products[key].id,
            name: products[key].name,
            image: products[key].image,
            price: products[key].price,
            quantity: 1
        });
    }

    // Save listCards to localStorage
    localStorage.setItem('listCards', JSON.stringify(listCards));

    // Reload the card display
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    let paketText = '';

    listCards.forEach((value, key) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;

        // Append product name and quantity to the textarea content
        paketText += `${value.name} (x${value.quantity})\n`;

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="${value.image}"/></div>
            <div>${value.name}</div>
             <div>Rp ${(value.price * value.quantity).toLocaleString('id-ID')}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">👤 ${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });

    // Update total and quantity displayed
    total.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    quantity.innerText = count;
    // Format the grossAmount input value in Rupiah
    grossAmountInput.value = totalPrice; 

    // Set the content of the textarea
    paketSelect.value = paketText.trim();
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        listCards.splice(key, 1); // Remove item from listCards if quantity is zero or less
    } else {
        listCards[key].quantity = quantity;
    }

    // Save listCards to localStorage
    localStorage.setItem('listCards', JSON.stringify(listCards));

    // Reload the card display
    reloadCard();
}

// Scroll to the payment form when the total element is clicked
document.querySelector('.total').addEventListener('click', function () {
    document.getElementById('payment-form').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('visitDate');
    const dateMessage = document.getElementById('dateMessage');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    const formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-based
        let year = date.getFullYear();
        if(day < 10) day = '0' + day;
        if(month < 10) month = '0' + month;
        return `${year}-${month}-${day}`;
    };

    dateInput.min = formatDate(tomorrow);
    dateInput.max = formatDate(maxDate);

    dateInput.addEventListener('change', function() {
        const selectedDate = dateInput.value;

        // Simulasi pengecekan kapasitas harian
        checkDailyCapacity(selectedDate);
    });

    function checkDailyCapacity(date) {
        // Ganti dengan logika pengecekan kapasitas yang sesungguhnya
        // Misalnya, melakukan AJAX request ke server untuk mendapatkan kapasitas harian
        const capacity = 50; // Kapasitas maksimum per hari
        const booked = Math.floor(Math.random() * 60); // Simulasi jumlah orang yang sudah memesan

        if (booked >= capacity) {
            dateMessage.textContent = 'Kapasitas untuk tanggal ini sudah penuh. Silakan pilih tanggal lain.';
            dateInput.value = ''; // Kosongkan input tanggal
        } else {
            dateMessage.textContent = ''; // Hapus pesan jika ada kapasitas
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('focus', function() {
        if (!phoneInput.value.startsWith('+62')) {
            phoneInput.value = '+62';
        }
    });

    phoneInput.addEventListener('input', function() {
        if (!phoneInput.value.startsWith('+62')) {
            phoneInput.value = '+62' + phoneInput.value.replace(/^(\+62)/, '');
        }
    });
});


initApp();
