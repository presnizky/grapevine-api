import {Donation} from '@models';
import {DonationService} from '@services';

const donations = async (): Promise<Donation[]> => {
  const donations = await DonationService.getDonations();
  return donations || [];
}

export default {
  donations
}
