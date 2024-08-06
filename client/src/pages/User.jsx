import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from "dompurify";
import { AuthContext } from '../context/authContext';

export const User = () => {
    const [posts, setPosts] = React.useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts/user/${currentUser.id}`);
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [currentUser])


    return (
        <div className="user">
            <div className='posts'>
                <h1>Your Posts</h1>
                {posts.map(post => {
                    return (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={`https://firebasestorage.googleapis.com/v0/b/blog3-23fa5.appspot.com/o/uploads%2F${post.img}?alt=media`} />
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

            <div className="info">  
                <img src={`https://firebasestorage.googleapis.com/v0/b/blog3-23fa5.appspot.com/o/uploads%2F${posts[0]?.userimg}?alt=media`}/>   

                <h4>{currentUser.username}</h4>
            </div>
        </div>

    )
}
