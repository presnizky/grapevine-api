import {IDonation, IPaymentMethod, ISubscription, IUser} from '@interfaces/dto'
import {Donation, PaymentMethod, Subscription, User} from '@models';

export function mapUser(user: User): IUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function mapPaymentMethod(paymentMethod: PaymentMethod): IPaymentMethod {
  return {
    id: paymentMethod.id,
    user: mapUser(paymentMethod.user),
    name: paymentMethod.name,
    creditCardNumber: paymentMethod.creditCardNumber,
    expirationDate: paymentMethod.expirationDate,
    ccv: paymentMethod.ccv,
    createdAt: paymentMethod.createdAt,
    updatedAt: paymentMethod.updatedAt,
  };
}

export function mapDonation(donation: Donation): IDonation {
  return {
    id: donation.id,
    user: donation.user ? mapUser(donation.user) : undefined,
    subscription: donation.subscription ? mapSubscription(donation.subscription) : undefined,
    paymentMethod: donation.paymentMethod ? mapPaymentMethod(donation.paymentMethod) : undefined,
    paymentDate: donation.paymentDate,
    amount: donation.amount,
    nextPaymentDate: donation.nextPaymentDate,
    createdAt: donation.createdAt,
    updatedAt: donation.updatedAt,
  };
}

export function mapDonations(donations: Donation[]): IDonation[] {
  return donations.map(mapDonation);
}

export function mapSubscription(subscription: Subscription): ISubscription {
  const today = new Date();
  const totalDonated = subscription.donations?.filter(d => d.paymentDate <= today).map(d => d.amount).reduce((total, amount) => total + amount, 0) || 0;

  return {
    id: subscription.id,
    user: mapUser(subscription.user),
    startDate: subscription.startDate,
    interval: subscription.interval,
    paymentMethod: subscription.paymentMethod ? mapPaymentMethod(subscription.paymentMethod) : undefined,
    amount: subscription.amount,
    donations: subscription.donations ? mapDonations(subscription.donations) : undefined,
    totalDonated,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  };
}
