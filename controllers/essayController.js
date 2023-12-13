import { connection } from "../config/database.js";

// [GET] Read all essay pack based on user authorized
export const getAllEssayPacks = async(req, res) => {
    try {
        const user_id = res.locals.user_id;
        connection.query('SELECT * FROM `essay_pack` WHERE user_id='+user_id,
            (err, rows, fields) => {
                if (err) {
                    res.status(404).json({message: 'This user has not created an essay pack.'});
                } else {
                    res.status(200).json({
                        message: 'All essay pack data.',
                        data: rows
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [GET] Read all essay based on pack ID
export const getAllEssays = async(req, res) => {
    try {
        const pack_id = req.params.pack_id;
        connection.query('SELECT * FROM essay WHERE pack_id='+pack_id, 
            (err, rows, fields) => {
                if (err) {
                    res.status(404).json({message: 'There are no pack with id '+pack_id});
                } else {
                    res.status(200).json({
                        message: 'All essays data on the pack.',
                        data: rows
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [GET] Show an essay pack based on its ID
export const showEssayPack = async(req, res) => {
    try {
        const pack_id = req.params.pack_id;
        connection.query('SELECT * FROM `essay_pack` WHERE id='+pack_id, 
            (err, rows, fields) => {
                if (err) {
                    res.status(404).json({message: 'There are no essay pack with id '+pack_id});
                } else {
                    res.status(200).json({
                        message: 'Showed essay pack data.',
                        data: rows[0]
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }

}

// [GET] Show an essay based on its ID
export const showEssay = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        connection.query('SELECT * FROM `essay` WHERE id='+essay_id, 
            (err, rows, fields) => {
                if (err) {
                    res.status(404).json({message: 'There are no essay with id '+essay_id});
                } else {
                    res.status(200).json({
                        message: 'Showed essay data.',
                        data: rows[0]
                    });
                }
            }
        );

    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [POST] Add an essay pack
export const addEssayPack = async(req, res) => {
    try {
        const user_id = res.locals.user_id;
        const {title, question} = req.body;
        const addData = {
            user_id: user_id,
            title: title,
            question: question
        }

        connection.query('INSERT INTO `essay_pack` SET ?', addData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err});
                } else {
                    res.status(201).json({
                        message: 'Essay pack added successfully.',
                        data: {
                            id: rows.insertId,
                            user_id: user_id,
                            title: title,
                            question: question
                        }
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [POST] Add an essay on an essay pack
export const addEssay = async(req, res) => {
    try {
        const pack_id = req.params.pack_id;
        const {student_name, student_number, answer, score} = req.body;
        const addData = {
            pack_id: pack_id,
            student_name: student_name,
            student_number: student_number,
            answer: answer,
            score: score
        }

        connection.query('INSERT INTO `essay` SET ?', addData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err});
                } else {
                    res.status(201).json({
                        message: 'Essay added successfully.',
                        data: {
                            id: rows.insertId,
                            pack_id: pack_id,
                            student_name: student_name,
                            student_number: student_number,
                            answer: answer,
                            score: score
                        }
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [PUT] Update an essay pack
export const updateEssayPack = async(req, res) => {
    try {
        const pack_id = req.params.pack_id;
        const {title, question} = req.body;
        const updateData = {
            title: title,
            question: question
        }

        connection.query('UPDATE `essay_pack` SET ? WHERE id='+pack_id, updateData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err});
                } else {
                    res.status(200).json({
                        message: 'Essay pack updated successfully!',
                        updated_data: {
                            id: pack_id,
                            title: title,
                            question: question
                        }
                    });
                }
            }
        )
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [PUT] Update an essay
export const updateEssay = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        const {student_name, student_number, answer, score} = req.body;
        const updateData = {
            student_name: student_name,
            student_number: student_number,
            answer: answer,
            score: score
        }

        connection.query('UPDATE `essay` SET ? WHERE id='+essay_id, updateData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err});
                } else {
                    res.status(200).json({
                        message: 'Essay updated successfully!',
                        updated_data: {
                            id: essay_id,
                            student_name: student_name,
                            student_number: student_number,
                            answer: answer,
                            score: score
                        }
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [DELETE] Delete a pack with its entire content
export const deleteEssayPack = async(req, res) => {
    try {
        const pack_id = req.params.pack_id;
        connection.query("DELETE FROM `essay_pack` WHERE id="+pack_id,  
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err});
                } else {
                    res.status(200).json({
                        message: 'Essay pack and its content deleted successfully.'
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [DELETE] Delete an essay
export const deleteEssay = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        connection.query("DELETE FROM `essay` WHERE id="+essay_id,  
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err});
                } else {
                    res.status(200).json({
                        message: 'Essay deleted successfully.'
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}