"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const failureSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['routine care', 'brake replacement', 'wheel replacement'], required: true },
    status: { type: String, enum: ['open', 'care', 'closed'], required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String },
    scooterId: { type: String, ref: 'Scooter', required: true }
});
exports.default = (0, mongoose_1.model)('Failure', failureSchema);
