import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Donation, Subscription, User } from '@models';

@Entity('paymentMethods')
export class PaymentMethod extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    name: string;

    @Column()
    creditCardNumber: string;

    @Column()
    expirationDate: Date;

    @Column()
    ccv: number;

    @OneToMany(() => Subscription, (subscription) => subscription.user)
    subscriptions: Subscription[]

    @OneToMany(() => Donation, (donation) => donation.user)
    donations: Donation[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}