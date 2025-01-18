import React, { createContext, useContext, useState,useEffect } from 'react'

const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
    const [auth,setAuth]= useState({
        user: null,
        token: null,
    })
useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(('auth')))
   
    setAuth({
        ...auth,
        user:  data?.newUser,
        token: data?.token,
 
    })

},[])
  return (
   <AuthContext.Provider  value={[auth,setAuth]}>
     {children}
    </AuthContext.Provider>
  )
}

const useAuth = ()=>useContext(AuthContext)
export {AuthContextProvider,useAuth}
