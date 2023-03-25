import {IUser} from '@interfaces/dto'
import {User} from '@models';

export default (user: User): IUser => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }