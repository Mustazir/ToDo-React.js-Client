import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import  { createContext, useEffect, useState } from 'react';
import app from './firebaseconfig';

import { GoogleAuthProvider } from "firebase/auth";
const auth =getAuth(app)

export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [datas,setDatas]=useState([])
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [watchData,setWatchData]=useState([])



    

    //   register 
      const createUser=(email,pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass)
    }
    const handelSignin=(email,pass)=>{
        return signInWithEmailAndPassword(auth, email, pass)
    }
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,currentUser=>{
            
            setUser(currentUser)
            setLoading(false)
            // console.log(currentUser.email)
            localStorage.setItem('user',JSON.stringify(currentUser.email))
            
        })
        return()=>{
            unsub();
        }
    },[])
    const logout=()=>{
        return signOut(auth)
    }
    const handelUpdateUser=(name,url)=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: url
          })
    }
    // gogle login 
    const googleSign =()=>{
        return signInWithPopup(auth,provider)
    }

    

    const data={

        createUser,
    
    
        datas,
        loading,
        handelSignin,
        user,
        setDatas,
        logout,
        googleSign,
        handelUpdateUser,
        watchData,
        setWatchData

        
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;