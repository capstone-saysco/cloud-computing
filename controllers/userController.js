import { connection } from "../config/database.js";

export const showUser = async(req, res) => {
    try {
        connection.query('SELECT id,name,email FROM `user` WHERE id='+res.locals.user_id,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                    console.log(err);
                } else {
                    res.status(200).json({
                        message: 'Showed user data',
                        data: rows[0]
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error, please try again.'});
    }
}