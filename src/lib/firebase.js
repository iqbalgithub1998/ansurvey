import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyChNDCFMrmx1UzE3ObkWSnINJqn_qEhfzE",
  authDomain: "building-a95c3.firebaseapp.com",
  databaseURL: "https://building-a95c3.firebaseio.com",
  projectId: "building-a95c3",
  storageBucket: "building-a95c3.appspot.com",
  messagingSenderId: "518400474229",
  appId: "1:518400474229:web:2aaaacfee0337de6edcc3c",
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;
