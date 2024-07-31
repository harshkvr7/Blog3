import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = React.useState({
    username : "",
    email : "",
    password : "",
  })
  const [file, setFile] = useState(null);
  const [err, setErr] = React.useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file",file)

      const res = await axios.post("/api/upload", formData);
      return (res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setInputs(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const imgUrl = await upload();
    console.log(imgUrl);

    try {
      const res = await axios.post("https://blog3-production-4315.up.railway.app/api/auth/register", {email : inputs.email,username : inputs.username, password : inputs.password,img : file ? imgUrl : ""});
      navigate("/login")
    } catch (error) {
      setErr(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        { file && <img className='img-preview' src={URL.createObjectURL(file)}></img>}
        <input style={{display:"none"}} type="file" id='file' onChange={e => setFile(e.target.files[0])}/>
        <label className='file' htmlFor="file">{file ? "Change Image" : "Upload Image"}</label>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        <input required type='text' placeholder='email' name='email' onChange={handleChange}/>
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account ?<br/><Link to="/login">Login</Link> </span>
      </form>
    </div>
  )
}

export default Register;