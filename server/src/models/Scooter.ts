import { Schema, model } from 'mongoose';

interface IScooter{
    uniqueId: string;
    location: {
        type: 'Polygon';
        coordinates: number[][][];
    };
    model: string;
    year: number;
    status: string;
}



const scooterSchema = new Schema({
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


export default model<IScooter>('Scooter', scooterSchema);
