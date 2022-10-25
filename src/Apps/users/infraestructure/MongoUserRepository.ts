import { UsersCollection } from '@/Apps/users/infraestructure/UsersCollection'
import { UsersId } from '@/_sharedKernel/domain/UsersId';
import { UsersRepository } from '../domain/usersRepository';
import { from, v4 } from 'uuid-mongodb';
import { UsersIdProvider } from '@/_sharedKernel/infraestructure/UsersIdProvider';
import { Users } from '../domain/Users';
import { NotFoundError } from '@/_lib/errors/NotFoundError';

type Dependencies = {
  usersCollection: UsersCollection
};

const makeUserRepository = ({ usersCollection }: Dependencies): UsersRepository => ({
  async getNextId(): Promise<UsersId>{
    return Promise.resolve(UsersIdProvider.create(v4().toString()));
  },
  async findById(id: string): Promise<Users.Type> {
    const user = await usersCollection.findOne({ _id: from(id), deleted: false });

    if (!user) {
      throw NotFoundError.create();
    }

  },
  async store(entity: Users.Type): Promise<void> {},
})

export { makeUserRepository }
