import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbKkkqOZGTBIwNW3-4nH6hjnprfOZwkMU",
  authDomain: "blog3-23fa5.firebaseapp.com",
  projectId: "blog3-23fa5",
  storageBucket: "blog3-23fa5.appspot.com",
  messagingSenderId: "105259008762",
  appId: "1:105259008762:web:bb1bd1f4c19aeaf3ebbf43",
  measurementId: "G-DNZGDL3VD0"
};

const fireapp = initializeApp(firebaseConfig);
const storage = getStorage(fireapp);

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
      const fileName = Date.now() + file.name;
      const storageRef = ref(storage, "uploads/" + fileName);

      await uploadBytes(storageRef, file);

      return fileName;
    } catch (error) {
      console.log(error)
      alert(error);
    }
  }

  function handleChange(e) {
    setInputs(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      const res = await axios.post("/api/auth/register", {email : inputs.email,username : inputs.username, password : inputs.password,img : file ? imgUrl : ""});
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