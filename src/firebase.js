// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcw5Wfbg0HCuljaP1QTAbC5n1hRvFgjm8",
    authDomain: "nlu-chatapp.firebaseapp.com",
    projectId: "nlu-chatapp",
    storageBucket: "nlu-chatapp.appspot.com",
    messagingSenderId: "721103664985",
    appId: "1:721103664985:web:d9cf00a1d8be32daadbe48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);