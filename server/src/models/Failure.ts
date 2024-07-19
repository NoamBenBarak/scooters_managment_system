
import { Schema, model } from 'mongoose';

export interface IFailure  {
    type: string;
    status: string;
    openingTime: string;
    closingTime?: string;
    scooterId: Schema.Types.ObjectId;
}

const failureSchema = new Schema({
    type: { type: String, enum: ['routine care', 'brake replacement', 'wheel replacement'], required: true },
    status: { type: String, enum: ['open', 'care', 'closed'], required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String },
    scooterId: { type: String, ref: 'Scooter', required: true }
});

export default model<IFailure>('Failure', failureSchema);
