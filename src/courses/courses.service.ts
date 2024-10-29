import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<Course>,
    ) {}

    async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
        const course = new this.courseModel(createCourseDto);
        return course.save();
    }

    async updateCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true });
    }

    async findAllCourses(): Promise<Course[]> {
        return this.courseModel.find().populate('categories').populate('subCategories').exec();
    }

    async findOneCourse(id: string): Promise<Course> {
        return this.courseModel.findById(id).populate('categories').populate('subCategories').exec();
    }
}
