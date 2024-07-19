"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scooterSchema = new mongoose_1.Schema({
    uniqueId: { type: String, required: true, unique: true },
    location: {
        type: { type: String, default: 'Polygon', required: true },
        coordinates: { type: [[[Number]]], required: true },
    },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ['active', 'broken', 'handled', 'charged'], required: true }
});
scooterSchema.index({ location: '2dsphere' });
exports.default = (0, mongoose_1.model)('Scooter', scooterSchema);
