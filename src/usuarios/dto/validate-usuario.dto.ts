import { IsString } from "class-validator";
import { Usuario } from "../entities/usuario.entity";

export class validateUsuarioDto {

    @IsString({message: 'El nombre debe ser texto'})
    usuario:string;

    @IsString({message: 'La clave debe ser texto'})
    clave:string;
}