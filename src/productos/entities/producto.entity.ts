import { Categoria } from "src/categorias/entities/categoria.entity";
import { BaseAuditoria } from "src/core/base-auditoria.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Producto extends BaseAuditoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column({ nullable: true })
    descripcion?: string;

    @Column({ nullable: true})
    imagen?: string;

    @Column({ default: "ACTIVO"})
    estado: string

    @ManyToOne(() => Categoria, categoria => categoria.productos)
    categoria: Categoria; // un producto pertenece a una categoria
}
