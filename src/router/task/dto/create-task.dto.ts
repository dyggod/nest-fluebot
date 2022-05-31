import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  readonly tName: string;

  @IsString()
  @ApiProperty()
  readonly tContent: string;

  // @IsString()
  // @ApiProperty()
  // readonly number: number;
}
