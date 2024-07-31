import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from "dompurify";

const home = () => {
  const [posts, setPosts] = React.useState([]);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get('cat') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog3-production-4315.up.railway.app/api/posts?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat])

  return (
    <div className="home">
      <div className="posts">
        {posts.map(post => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.img}`} />
              </div>
              <div className="content">
                <Link className='link' to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.descr).slice(0, 250) + '...',
                  }}
                ></p>
                <Link className='link' to={`/post/${post.id}`}>
                  <button >Read More</button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default home;