import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(['Pending', 'Accepted', 'Rejected'])
  status: string;
}
