import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { User, PaymentType} from '@models';

@Entity('userPaymentTypes')
export class UserPaymentType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, (user) => user.id)
    user: User;
    
    @ManyToOne(() => PaymentType, (paymentType) => paymentType.id)
    paymentType: PaymentType;
    
    @Column()
    paymentNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}