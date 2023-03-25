import { IUser, IPaymentMethod, IDonation } from './';

export default interface ISubscription {
    id: number;
    user?: IUser;
    startDate: Date;
    interval: string;
    paymentMethod?: IPaymentMethod;
    amount: number;
    nextPaymentDate?: Date;
    donations?: IDonation[];
    totalDonated?: number;
    createdAt: Date;
    updatedAt: Date;
}
