import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
  @IsString()
  @ApiProperty({ required: false })
  readonly id: string;
}
