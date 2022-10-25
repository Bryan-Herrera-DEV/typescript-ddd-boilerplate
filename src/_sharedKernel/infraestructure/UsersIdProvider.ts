import { makeIdProvider } from '@/_lib/IdProvider';
import { UsersId } from '@/_sharedKernel/domain/UsersId';

const UsersIdProvider = makeIdProvider<UsersId>('UsersId');

export { UsersIdProvider };
