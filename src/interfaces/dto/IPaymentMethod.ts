import { IPaymentMethod, ISubscription, IUser } from './';

export default interface IDonation {
    id: number;
    name: String;
    creditCardNumber: String;
    expirationDate: Date;
    ccv: number;
    createdAt: Date;
    updatedAt: Date; 
}
