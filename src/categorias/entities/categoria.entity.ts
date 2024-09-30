import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Producto } from "src/productos/entities/producto.entity";
import { BaseAuditoria } from "src/core/base-auditoria.entity";

@Entity()
export class Categoria extends BaseAuditoria{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    nombre: string;

    @Column({ default: "ACTIVO"})
    estado: string;

    @OneToMany(() => Producto, producto => producto.categoria )
    productos: Producto[]; // Una categoria puede tener varios productos
}
