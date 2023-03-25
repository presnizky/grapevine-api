import { Donation, PaymentMethod, Subscription } from '@models';
import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
    paymentMethods: PaymentMethod[]

    @OneToMany(() => Subscription, (subscription) => subscription.user)
    subscriptions: Subscription[]

    @OneToMany(() => Donation, (donation) => donation.user)
    donations: Donation[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}