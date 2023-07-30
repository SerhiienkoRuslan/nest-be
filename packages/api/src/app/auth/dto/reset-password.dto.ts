import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly newPassword: string;

  readonly newPasswordToken: string;

  readonly currentPassword: string;
}
