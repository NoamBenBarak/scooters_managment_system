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
exports.deleteParkingSpotById = exports.updateParkingSpotById = exports.getParkingSpotById = exports.getParkingAvailability = exports.createNewParkingSpot = exports.getAllParkingSpots = void 0;
const Parking_1 = __importDefault(require("../models/Parking"));
// Get all parking spots
const getAllParkingSpots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkingSpots = yield Parking_1.default.find();
        res.json(parkingSpots);
    }
    catch (error) {
        console.error('Error fetching parking spots:', error);
        res.status(500).json({ error: 'Failed to retrieve parking spots' });
    }
});
exports.getAllParkingSpots = getAllParkingSpots;
// Create a new parking spot
const createNewParkingSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address, location, capacity, currentParking } = req.body;
        const newParking = new Parking_1.default({
            address,
            location,
            capacity,
            currentParking
        });
        const savedParking = yield newParking.save();
        res.status(201).json(savedParking);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create new parking spot' });
    }
});
exports.createNewParkingSpot = createNewParkingSpot;
// Get parking availability
const getParkingAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parkingSpots = yield Parking_1.default.find();
        const parkingData = parkingSpots.map((spot) => ({
            address: spot.address,
            availableSpaces: spot.capacity - spot.currentParking
        }));
        res.json(parkingData);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all the available parkings' });
    }
});
exports.getParkingAvailability = getParkingAvailability;
// Get a parking spot by ID
const getParkingSpotById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parkingSpot = yield Parking_1.default.findById(id);
        if (!parkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }
        res.json(parkingSpot);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve parking spot' });
    }
});
exports.getParkingSpotById = getParkingSpotById;
// Update a parking spot by ID
const updateParkingSpotById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { address, location, capacity, currentParking } = req.body;
        const updatedParkingSpot = yield Parking_1.default.findByIdAndUpdate(id, {
            address,
            location,
            capacity,
            currentParking
        }, { new: true });
        if (!updatedParkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }
        res.json(updatedParkingSpot);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update parking spot' });
    }
});
exports.updateParkingSpotById = updateParkingSpotById;
// Delete a parking spot by ID
const deleteParkingSpotById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedParkingSpot = yield Parking_1.default.findByIdAndDelete(id);
        if (!deletedParkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }
        res.json({ message: 'Parking spot deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete parking spot' });
    }
});
exports.deleteParkingSpotById = deleteParkingSpotById;
