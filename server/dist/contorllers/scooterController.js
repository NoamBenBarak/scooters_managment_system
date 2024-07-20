"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScooter = exports.updateScooter = exports.filterAvailableScooters = exports.filterScootersByPolygon = exports.createScooter = exports.getAllScooters = void 0;
const Scooter_1 = __importDefault(require("../models/Scooter"));
// Get all scooters
const getAllScooters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scooters = yield Scooter_1.default.find();
        res.json(scooters);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.getAllScooters = getAllScooters;
// Create a new scooter
const createScooter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uniqueId, location, model, year, status } = req.body;
        // Check for required fields
        if (!uniqueId || !location || !model || !year || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newScooter = new Scooter_1.default({
            uniqueId,
            location,
            model,
            year,
            status
        });
        const savedScooter = yield newScooter.save();
        res.status(201).json(savedScooter);
    }
    catch (error) {
        console.error('Error creating scooter:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.createScooter = createScooter;
// Filter scooters by polygon
const filterScootersByPolygon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { polygon } = req.body;
        if (!polygon) {
            return res.status(400).json({ error: 'Polygon is required' });
        }
        const scooters = yield Scooter_1.default.find({
            location: {
                $geoWithin: {
                    $geometry: polygon,
                },
            },
        });
        res.json(scooters);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.filterScootersByPolygon = filterScootersByPolygon;
// Filter available scooters
const filterAvailableScooters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scooters = yield Scooter_1.default.find({ status: 'active' });
        res.json(scooters);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.filterAvailableScooters = filterAvailableScooters;
// Update a scooter by ID
const updateScooter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const scooter = yield Scooter_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!scooter) {
            return res.status(404).json({ error: 'Scooter not found' });
        }
        res.json(scooter);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.updateScooter = updateScooter;
// Delete a scooter by ID
const deleteScooter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const scooter = yield Scooter_1.default.findByIdAndDelete(id);
        if (!scooter) {
            return res.status(404).json({ error: 'Scooter not found' });
        }
        res.json({ message: 'Scooter deleted' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.deleteScooter = deleteScooter;
