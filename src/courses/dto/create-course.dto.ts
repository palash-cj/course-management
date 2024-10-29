import { IsString, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseDto {
    @IsString()
    name: string;

    @IsArray()
    categories: Types.ObjectId[];

    @IsArray()
    subCategories: Types.ObjectId[];
}
