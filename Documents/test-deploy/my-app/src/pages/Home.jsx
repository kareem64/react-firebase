import React,{useState} from 'react'
import '../css/Log_Reg.css'
import axios from 'axios'
import {toast}from 'react-toastify'
const Home = () => {
  const [values,setValues]=useState()
  const changeHandle = (e)=>{
      setValues({...values,[e.target.name]:e.target.value})
  }
  const submitHandle = async(e)=>{
      e.preventDefault()
     const result = await axios.post('https://vercel-test-five-peach.vercel.app/api/users/signup',values) //get data from mongo db
      if(result.data.success){
        toast.success(result.data.message)
      }else{
          toast.error(result.data.message)
      }
  }
return (
  <div className='register'>
    <h2>SignUp</h2>
    <div className="inputs">
      <input type="text" placeholder="Name" name='name' onChange={changeHandle}/>
      <input type="email" placeholder="Email" name='email' onChange={changeHandle}/>
      <input type="password" placeholder="Password" name='password' onChange={changeHandle}/>
      <p>Have account?<span>Login Here!</span></p>
      <button onClick={submitHandle} type="submit">Register</button>
    </div>
  </div>
)
}

export default Home
