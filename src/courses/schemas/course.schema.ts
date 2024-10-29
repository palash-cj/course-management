import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Course extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
    categories: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'SubCategory' }] })
    subCategories: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
