import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CoreEntityCache } from 'src/engine/core-entity-cache/decorators/core-entity-cache.decorator';
import { CoreEntityCacheProvider } from 'src/engine/core-entity-cache/interfaces/core-entity-cache-provider.service';
import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';

@Injectable()
@CoreEntityCache('userWorkspaceEntity')
export class UserWorkspaceEntityCacheProviderService extends CoreEntityCacheProvider<UserWorkspaceEntity> {
  constructor(
    @InjectRepository(UserWorkspaceEntity)
    private readonly userWorkspaceRepository: Repository<UserWorkspaceEntity>,
  ) {
    super();
  }

  async computeForCache(entityId: string): Promise<UserWorkspaceEntity | null> {
    return this.userWorkspaceRepository.findOne({
      where: { id: entityId },
    });
  }
}
