import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAhRl8FwCPcKBg2Ow21MXKRAAaspwX2aIk',
    authDomain: 'notcell-f11c4.firebaseapp.com',
    projectId: 'notcell-f11c4',
    storageBucket: 'notcell-f11c4.appspot.com',
    messagingSenderId: '270218358827',
    appId: '1:270218358827:web:e52a9b8b948c4af708ba6e'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
