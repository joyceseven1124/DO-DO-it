// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getAuth, 
         createUserWithEmailAndPassword ,
         signInWithEmailAndPassword,
         onAuthStateChanged,
         signOut } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { getFirestore,
         doc,
         setDoc,
         getDoc,
         getDocs,
         collection
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


async function saveToDoList(time:string,toDoListData:{},uuid:any){
    let msg =""
    try {
        let email =""
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                email = user.email
                toDoListData
                setDoc(doc(db, email, time), {[uuid]:toDoListData},{ merge: true });
            }
        })
        msg="success"
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = "fail"
    }finally{
        console.log("訊息消失")
        console.log(msg)
        return msg
    }
}



async function getToDoListData(email:string,time:string){
    //await getDoc(doc(db, email,time));
    //const querySnapshot = await getDocs(collection(db, email));
    let msg:{[key:string]:{[key:string]:string}}
    try{
        const monthData =await getDoc(doc(db, email,time));
        if(monthData.exists()) {
            msg = monthData.data()
            let dataKey =Object.keys(msg)
            let data = dataKey.map((element:string)=>{
                return msg[element]
            })
            return  data
        }else{
            return null
        }
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        return "fail"
    }
}

async function getMemberInformation(email:string){
    let msg
    try{
        const memberData = await getDoc(doc(db, email, "memberInformation"));
        msg = memberData
        if(memberData.exists()) {
            msg = memberData.data()
            msg = {email:msg.email.email,name:msg.name.name}
        }
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = {result:"fail"}
    }finally{
        return msg
    }
    
}

//之後用參數帶入
/*async function saveToDoList(){
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
}*/

//註冊
async function buildAccount(email:string, password:string,name:string){
    let msg =""
    try{
        const auth = getAuth();
        const userCredential =await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
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
    //msg = "success"
    msg = userCredential.user.email
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
                //const uid = user.uid;
                msg = user.email
            } else {
                msg = "登出"
            }
        });
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
  saveToDoList,
  buildAccount,
  enterAccount,
  leaveAccount,
  getToDoListData,
  getMemberInformation,
  memberStatus
};