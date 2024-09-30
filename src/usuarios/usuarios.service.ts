import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validateUsuarioDto } from './dto/validate-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { Role } from 'src/roles/entities/role.entity';
import { ConflictException } from '@nestjs/common'; // Importar la excepción


@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private readonly roleRepository:Repository<Role>,
    private readonly jwtService: JwtService

  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Verificar si el correo ya existe en la base de datos
    const existeCorreo = await this.usuarioRepository.findOneBy({
      correo: createUsuarioDto.correo,
    });
  
    if (existeCorreo) {
      throw new ConflictException('El correo ya está en uso');
    }
  
    // Encriptar la clave
    createUsuarioDto.clave = await bcrypt.hash(createUsuarioDto.clave, 10);
  
    // Buscar roles en la base de datos
    const roles = await this.roleRepository.find({
      where: createUsuarioDto.roles.map((roleNombre) => ({ nombre: roleNombre })),
    });
  
    if (roles.length !== createUsuarioDto.roles.length) {
      throw new NotFoundException('No se encontraron los roles requeridos');
    }
  
    // Crear el usuario con los datos proporcionados
    const usuario = this.usuarioRepository.create({
      usuario: createUsuarioDto.usuario,
      clave: createUsuarioDto.clave,
      correo: createUsuarioDto.correo,
      roles: roles,
    });
  
    // Guardar el usuario en la base de datos
    return this.usuarioRepository.save(usuario);
  }

async validarUsuario(validateUsuarioDto: validateUsuarioDto): Promise<any> {
  const usuario = await this.usuarioRepository.findOne({ where: { usuario: validateUsuarioDto.usuario },relations:['roles'] });
  const clav=await this.usuarioRepository.findOne({where:{clave: validateUsuarioDto.clave}})

  if (!usuario) {
    throw new NotFoundException('No se pudo verificar el usuario');
  }
  
  const esClaveValida = await bcrypt.compare(validateUsuarioDto.clave, usuario.clave);
  

  if (esClaveValida) {
  
    const nombreRoles=usuario.roles.map(role => role.nombre);
    const payload = {
      usuario: usuario.usuario,
      id: usuario.id,
      roles: nombreRoles
    }
    return {
      access_token: this.jwtService.sign(payload)
    };
    
  }
    return 'No se encontro el usuario';

}

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({where:{id}});
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    
    if (!usuario) {
      throw new NotFoundException(`El usuario con ID ${id} no fue encontrado.`);
    }

    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`El usuario con ID ${id} no fue encontrado.`);
    }

    await this.usuarioRepository.remove(usuario);
  }
}