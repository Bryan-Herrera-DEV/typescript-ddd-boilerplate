import { UsersCollection } from '@/Apps/users/infraestructure/UsersCollection'

type Dependencies = {
  usersCollection: UsersCollection
};

const makeUserRepository = ({ usersCollection }: Dependencies) => {

}

export { makeUserRepository }
