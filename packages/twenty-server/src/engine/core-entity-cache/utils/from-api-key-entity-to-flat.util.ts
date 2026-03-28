import { type ApiKeyEntity } from 'src/engine/core-modules/api-key/api-key.entity';
import { type FlatApiKeyEntity } from 'src/engine/core-entity-cache/types/flat-api-key-entity.type';

export const fromApiKeyEntityToFlat = (
  entity: ApiKeyEntity,
): FlatApiKeyEntity => ({
  id: entity.id,
  name: entity.name,
  workspaceId: entity.workspaceId,
  expiresAt: entity.expiresAt.toISOString(),
  revokedAt: entity.revokedAt?.toISOString() ?? null,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
});
