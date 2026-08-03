import mongoose, { Schema } from 'mongoose';
import { CategoryType, ICategory } from '../types/category';

const categorySchema = new Schema<ICategory>({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    type: { 
        type: String, 
        enum: CategoryType, 
        required: true 
    },
    icon: { 
        type: String, 
        default: 'CircleDot'
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);