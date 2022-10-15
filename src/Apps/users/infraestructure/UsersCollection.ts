import { Collection, Db } from "mongodb";
import { MUUID } from "uuid-mongodb";

type UsersSchema = {
  _id: MUUID;
  nombre: string,
  user_name: string;
  email: string;
  password: string;
  status: 'ACTIVE', 'DISABLED';
  createdAt: Date;
  updatedAt: Date;
}

type UsersCollection = Collection<UsersSchema>;

const initUsersCollection = async(db: Db): Promise<UsersCollection> => {
  const collection: UsersCollection = db.collection('users');

  await collection.createIndex({ nombre: 1 }, { unique: true });
  await collection.createIndex({ _id: 1, version: 1 });
  await collection.createIndex({ email: 1 }, { unique: true });

  return collection;
}

export { initUsersCollection };
export type { UsersSchema, UsersCollection };
