import { ISubscription } from "@interfaces/dto";
import { SubscriptionService } from "@services";
import {mapSubscription} from '@mappers';

const charge_subscription = async (_root, { donation }): Promise<ISubscription> => { 
    const subscription = await SubscriptionService.chargeSubscription(donation);
    return mapSubscription(subscription);
  };

  const update_subscription = async (_root, { subscription }): Promise<ISubscription> => {
    const updatedSubscription = await SubscriptionService.updateSubscription(subscription);
    return mapSubscription(updatedSubscription);
  };

  export default {
    charge_subscription,
    update_subscription,
  };
  