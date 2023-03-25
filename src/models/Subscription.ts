import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Donation, PaymentMethod, User } from '@models';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  startDate: Date;

  @Column()
  interval: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.id)
  paymentMethod: PaymentMethod;

  @Column()
  amount: number;

  @Column()
  nextPaymentDate: Date;

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}