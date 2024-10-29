import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    subCategories?: string[];
}
