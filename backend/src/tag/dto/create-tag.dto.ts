import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/)
  color!: string;
}
