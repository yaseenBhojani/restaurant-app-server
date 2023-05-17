import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateFoodDto } from '../dto/createFoodDto';
import { Food } from './food.schema';
import { FoodService } from './food.service';
import { RoleGuard } from '../auth/role.guard';
import { UpdateFoodDto } from '../dto/updateFoodDto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodsService: FoodService) {}

  @Get()
  async findAll(): Promise<Food[]> {
    try {
      return await this.foodsService.findAll();
    } catch (error) {
      console.error('Failed to retrieve foods:', error);
      throw new InternalServerErrorException('Failed to retrieve foods');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Food> {
    try {
      return await this.foodsService.findOne(id);
    } catch (error) {
      console.error(`Failed to retrieve food with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve food with ID');
    }
  }

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    try {
      return await this.foodsService.create(createFoodDto);
    } catch (error) {
      console.error('Failed to create food:', error);
      throw new InternalServerErrorException('Failed to create food');
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<Food> {
    try {
      return await this.foodsService.update(id, updateFoodDto);
    } catch (error) {
      console.error(`Failed to update food with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update food');
    }
  }

  @Delete(':id')
  @UseGuards(RoleGuard, AuthGuard)
  async delete(@Param('id') id: string): Promise<Food> {
    try {
      return await this.foodsService.remove(id);
    } catch (error) {
      console.error(`Failed to delete food with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete food');
    }
  }
}
