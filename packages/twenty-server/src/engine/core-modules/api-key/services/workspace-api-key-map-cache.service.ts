import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkspaceCacheProvider } from 'src/engine/workspace-cache/interfaces/workspace-cache-provider.service';

import { ApiKeyEntity } from 'src/engine/core-modules/api-key/api-key.entity';
import { WorkspaceCache } from 'src/engine/workspace-cache/decorators/workspace-cache.decorator';

@Injectable()
@WorkspaceCache('apiKeyMap')
export class WorkspaceApiKeyMapCacheService extends WorkspaceCacheProvider<
  Record<string, ApiKeyEntity>
> {
  constructor(
    @InjectRepository(ApiKeyEntity)
    private readonly apiKeyRepository: Repository<ApiKeyEntity>,
  ) {
    super();
  }

  async computeForCache(
    workspaceId: string,
  ): Promise<Record<string, ApiKeyEntity>> {
    const apiKeys = await this.apiKeyRepository.find({
      where: { workspaceId },
    });

    return apiKeys.reduce(
      (map, apiKey) => {
        map[apiKey.id] = apiKey;

        return map;
      },
      {} as Record<string, ApiKeyEntity>,
    );
  }
}
