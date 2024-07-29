import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection";
import errorHandler from "./middlewares/errorHandler";
import contactRoutes from "./routes/contactsRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5501;

dbConnection();

app.use(express.json());
app.use(cors());
app.use("/", contactRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on the port ${PORT}`));
