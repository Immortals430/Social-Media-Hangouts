import { initializeApp } from "firebase/app";

let config = {
  "apiKey": process.env.REACT_APP_APIKEY,
  "authDomain": process.env.REACT_APP_AUTHDOMAIN,
  "projectId": process.env.REACT_APP_PROJECTID,
  "storageBucket": process.env.REACT_APP_BUCKET,
  "messagingSenderId": process.env.REACT_APP_SENDERID,
  "appId": process.env.REACT_APP_APPID,
  "measurementId": process.env.REACT_APP_MEASUREMENT
}

initializeApp(config);




