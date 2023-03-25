import { ISubscription } from '@interfaces/dto';
import {SubscriptionService} from '@services';
import {mapSubscription} from '@mappers';

const subscription = async (_, { userId, subscriptionId }): Promise<ISubscription> => {
  const foundSubscription = await SubscriptionService.getSubscription(userId, subscriptionId);
  return mapSubscription(foundSubscription);
}

const subscriptions = async (_, { userId }): Promise<ISubscription[]> => {
  const subscriptions = await SubscriptionService.getSubscriptions(userId);
  return subscriptions.map(mapSubscription);
}

export default {
  subscriptions,
  subscription
}
