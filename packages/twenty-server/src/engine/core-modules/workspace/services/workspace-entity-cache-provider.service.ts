import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CoreEntityCache } from 'src/engine/core-entity-cache/decorators/core-entity-cache.decorator';
import { CoreEntityCacheProvider } from 'src/engine/core-entity-cache/interfaces/core-entity-cache-provider.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

@Injectable()
@CoreEntityCache('workspaceEntity')
export class WorkspaceEntityCacheProviderService extends CoreEntityCacheProvider<WorkspaceEntity> {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
  ) {
    super();
  }

  async computeForCache(entityId: string): Promise<WorkspaceEntity | null> {
    return this.workspaceRepository.findOneBy({ id: entityId });
  }
}
