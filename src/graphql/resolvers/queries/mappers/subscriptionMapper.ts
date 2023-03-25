import {ISubscription} from '@interfaces/dto'
import {Subscription} from '@models';
import {mapUser, mapPaymentMethod, mapDonations} from '@mappers'

export default (subscription: Subscription): ISubscription => {
    const today = new Date();
    const totalDonated = subscription.donations?.filter(d => d.paymentDate <= today).map(d => d.amount).reduce((total, amount) => total + amount, 0) || 0;
  
    return {
      id: subscription.id,
      user: subscription.user ? mapUser(subscription.user): undefined,
      startDate: subscription.startDate,
      interval: subscription.interval,
      paymentMethod: subscription.paymentMethod ? mapPaymentMethod(subscription.paymentMethod) : undefined,
      amount: subscription.amount,
      nextPaymentDate: subscription.nextPaymentDate,
      donations: subscription.donations ? mapDonations(subscription.donations) : undefined,
      totalDonated,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    };
  }