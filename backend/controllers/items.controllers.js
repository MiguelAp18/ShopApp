import { pool } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid';

// Load data
import { ItemsData } from "../ItemsData.js";

const data = await ItemsData()

const getItems = async (req, res) => {
    try {
        const [ result ] = await pool.query(
            "SELECT * FROM items ORDER BY id"
        );
        res.json({'items': result});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 'message': error.message });
    }
}

const getItem = async (req, res) => {
    try {
        const [ result ] = await pool.query(
            "SELECT * FROM items WHERE id = ?",
            [ req.params.id ]
        );
    
        if (result.length === 0) {
            return res.status(404).json({'message': 'Item not found'});
        } else {
            return res.json({
                'message': 'Item found',
                'item': result[0]
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 'message': error.message });
    }
}

const createItem = async (req, res) => {
    try {
        const { title, description } = req.body;
        const [ result ] = await pool.query(
            "INSERT INTO items (title, description) VALUES (?, ?)",
            [ title, description ]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({'message': 'Item creation failed'});
        } else {
            return res.json({'message': 'Record created successfully'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 'message': error.message });
    }
}

const updateItem = async (req, res) => {
    try {
        const [ result ] = await pool.query(
            "UPDATE items SET ? WHERE id = ?",
            [ req.body, req.params.id ]
        );
    
        if (result.affectedRows === 0) {
            return res.status(404).json({'message': 'Item not found'});
        } else {
            return res.json({'message': 'Record updated successfully'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 'message': error.message });
    }
}

const deleteItem = async (req, res) => {
    try {
        const [ result ] = await pool.query(
            "DELETE FROM items WHERE id = ?",
            [ req.params.id]
        );
    
        if (result.affectedRows === 0) {
            return res.status(404).json({'message': 'Item not found'});
        } else {
            return res.json({'message': 'Record deleted successfully'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ 'message': error.message });
    }
}

const searchItem = async (req, res) => {
    try {
        const title = req.query.title;

        if (!title) {
            return res.status(400).json({ 'message': 'Title parameter is missing' });
        }

        const [ result ] = await pool.query(
            "SELECT * FROM items WHERE title LIKE ?",
            [`%${title}%`]
        );

        if (result.length === 0) {
            return res.status(404).json({ 'message': 'Items not found' });
        } else {
            return res.json({
                'message': 'Items found',
                'items': result
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 'message': error.message });
    }
}

const uploadItems = async (req, res) => {
    try {     
        const values = data.map(item => [uuidv4(), item.title, item.description, item.price, item.image])
        
        const [ result ] = await pool.query(
            "INSERT INTO items (id, title, description, price, image) VALUES ?",
            [ values ]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({'message': 'Items creation failed'});
        } else {
            return res.json({'message': 'Records created successfully'})
        }
    } catch (error) {
        console.log(error, data)
        return res.status(500).json({ 'message': error.message });
    }
}



export {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    searchItem,
    uploadItems
}