import {IDonation} from '@interfaces/dto'
import {Donation} from '@models';
import {mapUser, mapPaymentMethod, mapSubscription} from '@mappers'

function mapDonation(donation: Donation): IDonation {
    return {
      id: donation.id,
      user: donation.user ? mapUser(donation.user) : undefined,
      subscription: donation.subscription ? mapSubscription(donation.subscription) : undefined,
      paymentMethod: donation.paymentMethod ? mapPaymentMethod(donation.paymentMethod) : undefined,
      paymentDate: donation.paymentDate,
      amount: donation.amount,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt,
    };
  }
  
  export default (donations: Donation[]): IDonation[] => {
    return donations.map(mapDonation);
  }