import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';
import { SubCategory, SubCategorySchema } from './schemas/subcategory.schema';
import { Category, CategorySchema } from '../categories/schemas/category.schema'; // Import Category Schema

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SubCategory.name, schema: SubCategorySchema },
            { name: Category.name, schema: CategorySchema }, // Register Category schema if needed
        ]),
    ],
    controllers: [SubcategoriesController],
    providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
