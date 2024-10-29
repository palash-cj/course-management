import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Category extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'SubCategory' }] })
    subCategories: Types.ObjectId[]; // Array to store references to subcategories
}

export const CategorySchema = SchemaFactory.createForClass(Category);
