import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts?cat=${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat])

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post => {
            return(
                <div className="post" key={post.id}>
                    <img src={`../upload/${post.img}`} />
                    <h2>{post.title}</h2>
                    <button>Read More</button>
                </div>
            )
        })}
    </div>
  )
}

export default Menu