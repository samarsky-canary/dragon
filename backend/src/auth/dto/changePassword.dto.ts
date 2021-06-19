import { IsString, IsNotEmpty, Matches, IsUUID } from "class-validator";

export class ChangePasswordDto {
    @IsUUID()
    readonly userid: string;

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Weak password' },
    )
    readonly newPassword: string;
}