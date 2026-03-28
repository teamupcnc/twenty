import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CoreEntityCache } from 'src/engine/core-entity-cache/decorators/core-entity-cache.decorator';
import { CoreEntityCacheProvider } from 'src/engine/core-entity-cache/interfaces/core-entity-cache-provider.service';
import { type FlatAuthContextUser } from 'src/engine/core-modules/auth/types/flat-auth-context-user.type';
import { fromAuthContextUserToFlat } from 'src/engine/core-modules/auth/utils/from-auth-context-user-to-flat.util';
import { AUTH_CONTEXT_USER_SELECT_FIELDS } from 'src/engine/core-modules/auth/constants/auth-context-user-select-fields.constants';
import { UserEntity } from 'src/engine/core-modules/user/user.entity';

@Injectable()
@CoreEntityCache('authContextUser')
export class UserEntityCacheProviderService extends CoreEntityCacheProvider<FlatAuthContextUser> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async computeForCache(entityId: string): Promise<FlatAuthContextUser | null> {
    const entity = await this.userRepository.findOne({
      where: { id: entityId },
      select: [...AUTH_CONTEXT_USER_SELECT_FIELDS],
    });

    if (entity === null) {
      return null;
    }

    return fromAuthContextUserToFlat(entity);
  }
}
