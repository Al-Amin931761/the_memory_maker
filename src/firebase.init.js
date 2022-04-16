// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFALXmWOepublBDA0hIUmSitXJDnDPvQ4",
    authDomain: "independent-service-prov-e099d.firebaseapp.com",
    projectId: "independent-service-prov-e099d",
    storageBucket: "independent-service-prov-e099d.appspot.com",
    messagingSenderId: "870269059813",
    appId: "1:870269059813:web:746a901d8adb9daaef0a0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
