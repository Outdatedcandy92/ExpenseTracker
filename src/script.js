import { openDatabase, countDatabaseEntries } from './db.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         await openDatabase();
//         const count = await countDatabaseEntries();
//         console.log(`Total number of entries: ${count}`);
//     } catch (error) {
//         console.error('Error initializing database:', error);
//     }

//     const form = document.getElementById('expense-form');
//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const formData = new FormData(form);
//         const formObject = {};

//         formData.forEach((value, key) => {
//             formObject[key] = value;
//         });

//         const transaction = db.transaction(['expenses'], 'readwrite');
//         const objectStore = transaction.objectStore('expenses');
//         const request = objectStore.add(formObject);

//         request.onsuccess = () => {
//             console.log('Expense added to the database:', formObject);
//         };

//         request.onerror = (event) => {
//             console.error('Error adding expense to the database:', event.target.error);
//         };
//     });
// });