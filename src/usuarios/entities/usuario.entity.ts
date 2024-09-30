import { Entity,Column,PrimaryGeneratedColumn,ManyToMany,JoinTable } from "typeorm";
import { Role } from "src/roles/entities/role.entity";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: string;

    @Column()
    clave: string;

    @Column({ nullable: true })
    correo: string;

    @ManyToMany(()=>Role)
    @JoinTable()
    roles:Role[];
    

}