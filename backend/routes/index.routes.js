import { Router } from "express";
import { pool } from "../database/db.js";

const router = Router();

router.get("/", async (req, res) => {
  
    const [rows] = await pool.query("SELECT 1 + 1 as result");
    const connectionQuery = rows[0]['result'];

    if (connectionQuery === 2) {
        console.log({'message': 'Database connected successfully!'});
        res.json({'message': 'Database connected successfully!'});
    } else {
        console.log({'message': 'Database not connected'});
        res.json({'message': 'Database not connected'});
    }

});

export default router;