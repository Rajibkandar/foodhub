import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Login() {
  const[credential,setcredential]=useState({email:"",password:""})
  let navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response=await fetch('http://localhost:5000/api/loginuser',{
        method:"POST",
        headers:{
        'Content-Type':'application/json'
    },
body:JSON.stringify({email:credential.email,password:credential.password})
})
const json=await response.json()
    if(!json.success){
        alert("enter valid credential")
    }
    if(json.success){
      localStorage.setItem("useremail",credential.email)
      localStorage.setItem("authToken",json.authToken)
      navigate('/')
  }
      };
      
      const handleChange=(event)=>{
        setcredential({...credential,[event.target.name]:event.target.value})
      }

  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{marginTop:'3rem',maxWidth:'35rem'}}>
      <h1 style={{textAlign:'center'}}>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credential.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{marginTop:'2rem'}}>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/signup" className='m-3 btn btn-danger'> i'm new user</Link>
        </div>
      </form>
    </div>
    <div style={{marginTop:'22rem'}}>
    <Footer /></div>
    </div>
  )
}
