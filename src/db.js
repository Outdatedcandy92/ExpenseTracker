let db;

const openDatabase = () => {
    return new Promise((resolve, reject) => {
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
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const countDatabaseEntries = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['expenses'], 'readonly');
        const objectStore = transaction.objectStore('expenses');
        const request = objectStore.openCursor();
        let count = 0;

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                count++;
                cursor.continue();
            } else {
                resolve(count);
            }
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export { openDatabase, countDatabaseEntries };