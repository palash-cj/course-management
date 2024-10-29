import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './schemas/subcategory.schema';
import { Category } from '../categories/schemas/category.schema';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
    constructor(
        @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>,
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    ) {}

    // Method to create a new subcategory and add its ID to the category's subCategories array
    async create(createSubCategoryDto: CreateSubCategoryDto): Promise<SubCategory> {
        // Check if the provided categoryId exists
        const category = await this.categoryModel.findById(createSubCategoryDto.categoryId);
        if (!category) {
            throw new NotFoundException(`Category with ID ${createSubCategoryDto.categoryId} not found`);
        }

        // Create the subcategory and save it
        const subCategory = new this.subCategoryModel(createSubCategoryDto);
        const savedSubCategory = await subCategory.save();

        // Update the category to add the new subcategory's ID
        await this.categoryModel.findByIdAndUpdate(createSubCategoryDto.categoryId, {
            $push: { subCategories: savedSubCategory._id },
        });

        return savedSubCategory;
    }

    // Method to update an existing subcategory
    async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto): Promise<SubCategory> {
        const updatedSubCategory = await this.subCategoryModel.findByIdAndUpdate(id, updateSubCategoryDto, { new: true });
        if (!updatedSubCategory) {
            throw new NotFoundException(`Subcategory with ID ${id} not found`);
        }
        return updatedSubCategory;
    }

    // Method to retrieve a subcategory by ID
    async findById(id: string): Promise<SubCategory> {
        const subCategory = await this.subCategoryModel.findById(id);
        if (!subCategory) {
            throw new NotFoundException(`Subcategory with ID ${id} not found`);
        }
        return subCategory;
    }

    // Method to retrieve all subcategories
    async findAll(): Promise<SubCategory[]> {
        return this.subCategoryModel.find().exec();
    }

    // Method to delete a subcategory by ID
    async delete(id: string): Promise<void> {
        const result = await this.subCategoryModel.findByIdAndDelete(id);
        if (!result) {
            throw new NotFoundException(`Subcategory with ID ${id} not found`);
        }

        // Optionally, remove the subcategory ID from the category's subCategories array
        await this.categoryModel.updateMany(
            { subCategories: id },
            { $pull: { subCategories: id } }
        );
    }
}
