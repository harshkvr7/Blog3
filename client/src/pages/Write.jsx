import React,{useState, useContext, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext.jsx'

const Write = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser?.username) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const state = useLocation().state;

  const [value, setValue] = useState(state?.descr || '');
  const [title, setTitle] = useState(state?.title || ''); 
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

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

  const handleSubmit = async (e) => {
    e.preventDefault;

    const imgUrl = await upload();

    try {
      state ? await axios.put(`/api/posts/${state.id}`, {title, desc : value, cat, img : file ? imgUrl : ""}) :
      await axios.post(`/api/posts`, {title, desc : value, cat, img : file ? imgUrl : "", date : moment(Date.now()).format("YYYY-MM-DD")});

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        { file && <img className='img-preview' src={URL.createObjectURL(file)}></img>}
        <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        <div className="editor-container">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" id='file' onChange={e => setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
          <input type="radio" checked={cat == "art"} name='cat' value="art" id='art' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat == "science"} name='cat' value="science" id='science' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat == "technology"} name='cat' value="technology" id='technology' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat == "cinema"} name='cat' value="cinema" id='cinema' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat == "design"} name='cat' value="design" id='design' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat == "food"} name='cat' value="food" id='food' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="food">Food</label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Write;