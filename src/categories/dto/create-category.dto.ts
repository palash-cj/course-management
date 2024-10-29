import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: 'Category name must not be empty' })
    @MaxLength(50, { message: 'Category name is too long' })
    name: string;
}
