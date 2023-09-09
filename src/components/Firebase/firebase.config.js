// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtceAm8Vs1PUXaNLR0rxHaGLw43OoTrYc",
  authDomain: "alhasnat-task-project.firebaseapp.com",
  projectId: "alhasnat-task-project",
  storageBucket: "alhasnat-task-project.appspot.com",
  messagingSenderId: "362828986173",
  appId: "1:362828986173:web:0813d58fbb68312ac03754",
  measurementId: "G-XG9W03EJ9B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
