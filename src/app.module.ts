import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { CategoriesModule } from './categories/categories.module'; // Assuming you have a Categories module

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://palash:palash@dummy.wmyx8nx.mongodb.net/course-management?retryWrites=true&w=majority'), // Update with your MongoDB connection string
        CategoriesModule,
        SubcategoriesModule,
    ],
})
export class AppModule {}
