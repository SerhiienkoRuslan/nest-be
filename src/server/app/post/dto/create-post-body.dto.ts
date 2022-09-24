import { IsNotEmpty } from 'class-validator';

export class CreatePostBodyDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly published: boolean;
}
