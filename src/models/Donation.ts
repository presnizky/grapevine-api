import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { PaymentMethod, Subscription, User } from '@models';

@Entity('donations')
export class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
  
  @ManyToOne(() => Subscription, (subscription) => subscription.id)
  subscription: Subscription;
  
  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.id)
  paymentMethod: PaymentMethod;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}