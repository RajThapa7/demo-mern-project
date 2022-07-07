import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddJob() {
    const [item, setItem] = useState({company:'',status:'', position:''})
    const [error,setError] = useState('');
  
    let navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
          setItem({ ...item, [input.name]: input.value });
      };
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const url = "https://mern-app-12345.herokuapp.com/jobs";
        await axios.post(url, {...item})
        navigate("/job")
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
      <>
    <form method="POST" onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="company">company</label>
        <input type="text" name="company" id="company" value={item.company} onChange={handleChange} />
        <label htmlFor="position">position</label>
        <input type="text" name="position" id="position" value={item.position} onChange={handleChange} />
        <label htmlFor="status">status</label>
        <select name="status" id="status" value={item.status} onChange={handleChange} >
        <option style={{fontWeight: "800"}}>Select an option</option>
        <option value="interview">interview</option>
        <option value="declined">declined</option>
        <option value="pending">pending</option>
        </select>

        <input type="submit" value="Add Job"/>
    </form>
    {error && <p>{error}</p>}

      </>
  )
}
