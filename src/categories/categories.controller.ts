import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.createCategory(createCategoryDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.updateCategory(id, updateCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAllCategories();
    }

    @Get('subcategory-count')
    getCategoryWithSubcategoryCount() {
        return this.categoriesService.getCategoryWithSubcategoryCount();
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        await this.categoriesService.deleteCategory(id);
        return { message: 'Category deleted successfully' };
    }
}
