import { IsString, IsNotEmpty, MaxLength, IsMongoId } from 'class-validator';

export class CreateSubCategoryDto {
    @IsString()
    @IsNotEmpty({ message: 'Subcategory name must not be empty' })
    @MaxLength(50, { message: 'Subcategory name is too long' })
    name: string;

    @IsMongoId({ message: 'Invalid category ID format' })
    @IsNotEmpty({ message: 'Category ID is required' })
    categoryId: string;
}
