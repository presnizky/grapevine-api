import { IPaymentMethod, ISubscription, IDonation } from './';

export default interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    paymentMethods?: IPaymentMethod[]
    subscriptions?: ISubscription[]
    donations?: IDonation[]
    createdAt: Date;
    updatedAt: Date;
}
