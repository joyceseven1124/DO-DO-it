// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
         createUserWithEmailAndPassword ,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { getFirestore,
         doc,
         setDoc,
        }from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0o-dPdBKUUlU-1o5BeCg_awOyMiW5AVo",
  authDomain: "dodoit-40a56.firebaseapp.com",
  projectId: "dodoit-40a56",
  storageBucket: "dodoit-40a56.appspot.com",
  messagingSenderId: "536444909803",
  appId: "1:536444909803:web:c7ff5ca7ac6e195fa526ae",
  measurementId: "G-QS4CEHBMW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();


//之後用參數帶入
async function saveToDoList(){
    let msg =""
    try {
        await setDoc(doc(db, "users", "demo1"), {
            web: "Let's Write",
            author: "August",
            like: true
        });
        msg="success"
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = "fail"
    }finally{
        return msg
    }
}

//註冊
async function buildAccount(email:string, password:string,name:string){
    let msg =""
    try{
        const auth = getAuth();
        const userCredential =await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        //uid拿到
        const uid =(user.uid)
        await setDoc(doc(db, email, "memberInformation"), {
        name:{name},
        email: {email},
        password: {password},
        uid: {uid}
    });
        msg = "success"
    }
    
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = "fail"
    }
    finally{
        return msg
    }
    
}

//登入
async function enterAccount(email:string, password:string){
  let msg = ""
  try{
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    msg = "success"
  }
  catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    msg = "fail"
  }
  finally{
    return msg
  }
}

//是否為登入狀態
async function memberStatus(){
    let msg =""
    try{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        msg = "success"
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = "fail"
    }
    finally{
        return msg
    }
}

async function leaveAccount(){
    let msg =''
    try{
        const auth = getAuth();
        const result = await signOut(auth)
        msg ="success"
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = "fail"
    }
    finally{
        return msg
    }

}



export default {
  saveToDoList: saveToDoList,
  buildAccount: buildAccount,
  enterAccount: enterAccount,
  leaveAccount:leaveAccount
};