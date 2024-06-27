import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Signup() {
    const[credential,setcredential]=useState({name:"",email:"",password:"",geolocation:""})
    const navigate = useNavigate();
    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     const response=await fetch('http://localhost:5000/api/createuser',{
    //         method:"POST",
    //         headers:{
    //         'Content-Type':'application/json'
    //     },
    // body:JSON.stringify({name:credential.name,email:credential.email,password:credential.password,location:credential.geolocation})
    // })
    // const json=await response.json()
    // if(!json.success){
    //     alert("enter valid credential")
    // }
    //   };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
          location: credential.geolocation,
        }),
      });
      const json = await response.json();
      if (json.success) {
        alert('Account created'); // Show success message
        navigate('/'); // Redirect to homepage
      } else {
        alert(json.error || 'Enter valid credentials'); // Display specific error message from server or a generic one
      }
    };
  
      
      const handleChange=(event)=>{
        setcredential({...credential,[event.target.name]:event.target.value})
      }
    return (
    <div>
      <Navbar />
         <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h1 style={{textAlign:'center'}}>Signup</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={credential.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input type="text" className="form-control" id="location" name="geolocation" value={credential.geolocation} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <Link to="/login" className='m-3 btn btn-danger'> Already a user</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{marginTop:'10rem'}}>
    <Footer /></div>
    </div>
  )
}
