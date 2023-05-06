import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Food, FoodDocument } from './food.schema';
import { CreateFoodDto } from '../dto/createFoodDto';
import { UpdateFoodDto } from '../dto/updateFoodDto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    try {
      const createdFood = new this.foodModel(createFoodDto);
      return await createdFood.save();
    } catch (error) {
      throw new Error(`Failed to create food: ${error.message}`);
    }
  }

  async findAll(): Promise<Food[]> {
    try {
      return await this.foodModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to find all foods: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Food> {
    try {
      const food = await this.foodModel.findById(id).exec();
      if (!food) {
        throw new Error(`Food with id ${id} not found`);
      }
      return food;
    } catch (error) {
      throw new Error(`Failed to find food with id ${id}: ${error.message}`);
    }
  }

  async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    try {
      const updatedFood = await this.foodModel
        .findByIdAndUpdate(id, updateFoodDto, { new: true })
        .exec();
      if (!updatedFood) {
        throw new Error(`Food with id ${id} not found`);
      }
      return updatedFood;
    } catch (error) {
      throw new Error(`Failed to update food with id ${id}: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Food> {
    try {
      const deletedFood = await this.foodModel.findByIdAndRemove(id).exec();
      if (!deletedFood) {
        throw new Error(`Food with id ${id} not found`);
      }
      return deletedFood;
    } catch (error) {
      throw new Error(`Failed to delete food with id ${id}: ${error.message}`);
    }
  }
}
