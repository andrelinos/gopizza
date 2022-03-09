import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyCOMzXwDWT6jIjYd88k0CfYLp4JtnG53iU',
    authDomain: 'gopizza-2dd73.firebaseapp.com',
    projectId: 'gopizza-2dd73',
    storageBucket: 'gopizza-2dd73.appspot.com',
    messagingSenderId: '482965035772',
    appId: '1:482965035772:web:370c6e8a59290320b51579',
    measurementId: 'G-VDZX4EWNER'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
