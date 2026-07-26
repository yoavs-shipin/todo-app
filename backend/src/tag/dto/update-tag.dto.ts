import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/)
  @IsOptional()
  color?: string;
}
