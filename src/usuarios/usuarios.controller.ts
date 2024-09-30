import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { validate } from 'class-validator';
import { validateUsuarioDto } from './dto/validate-usuario.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Crear Usuario'})
  @ApiResponse({ status: 200, description: 'Usuario Creado'})

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @ApiOperation({ summary: 'Login'})
  @ApiResponse({ status: 200, description: 'acces token'})
  @ApiResponse({ status: 404, description: 'no se encontro usuario'})
  @Post('/login')
  validation(@Body() validateUsuarioDto:validateUsuarioDto){
      return this.usuariosService.validarUsuario(validateUsuarioDto);
  }

  @ApiOperation({ summary: 'listar Usuarios'})
  @ApiResponse({ status: 200, description: 'lista de todos los usuarios'})
  @ApiResponse({ status: 404, description: 'no se encontro usuarios'})


  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }


  @ApiOperation({ summary: 'listar Usuarios por id'})
  @ApiResponse({ status: 200, description: 'lista usuario con id:'})
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @ApiOperation({ summary: 'actualizar Usuario'})
  @ApiResponse({ status: 200, description: 'usuario actualizado'})
  @ApiResponse({ status: 404, description: 'no encontrado'})

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }


  @ApiOperation({ summary: 'actualizar Usuario'})
  @ApiResponse({ status: 200, description: 'usuario actualizado'})
  @ApiResponse({ status: 404, description: 'usuariono encontrado'})

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}