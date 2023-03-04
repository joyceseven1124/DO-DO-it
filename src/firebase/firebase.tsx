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
         collection,
         updateDoc,
         query,
         where,
         deleteField,
         deleteDoc,
         
        }from "firebase/firestore"

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


async function saveToDoList(time:string,toDoListData:{[key:string]:any},uuid:any){
    let msg =""
    try {
        let email =""
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                email = user.email
                if(toDoListData.length > 1){
                    if(toDoListData[0].receiveEmail.length > 0){
                        setDoc(doc(db, email, `CommonTag${time}`), {[uuid]:uuid},{ merge: true });
                        setDoc(doc(db, "commonTag", uuid), {[uuid]:toDoListData},{ merge: true });
                        toDoListData[0].receiveEmail.map((element:string)=>{
                            setDoc(doc(db, element, "message"), {[uuid]:toDoListData}, { merge: true });
                        })
                    }else{
                        setDoc(doc(db, email, time), {[uuid]:toDoListData},{ merge: true });
                    }
                }else{
                    if(toDoListData.receiveEmail.length > 0){
                        setDoc(doc(db, email, `CommonTag${time}`), {[uuid]:uuid},{ merge: true });
                        setDoc(doc(db, "commonTag", uuid), {[uuid]:toDoListData},{ merge: true });
                        toDoListData.receiveEmail.map((element:string)=>{
                            setDoc(doc(db, element, "message"), {[uuid]:toDoListData}, { merge: true });
                        })
                    }else{
                        setDoc(doc(db, email, time), {[uuid]:toDoListData},{ merge: true });
                    }
                }
            }
        })
        msg="success"
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = "fail"
    }finally{
        return msg
    }
}



async function getToDoListData(email:string,time:string){
    let msg:{[key:string]:{[key:string]:string}}
     let data:any
    try{
        const monthData =await getDoc(doc(db, email,time));
        if(monthData.exists()) {
            msg = monthData.data()
            let dataKey =Object.keys(msg)
            data = dataKey.map((element:string)=>{
                return msg[element]
            })
        }

        const commonIndex =await getDoc(doc(db, email,`CommonTag${time}`));
        let commonIndexArray:string[] = []
        if(commonIndex.exists()) {
            let commonData = commonIndex.data()
            let dataKey =Object.keys(commonData)
            commonIndexArray = dataKey.map((element:string)=>{
                return element
            })
        }
        const allData = await Promise.all(commonIndexArray.map(async (element)=>{
            const commonData = await getDoc(doc(db, "commonTag",element));
            if(commonData.exists()) {
                const resultData = commonData.data()
                let newData = [...data]
                newData.push(resultData[element])
                data = newData
            }
        }))

    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        return "fail"
    }finally{
        if(data){
            return data
        }else{
            return null
        }
    }
}


async function updateData(email:string,time:string,index:number,toDoListData:{[key:string]:any}){
    let msg =''
    let isCommonTag:boolean | undefined
    try{
        if(toDoListData.length > 1){
            if(toDoListData[0].receiveEmail.length > 0){
                setDoc(doc(db,"commonTag", `${index}`),{[index]:toDoListData},{ merge: true });
                }else{
                    setDoc(doc(db, email, time), {[index]:toDoListData},{ merge: true });
                }
        }else{
            if(toDoListData.receiveEmail.length > 0){
                setDoc(doc(db,"commonTag", `${index}`),{[index]:toDoListData},{ merge: true });
            }else{
                setDoc(doc(db, email, time), {[index]:toDoListData},{ merge: true });
            }
        }

        msg="success"
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


async function deleteData(email:string,time:string,index:number){
    let msg =''
    try{
        await updateDoc(doc(db, `${email}`, time), {
            [index]: deleteField()
        });
        const commonIndex =await getDoc(doc(db, email,`CommonTag${time}`));
        if(commonIndex.exists()){
            await updateDoc(doc(db, `${email}`, `CommonTag${time}`), {
                [index]: deleteField()
            });
        }

        const commonIndexDataBase =await getDoc(doc(db, "commonTag", `${index}`));
        if(commonIndex.exists()){
            await deleteDoc(doc(db, "commonTag", `${index}`));
        }
    
        msg="success"
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


async function sendMessage(myEmail:string,
                           friendEmail:string,
                           index:number,
                           data:{},
                           time:string)
{
    let msg:Boolean
    try{
        await setDoc(doc(db, friendEmail, "message"), {[index]:data}, { merge: true });
        await setDoc(doc(db, myEmail, time), {[index]:data}, { merge: true });
        msg = true
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = false
    }
    finally{
        return msg
    }
}

async function saveMessage(email:string,index:number,time:string){
    let msg:string
    try{
        await setDoc(doc(db, email, `CommonTag${time}`), {[index]:index}, { merge: true });
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



async function deleteMessage(email:string,index:number){
    let msg =''
    try{
        await updateDoc(doc(db, email, "message"), {
            [index]: deleteField()
        });
        msg="success"
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

async function addFriend(email:string,myEmail:string,uuid:string){
    let msg:boolean
    try{
        const docSnap = await getDoc(doc(db, email, "memberInformation"));
        if(docSnap.exists()) {
            await setDoc(doc(db, myEmail, "friend"), {[uuid]:email}, { merge: true });
            msg = true
        }else{
            msg = false
        }
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = false
    }
    finally{
        return msg
    }
}


async function deleteFriend(uuid:string,myEmail:string){
    let msg:string
    try{

        let result = await updateDoc(doc(db, myEmail, "friend"), {
            [uuid]: deleteField()
        });
        msg="success"
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




async function getFriendData(email:string) {
    let msg
    try{
        const docSnap = await getDoc(doc(db, email, "friend"));
        if(docSnap.exists()) {
            const result = docSnap.data()
            msg = result
        }else{
            msg={result:null}
        }
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = {result:false}
    }
    finally{
        return msg
    }
}

async function getFriendInformation(friendEmail:string) {
    let msg
    try{
        const docSnap = await getDoc(doc(db, friendEmail, "memberInformation"));
        if(docSnap.exists()) {
            const result = docSnap.data()
            msg = result.name
        }else{
            msg={result:null}
        }
    }
    
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = {result:false}
    }
    finally{
        return msg
    }
}



async function getMessageData(email:string) {
    let msg
    try{
        const docSnap = await getDoc(doc(db, email, "message"));
        if(docSnap.exists()) {
            const result = docSnap.data()
            msg = result
        }else{
            msg={result:null}
        }
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        msg = {result:false}
    }
    finally{
        return msg
    }
}


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


async function enterAccount(email:string, password:string){
  let msg = ""
  try{
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
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


async function memberStatus(){
    let msg =""
    try{
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
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
  memberStatus,
  updateData,
  addFriend,
  getFriendData,
  deleteData,
  sendMessage,
  getMessageData,
  deleteMessage,
  saveMessage,
  getFriendInformation,
  deleteFriend
};