import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CreateFoodDto } from '../dto/createFoodDto';
import { Food } from './food.schema';
import { FoodService } from './food.service';
import { RoleGuard } from 'src/auth/role.guard';
import { UpdateFoodDto } from '../dto/updateFoodDto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodsService: FoodService) {}

  @Get()
  findAll(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Food> {
    return this.foodsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodsService.create(createFoodDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<Food> {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string): Promise<Food> {
    return this.foodsService.remove(id);
  }
}
