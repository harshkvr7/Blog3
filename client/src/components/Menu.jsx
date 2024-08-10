import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({ cat }) => {
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
        return (
          <div className="post" key={post.id}>
            <img src={`https://firebasestorage.googleapis.com/v0/b/blog3-23fa5.appspot.com/o/uploads%2F${post.img}?alt=media`} />
            <h2>{post.title}</h2>
            <Link className='link' to={`/post/${post.id}`}>
              <button >Read More</button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Menu