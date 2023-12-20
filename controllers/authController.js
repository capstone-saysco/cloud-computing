import { connection } from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from 'mysql';
import 'dotenv/config';

// [GET] Refresh bearer
export const refreshToken = async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({message: 'Please login.'});
        connection.query("SELECT * FROM `user` WHERE refresh_token="+refreshToken,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: 'Internal server error, please try again.'});
                } else {
                    if (!rows) {
                        res.status(403).json({message: 'Not authorized!'});
                    } else {
                        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                            if(err) return res.status(403).json({message: 'Not authorized!'});
                            const userId = rows[0].id;
                            const name = rows[0].name;
                            const email = rows[0].email;
                            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                                expiresIn: '15s'
                            });
                            res.json({token: accessToken });
                        });
                    }
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error, please try again.'});
    }
}

// [POST] Register a user
export const register = async(req, res, next) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const data = {
            name: name,
            email: email,
            password: hashPassword
        };
        connection.query('INSERT INTO `user` SET ?', data, 
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(201).json({
                        message: 'User registered successfully!',
                        user: {name: data.name, email: data.email}
                    });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error, please try again.'});
    }
}

// [POST] Login to app
export const login = async(req, res, next) => {
    try {
        const inputEmail = req.body.email;
        const inputPassword = req.body.password;
        const query1 = 'SELECT * FROM `user` WHERE email='+mysql.escape(inputEmail);
        const query2 = 'UPDATE `user` SET ? WHERE email='+mysql.escape(inputEmail);
        let accessToken = '';
        let refreshToken='';

        connection.query(query1,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    const match = bcrypt.compare(inputPassword, rows[0].password);
                    if(!match) return res.status(400).json({message: "Credentials do not match!"});

                    const userId = rows[0].id;
                    const name = rows[0].name;
                    const email = rows[0].email;

                    accessToken=jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN,{expiresIn: '1d'});
                    refreshToken=jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN,{expiresIn: '1d'});
                    res.cookie('refreshToken', refreshToken,{
                        httpOnly: true,
                        secure: true,
                        maxAge: 24 * 60 * 60 * 1000
                    });
                }
            }
        );

        connection.query(query2, {refresh_token: process.env.REFRESH_TOKEN_SECRET},
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'Login successful!',
                        token: accessToken
                    });
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"User not found!"});
    }
}

// [DELETE] Logout from app
export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(200).json({message: 'User has already been logged out.'});
    const query = 'UPDATE `user` SET ? WHERE refresh_token='+mysql.escape(refreshToken);
    connection.query(query,{refresh_token: null},
        (err, rows, fields) => {
            if (err) {
                res.status(500).json({message: err.sqlMessage});
            } else {
                res.clearCookie('refreshToken');
                res.status(200).json({message: 'User logged out successfully.'})
            }
        }
    )
}