import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateSubCategoryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsMongoId() // Validates that it's a MongoDB ObjectId
    categoryId?: Types.ObjectId; // Reference to the parent category
}
