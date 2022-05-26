import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
  @IsString()
  @ApiProperty()
  readonly userId: string;
}
