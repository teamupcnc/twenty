import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CoreEntityCache } from 'src/engine/core-entity-cache/decorators/core-entity-cache.decorator';
import { CoreEntityCacheProvider } from 'src/engine/core-entity-cache/interfaces/core-entity-cache-provider.service';
import { AUTH_CONTEXT_USER_SELECT_FIELDS } from 'src/engine/core-modules/auth/constants/auth-context-user-select-fields.constants';
import { type AuthContextUser } from 'src/engine/core-modules/auth/types/auth-context-user.type';
import { UserEntity } from 'src/engine/core-modules/user/user.entity';

@Injectable()
@CoreEntityCache('authContextUser')
export class UserEntityCacheProviderService extends CoreEntityCacheProvider<AuthContextUser> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async computeForCache(entityId: string): Promise<AuthContextUser | null> {
    return this.userRepository.findOne({
      where: { id: entityId },
      select: [...AUTH_CONTEXT_USER_SELECT_FIELDS],
    });
  }
}
