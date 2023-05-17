import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Food, FoodDocument } from './food.schema';
import { CreateFoodDto } from '../dto/createFoodDto';
import { UpdateFoodDto } from '../dto/updateFoodDto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  /**
   * Creates a new food item.
   * @param createFoodDto The data for creating a food item.
   * @returns The created food item.
   * @throws An error if there was a problem creating the food item.
   */
  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    try {
      const createdFood = new this.foodModel(createFoodDto);
      return await createdFood.save();
    } catch (error) {
      throw new Error(`Failed to create food: ${error.message}`);
    }
  }

  /**
   * Retrieves all food items.
   * @returns An array of food items.
   * @throws An error if there was a problem retrieving the food items.
   */
  async findAll(): Promise<Food[]> {
    try {
      return await this.foodModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to find all foods: ${error.message}`);
    }
  }

  /**
   * Retrieves a food item by its ID.
   * @param id The ID of the food item.
   * @returns The found food item.
   * @throws An error if the food item with the specified ID was not found.
   */
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

  /**
   * Updates a food item by its ID.
   * @param id The ID of the food item.
   * @param updateFoodDto The data for updating the food item.
   * @returns The updated food item.
   * @throws An error if the food item with the specified ID was not found or if there was a problem updating it.
   */
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

  /**
   * Deletes a food item by its ID.
   * @param id The ID of the food item.
   * @returns The deleted food item.
   * @throws An error if the food item with the specified ID was not found or if there was a problem deleting it.
   */
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
