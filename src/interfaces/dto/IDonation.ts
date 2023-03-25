import { IPaymentMethod, ISubscription, IUser } from './';

export default interface IDonation {
    id: number;
    user?: IUser;
    subscription?: ISubscription;
    paymentMethod?: IPaymentMethod;
    paymentDate?: Date;
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
