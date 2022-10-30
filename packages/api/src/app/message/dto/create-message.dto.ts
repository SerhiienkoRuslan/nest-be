import { IsNotEmpty, IsString } from "class-validator";

/**
 * @class
 * Class represents user's post data object received from the user when creating a message.
 */
export class CreateMessageDTO {
  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  message: string;
}
