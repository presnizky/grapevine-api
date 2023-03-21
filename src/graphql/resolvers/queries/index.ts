import userQueries from './user';
import donationQueries from './donation';

export default {
  ...userQueries,
  ...donationQueries,
};
