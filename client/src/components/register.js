import React,{useState} from 'react'
import "../App.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export default function Register() {
  const [item, setItem] = useState({name:'', email:'',password:''})
  const [error,setError] = useState('');
const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
		setItem({ ...item, [input.name]: input.value });
	};
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const url = "https://mern-app-12345.herokuapp.com/register";
      await axios.post(url, {...item})
      navigate("/login")
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
    ) {
        setError(error.response.data.msg);
    }
    }   
  
};
  return (
    <div className="outer-form-container">
<div className="inner-container">
      <h3 style={{textAlign: "center"}}>Register User</h3>

    <form method='POST' onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={item.name} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="Email" name="email" id="email" value={item.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={item.password} onChange={handleChange} />
        <input type="submit" value="Register" />
    </form>
</div>
{error && <p>{error}</p>}

    </div>
  )
}
