import { openDatabase } from './db.js';
    
async function DB_Read() {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(['expenses'], 'readonly');
        const objectStore = transaction.objectStore('expenses');
        const request = objectStore.getAll();

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                const expenses = event.target.result;
                resolve(expenses);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}


export { DB_Read };