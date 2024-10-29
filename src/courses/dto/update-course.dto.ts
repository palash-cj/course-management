import { IsString, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    categories?: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    subCategories?: Types.ObjectId[];
}
