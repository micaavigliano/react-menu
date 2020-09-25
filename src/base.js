import Rebase from 're-base'; //permite hacer como mirroing de los cambios de nuestra app en firebase (base de datos)
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC2Q7mjGTHL5Z0znLxpAi86ihzaMhgevpA",
    authDomain: "catch-of-the-day-test-c20a3.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-test-c20a3.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;