import {User} from '@models';
import {UserService} from '@services';

const users = async (): Promise<User[]> => {
  const users = await UserService.getUsers();
  return users || [];
}

export default {
  users
}
