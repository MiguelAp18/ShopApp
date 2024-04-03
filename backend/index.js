import express from "express"
import 'dotenv/config'
import cors from "cors"

// Routes
import indexRoutes from "./routes/index.routes.js"
import itemsRoutes from "./routes/items.routes.js"

const app = express()

app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use(itemsRoutes);

app.listen(process.env.PORT)
console.log(`Server is listening on port ${process.env.PORT}`)