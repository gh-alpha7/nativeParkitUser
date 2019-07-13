const firebase = require("firebase");
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhhgzC0Auy0YficBklazX0tFXa_XuZ9Io",
  authDomain: "parkin-227515.firebaseapp.com",
  projectId: "parkin-227515",
};
firebase.initializeApp(firebaseConfig);
var Db = firebase.firestore();

export default Db
