import userQueries from './user';
import donationQueries from './donation';
import subscriptionQueries from './subscription';

export default {
  ...userQueries,
  ...donationQueries,
  ...subscriptionQueries,
};
