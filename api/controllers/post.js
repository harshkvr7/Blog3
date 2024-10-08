import { db } from "../db.js"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

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

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = $1" : "SELECT * FROM posts";

    if (q == "SELECT * FROM posts WHERE cat = $1" && req.query.cat != "") {
        db.query(q, [req.query.cat], (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(data.rows)
        })
    }
    else {
        db.query(q, (err, data) => {
            if (err) {
                return res.send(err);
            }
            return res.status(200).json(data.rows)
        })
    }
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, username, title, p.descr, p.img, u.img AS userImg, cat, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = $1";

    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data.rows[0])
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("Not authorized");
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }

        const q = "INSERT INTO posts (title, descr, img, cat, date, uid) VALUES ($1, $2, $3, $4, $5, $6)";

        db.query(q, [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date, parseInt(userInfo.id.id)], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            return res.json("Post has been created.");
        })
    })
}

const uploadDir = path.resolve('../client/public/upload');

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("Not authorized");
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }

        const postId = req.params.id;

        const findImageQuery = "SELECT img FROM posts WHERE id = $1 AND uid = $2";
        db.query(findImageQuery, [postId, userInfo.id.id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (data.rows.length === 0) {
                return res.status(404).json("Post not found");
            }

            const image = data.rows[0].img;

            const deletePostQuery = "DELETE FROM posts WHERE id = $1 AND uid = $2";

            db.query(deletePostQuery, [postId, userInfo.id.id], (err) => {
                if (err) {
                    return res.status(403).json("You can delete only your post");
                }

                const desertRef = ref(storage, `uploads/${image}`);

                deleteObject(desertRef);

                return res.status(200).json("Post has been deleted");
            });
        });
    });
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json("Not authorized");
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid");
        }

        const postId = req.params.id;
        const q = "UPDATE posts SET title = $1, descr = $2, img = $3, cat = $4 WHERE id = $5 AND uid = $6";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q, [...values, postId, userInfo.id.id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }

            return res.json("Post has been created.");
        })
    })
}

export const getUserPosts = (req, res) => {
    const q = "SELECT p.id, username, title, p.descr, p.img, u.img AS userImg, cat, date FROM users u JOIN posts p ON u.id = p.uid WHERE u.id = $1";

    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data.rows);
    })
}