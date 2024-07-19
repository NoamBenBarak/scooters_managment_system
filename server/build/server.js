"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const scooterRoutes_1 = __importDefault(require("./routes/scooterRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const parkingRoutes_1 = __importDefault(require("./routes/parkingRoutes"));
const failureRoutes_1 = __importDefault(require("./routes/failureRoutes"));
const loginUserRoutes_1 = __importDefault(require("./routes/loginUserRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
    throw new Error('MONGO_URL is not defined in .env file');
}
mongoose_1.default.connect(mongoURL, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/scooters', scooterRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/parkings', parkingRoutes_1.default);
app.use('/failures', failureRoutes_1.default);
app.use('/auth', loginUserRoutes_1.default);
app.get('/', (req, res) => {
    console.log(req.body);
    res.json({ msg: 'Welcome to the SCOOTER app' });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
