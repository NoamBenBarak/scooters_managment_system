"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const parkingSchema = new mongoose_1.Schema({
    address: {
        city: { type: String, required: true, },
        street: { type: String, required: true },
        number: { type: Number, required: true },
    },
    capacity: { type: Number, required: true },
    currentParking: { type: Number, required: true },
    location: {
        type: { type: String, default: 'Polygon', required: true },
        coordinates: { type: [[[Number]]], required: true },
    },
});
parkingSchema.index({ location: '2dsphere' });
exports.default = (0, mongoose_1.model)('Parking', parkingSchema);
