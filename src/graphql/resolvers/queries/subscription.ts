import { ISubscription } from '@interfaces/dto';
import {SubscriptionService} from '@services';
import {mapSubscription} from '@mappers';


const subscriptions = async (_, { userId }): Promise<ISubscription[]> => {
  const subscriptions = await SubscriptionService.getSubscriptions(userId);
  return subscriptions.map(mapSubscription);
}

export default {
  subscriptions
}
