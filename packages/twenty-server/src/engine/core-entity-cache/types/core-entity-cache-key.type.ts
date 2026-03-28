import { type FlatAuthContextUser } from 'src/engine/core-entity-cache/types/flat-auth-context-user.type';
import { type FlatUserWorkspaceEntity } from 'src/engine/core-entity-cache/types/flat-user-workspace-entity.type';
import { type FlatWorkspaceEntity } from 'src/engine/core-entity-cache/types/flat-workspace-entity.type';

export type CoreEntityCacheDataMap = {
  workspaceEntity: FlatWorkspaceEntity;
  authContextUser: FlatAuthContextUser;
  userWorkspaceEntity: FlatUserWorkspaceEntity;
};

export type CoreEntityCacheKeyName = keyof CoreEntityCacheDataMap;

export const CORE_ENTITY_CACHE_KEYS: Record<CoreEntityCacheKeyName, string> = {
  workspaceEntity: 'core-entity:workspace',
  authContextUser: 'core-entity:auth-context-user',
  userWorkspaceEntity: 'core-entity:user-workspace',
};
