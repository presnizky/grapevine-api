import { AppDataSource } from "@db";
import { User } from '@models';

class UserService {
    public static async getUsers(): Promise<User[]> {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find();
        return users;
    }
}

export default UserService;