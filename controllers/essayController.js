import { connection } from "../config/database.js";

// [GET] Read all essay based on user authorized
export const getAllEssays = async(req, res) => {
    try {
        const user_id = res.locals.user_id;
        connection.query('SELECT * FROM `essay` WHERE user_id='+user_id,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'All essays data.',
                        data: rows
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [GET] Read all student answer based on essay ID
export const getAllAnswers = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        connection.query('SELECT * FROM student_answer WHERE essay_id='+essay_id, 
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'All answers data on the essay.',
                        data: rows
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
                    res.status(500).json({message: err.sqlMessage});
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

// [GET] Show a student answer based on its ID
export const showAnswer = async(req, res) => {
    try {
        const answer_id = req.params.answer_id;
        connection.query('SELECT * FROM `student_answer` WHERE id='+answer_id, 
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'Showed answer data.',
                        data: rows[0]
                    });
                }
            }
        );

    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [POST] Add an essay
export const addEssay = async(req, res) => {
    try {
        const user_id = res.locals.user_id;
        const {question, key_answer} = req.body;
        const addData = {
            user_id: user_id,
            question: question,
            key_answer: key_answer
        }

        connection.query('INSERT INTO `essay` SET ?', addData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(201).json({
                        message: 'Essay added successfully.',
                        data: {
                            id: rows.insertId,
                            user_id: user_id,
                            question: question,
                            key_answer: key_answer
                        }
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [POST] Add a student answer on an essay
export const addAnswer = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        const {student_name, student_number, answer, score} = req.body;
        const addData = {
            essay_id: essay_id,
            student_name: student_name,
            student_number: student_number,
            answer: answer,
            score: score
        }

        connection.query('INSERT INTO `student_answer` SET ?', addData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(201).json({
                        message: 'Answer added successfully.',
                        data: {
                            id: rows.insertId,
                            essay_id: essay_id,
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

// [PUT] Update an essay
export const updateEssay = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        const {question, key_answer} = req.body;
        const updateData = {
            question: question,
            key_answer: key_answer
        }

        connection.query('UPDATE `essay` SET ? WHERE id='+essay_id, updateData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'Essay updated successfully!',
                        updated_data: {
                            id: essay_id,
                            question: question,
                            key_answer: key_answer
                        }
                    });
                }
            }
        )
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [PUT] Update an student answer
export const updateAnswer = async(req, res) => {
    try {
        const answer_id = req.params.answer_id;
        const {student_name, student_number, answer, score} = req.body;
        const updateData = {
            student_name: student_name,
            student_number: student_number,
            answer: answer,
            score: score
        }

        connection.query('UPDATE `student_answer` SET ? WHERE id='+answer_id, updateData,
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'Student answer updated successfully!',
                        updated_data: {
                            id: answer_id,
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

// [DELETE] Delete an essay with its entire content
export const deleteEssay = async(req, res) => {
    try {
        const essay_id = req.params.essay_id;
        connection.query("DELETE FROM `essay` WHERE id="+essay_id,  
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'Essay and its content deleted successfully.'
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}

// [DELETE] Delete a student answer
export const deleteAnswer = async(req, res) => {
    try {
        const answer_id = req.params.answer_id;
        connection.query("DELETE FROM `student_answer` WHERE id="+answer_id,  
            (err, rows, fields) => {
                if (err) {
                    res.status(500).json({message: err.sqlMessage});
                } else {
                    res.status(200).json({
                        message: 'Student answer deleted successfully.'
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({message: 'Internal server error!'});
    }
}