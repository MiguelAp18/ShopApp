import { Router } from "express";

// Controllers
import { 
    getItem, 
    getItems, 
    createItem, 
    updateItem, 
    deleteItem,
    searchItem,
    uploadItems
} from "../controllers/items.controllers.js"

const router = new Router();

router.get('/items', getItems)

router.get('/items/:id', getItem)

router.get('/search-title', searchItem)

router.post('/upload-items', uploadItems)

router.post('/items', createItem)

router.put('/items/:id', updateItem)

router.delete('/items/:id', deleteItem)

export default router;