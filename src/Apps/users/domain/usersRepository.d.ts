import { Users } from '@/Apps/users/domain/Users';
import { Repository } from '@/_lib/DDD';

type UsersRepository = Repository<Users.Type> & {
  findById(id: string): Promise<Users.Type>;
};

export { UsersRepository };
