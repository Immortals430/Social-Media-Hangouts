import { initializeApp } from "firebase/app";

const firebaseConfig = {
    "apiKey": process.env.FIREBASE_API,
    "authDomain": process.env.FIREBASE_AUTHDOMAIN,
    "projectId": process.env.FIREBASE_PROJECTID,
    "storageBucket": process.env.FIREBASE_STORAGEBUCKET,
    "messagingSenderId": process.env.FIREBASE_MESSENGERSENDERID,
    "appId": process.env.FIREBASE_APPID,
    "measurementId": process.env.FIREBASE_MEASUREMENTID
}

const app = initializeApp(firebaseConfig);
