import { Article } from '@/article/domain/Article';
import { Repository } from '@/_lib/DDD';

type UsersRepository = Repository<> & {
  findById(id: string): Promise<>;
};

export { ArticleRepository };
