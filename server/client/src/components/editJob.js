import React,{useState, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { IdContext } from "../App";

export default function EditJob() {
  const {id} = useContext(IdContext);
  const navigate  = useNavigate();
    const [item, setItem] = useState({company:'', position:''});
    const [error,setError] = useState('');

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const url = `https://mern-app-12345.herokuapp.com/jobs/${id}`;
        await axios.patch(url, {...item})
        navigate('/job')
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }
    const handleChange = ({ currentTarget: input }) => {
		setItem({ ...item, [input.name]: input.value });
	};
  return (
    <>
    <form method="POST" onSubmit={(e)=>handleSubmit(e)}>
    <label htmlFor="company">Company</label>
    <input type="text" name='company' id='company' value={item.company} onChange={handleChange} />
    <label htmlFor="position">Position</label>
    <input type="text" name='position' id='position' value={item.position} onChange={handleChange} />
    <button type="submit" >submit</button>
    </form>
    {error && <p>{error}</p>}

    </>
  )
}
