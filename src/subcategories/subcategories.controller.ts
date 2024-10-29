import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UsePipes,
    ValidationPipe,
    NotFoundException,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { SubCategory } from './schemas/subcategory.schema';

@Controller('subcategories')
export class SubcategoriesController {
    constructor(private readonly subcategoriesService: SubcategoriesService) {}

    // Create a new subcategory
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory> {
        return this.subcategoriesService.create(createSubCategoryDto);
    }

    // Retrieve all subcategories
    @Get()
    async findAllSubCategories(): Promise<SubCategory[]> {
        return this.subcategoriesService.findAll();
    }

    // Retrieve a single subcategory by ID
    @Get(':id')
    async findSubCategoryById(@Param('id') id: string): Promise<SubCategory> {
        const subCategory = await this.subcategoriesService.findById(id);
        if (!subCategory) {
            throw new NotFoundException(`Subcategory with ID ${id} not found`);
        }
        return subCategory;
    }

    // Update an existing subcategory by ID
    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateSubCategory(
        @Param('id') id: string,
        @Body() updateSubCategoryDto: UpdateSubCategoryDto,
    ): Promise<SubCategory> {
        return this.subcategoriesService.update(id, updateSubCategoryDto);
    }

    // Delete a subcategory by ID
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteSubCategory(@Param('id') id: string): Promise<void> {
        await this.subcategoriesService.delete(id);
    }
}
