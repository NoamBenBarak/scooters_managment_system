import { Schema, model } from 'mongoose';

export interface IParking  {
    address: {city: string, street: string, number: number};
    capacity: number;
    currentParking: number;
    location: {
        type: 'Polygon';
        coordinates: number[][][];
    };
}

const parkingSchema = new Schema({
    address: { 
        city: {type: String, required: true, },
        street: {type: String, required: true},
        number: {type: Number, required: true},
        },
    capacity: { type: Number, required: true },
    currentParking: { type: Number, required: true },
    location: {
        type: { type: String, default: 'Polygon', required: true },
        coordinates: { type: [[[Number]]], required: true },
    },
});


parkingSchema.index({ location: '2dsphere' });

export default model<IParking>('Parking', parkingSchema);
