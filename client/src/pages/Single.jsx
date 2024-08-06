import React, { useState, useEffect, useContext } from 'react'
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import { useLocation } from 'react-router-dom'
import moment from 'moment';
import { AuthContext } from '../context/authContext.jsx'
import axios from 'axios'
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = React.useState([]);

  const location = useLocation();
  const Navigate = useNavigate();

  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`)
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="single">
      <div className="content">
        <img src={`https://firebasestorage.googleapis.com/v0/b/blog3-23fa5.appspot.com/o/uploads%2F${post.img}?alt=media`} />

        <div className="user">
          <img src={`https://firebasestorage.googleapis.com/v0/b/blog3-23fa5.appspot.com/o/uploads%2F${post.userimg}?alt=media`} />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username == post.username &&
            <div className="edit">
              <Link to={`/write?edit=`} state={post}>
                <img src={Edit} />
              </Link>

              <img onClick={handleDelete} src={Delete} />
            </div>
          }

        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.descr),
          }}
        ></p>  
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single;