import { IsArray, IsString, isArray,IsEmail } from "class-validator";

export class CreateUsuarioDto {

    @IsString({message: 'El nombre debe ser texto'})
    usuario:string;

    @IsString({message: 'La clave debe ser texto'})
    clave:string;

    @IsEmail({}, { message: 'El correo debe ser un email válido'})
    correo: string;

    @IsArray()
    @IsString({each:true})
    roles: string[];
}