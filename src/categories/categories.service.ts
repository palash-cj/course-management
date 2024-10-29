import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    }

    async findAllCategories() {
        return this.categoryModel.find().populate('subCategories').exec();
    }

    async getCategoryWithSubcategoryCount() {
        return this.categoryModel.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subCategories',
                    foreignField: '_id',
                    as: 'subCategoryData'
                }
            },
            {
                $project: {
                    name: 1,
                    subCategoryCount: { $size: '$subCategoryData' }
                }
            }
        ]);
    }

    async deleteCategory(id: string): Promise<void> {
        const result = await this.categoryModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}
