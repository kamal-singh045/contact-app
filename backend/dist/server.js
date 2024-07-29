"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const contactsRoutes_1 = __importDefault(require("./routes/contactsRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5501;
(0, dbConnection_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", contactsRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => console.log(`Server is listening on the port ${PORT}`));
