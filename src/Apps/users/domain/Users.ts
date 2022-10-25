import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { UsersId } from '@/_sharedKernel/domain/UsersId';

namespace Users {
  type Users = AggregateRoot<UsersId> &
    Readonly<{
      nombre: string,
      user_name: string;
      email: string;
      password: string;
      status: 'ACTIVE' | 'DISABLED';
      createdAt: Date | null;
      updatedAt: Date | null;
    }>;

  type ActiveUser = Omit<Users, 'createdAt' | 'status'> & Readonly<{ status: 'ACTIVE'; createdAt: Date }>;

  const withInvariants = makeWithInvariants<Users>((self, assert) => {
    assert(self.nombre?.length > 0);
    assert(self.user_name?.length > 0);
    assert(self.email?.length > 0);
  });

  type UsersProps = Readonly<{
    id: UsersId;
    nombre: string;
    user_name: string;
    email: string;
    password: string;
  }>;

  export const create = withInvariants(
    (props: UsersProps): Users => ({
      id: props.id,
      nombre: props.nombre,
      user_name: props.user_name,
      email: props.email,
      password: props.password,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),

    })
  );

  export const publish = withInvariants(
    (self: Users): ActiveUser => ({
      ...self,
      status: 'ACTIVE',
      createdAt: new Date(),
    })
  );

  export const markAsDeleted = withInvariants(
    (self: Users): Users => ({
      ...self,
      status: 'DISABLED',
    })
  );

  export const nombre = withInvariants(
    (self: Users, nombre: string): Users => ({
      ...self,
      nombre,
    })
  );

  export const isPublished = (self: Users): self is ActiveUser => self.status === 'ACTIVE';

  export type Type = Users;
}

export { Users };
