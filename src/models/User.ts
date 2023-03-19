import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Country, DocumentType, State} from '@models';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    lastName: string;

    @ManyToOne(() => DocumentType, (documentType) => documentType.id)
    documentType: DocumentType;

    @Column()
    documentNumber: string;
    
    @Column()
    city: string;

    @ManyToOne(() => State, (state) => state.id)
    state: State;

    @ManyToOne(() => Country, (country) => country.id)
    country: Country;

    @Column()
    phoneNumber: string;

    @Column()
    whatsapp: string;

    @Column()
    email: string;

    @Column()
    facebook: string;

    @Column()
    twitter: string;

    @Column()
    instagram: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}