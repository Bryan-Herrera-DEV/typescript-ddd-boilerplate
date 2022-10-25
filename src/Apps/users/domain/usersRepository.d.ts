import { Repository } from '@/_lib/DDD';

type UsersRepository = Repository<> & {
  findById(id: string): Promise<>;
};

export { ArticleRepository };
