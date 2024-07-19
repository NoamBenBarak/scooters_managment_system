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
exports.deleteFailureById = exports.updateFailureById = exports.getFailureById = exports.getAllFailures = exports.getFailureHistoryByScooterId = exports.getActiveFailuresByScooterId = exports.createNewFailure = void 0;
const Failure_1 = __importDefault(require("../models/Failure"));
// Create a new failure
const createNewFailure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, status, openingTime, closingTime, scooterId } = req.body;
        const newFailure = new Failure_1.default({
            type,
            status,
            openingTime,
            closingTime: closingTime ? closingTime : null,
            scooterId
        });
        const savedFailure = yield newFailure.save();
        res.status(201).json(savedFailure);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create failure' });
    }
});
exports.createNewFailure = createNewFailure;
// Get active failures by scooterId
const getActiveFailuresByScooterId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { scooterId } = req.params;
        const failures = yield Failure_1.default.find({ scooterId, status: 'open' });
        res.json(failures);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve active failures' });
    }
});
exports.getActiveFailuresByScooterId = getActiveFailuresByScooterId;
// Get failure history by scooterId
const getFailureHistoryByScooterId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { scooterId } = req.params;
        const failures = yield Failure_1.default.find({ scooterId }).sort({ openingTime: 1 });
        res.json(failures);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve failure history' });
    }
});
exports.getFailureHistoryByScooterId = getFailureHistoryByScooterId;
// Get all failures
const getAllFailures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failures = yield Failure_1.default.find();
        res.json(failures);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all failures' });
    }
});
exports.getAllFailures = getAllFailures;
// Get a specific failure by ID
const getFailureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const failure = yield Failure_1.default.findById(id);
        if (!failure) {
            return res.status(404).json({ error: 'Failure not found' });
        }
        res.json(failure);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve failure' });
    }
});
exports.getFailureById = getFailureById;
// Update a failure by ID
const updateFailureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { type, status, openingTime, closingTime, scooterId } = req.body;
        const updatedFailure = yield Failure_1.default.findByIdAndUpdate(id, {
            type,
            status,
            openingTime,
            closingTime: closingTime ? closingTime : null,
            scooterId
        }, { new: true });
        if (!updatedFailure) {
            return res.status(404).json({ error: 'Failure not found' });
        }
        res.json(updatedFailure);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update failure' });
    }
});
exports.updateFailureById = updateFailureById;
// Delete a failure by ID
const deleteFailureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedFailure = yield Failure_1.default.findByIdAndDelete(id);
        if (!deletedFailure) {
            return res.status(404).json({ error: 'Failure not found' });
        }
        res.json({ message: 'Failure deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete failure' });
    }
});
exports.deleteFailureById = deleteFailureById;
