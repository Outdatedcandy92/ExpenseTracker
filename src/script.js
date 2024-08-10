const form = document.getElementById('expense-form');
let db; 


const request = indexedDB.open('ExpenseTrackerDB', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;

    const objectStore = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('amount', 'amount', { unique: false });
    objectStore.createIndex('place', 'place', { unique: false });
    objectStore.createIndex('date', 'date', { unique: false });
    objectStore.createIndex('category', 'category', { unique: false });
    objectStore.createIndex('description', 'description', { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const formData = new FormData(form);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });


        const transaction = db.transaction(['expenses'], 'readwrite');
        const objectStore = transaction.objectStore('expenses');
        const request = objectStore.add(formObject);

        request.onsuccess = () => {
            console.log('Expense added to the database:', formObject);
            alert('Expense added successfully!');
        };

        request.onerror = (event) => {
            console.error('Error adding expense to the database:', event.target.error);
            alert('An error occurred while adding the expense');
        };
    });
};

request.onerror = (event) => {
    console.error('Error opening database:', event.target.error);
};

function printDatabase() {
    const transaction = db.transaction(['expenses'], 'readonly');
    const objectStore = transaction.objectStore('expenses');
    const request = objectStore.openCursor();

    request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            console.log('Expense:', cursor.value);
            cursor.continue();
        } else {
            console.log('No more entries!');
        }
    };

    request.onerror = (event) => {
        console.error('Error reading from the database:', event.target.error);
    };
}


function removeEntryById(id) {
    const transaction = db.transaction(['expenses'], 'readwrite');
    const objectStore = transaction.objectStore('expenses');
    const request = objectStore.delete(id);

    request.onsuccess = () => {
        console.log(`Entry with id ${id} removed from the database.`);
    };

    request.onerror = (event) => {
        console.error('Error removing entry from the database:', event.target.error);
    };
}