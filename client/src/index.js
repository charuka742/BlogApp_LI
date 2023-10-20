import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAG4R4qvNkfcF5p-gk2OWHxQfI2qn7npxE",
  authDomain: "blogappli-1bb92.firebaseapp.com",
  projectId: "blogappli-1bb92",
  storageBucket: "blogappli-1bb92.appspot.com",
  messagingSenderId: "965670524332",
  appId: "1:965670524332:web:7a733f3de062a89df31609"
};


const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

