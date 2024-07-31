import pg from 'pg';
import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const register = async (req, res) => {
    const q = "SELECT * FROM users WHERE email = $1 OR username = $2";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            console.log("1" + err);
            return res.status(500).json(err); 
        }
        if (data.rows.length) {
            return res.status(409).json("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q2 = "INSERT INTO users (username, email, password, img) VALUES ($1, $2, $3, $4)";
        const values = [req.body.username, req.body.email, hash, req.body.img];

        db.query(q2, values, (err, data) => {
            if (err) {
                console.log("2" + err);
                return res.status(500).json(err);
            }

            return res.status(200).json("User has been created");
        });
    });
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = $1";

    db.query(q,[req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.rows.length == 0) {
            return res.status(404).json("User not found!");
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data.rows[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password!");
        }

        const token = jwt.sign({id : data.rows[0]}, "jwtkey");
        const {password, ...others} = data.rows[0];

        res.cookie("access_token", token, {
            httpOnly : false
        }).status(200).json(others);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite : "none",
        secure : "true"
    }).status(200).json("User has been logged out.")
}
