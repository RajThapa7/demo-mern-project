import React,{useState} from 'react'
import { Link } from "react-router-dom";
export default function Intro() {
  return (
      <>
      <h2>Welcome to Raj Thapa Page</h2>
      <Link to="Register">Register</Link>
      <Link to="Login">Login</Link>
      </>
  )
}
