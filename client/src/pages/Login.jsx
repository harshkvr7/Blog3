import axios from 'axios';
import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = React.useState({
    username : "",
    password : "",
  })
  const [err, setErr] = React.useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  function handleChange(e) {
    setInputs(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/")
    } catch (error) {
      setErr(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't have an account ? <br/><Link to="/register">Register</Link> </span>
      </form>
    </div>
  )
}

export default Login;