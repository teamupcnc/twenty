import { type AuthContextUser } from 'src/engine/core-modules/auth/types/auth-context-user.type';
import { type UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

export type CoreEntityCacheDataMap = {
  workspaceEntity: WorkspaceEntity;
  authContextUser: AuthContextUser;
  userWorkspaceEntity: UserWorkspaceEntity;
};

export type CoreEntityCacheKeyName = keyof CoreEntityCacheDataMap;

export const CORE_ENTITY_CACHE_KEYS: Record<CoreEntityCacheKeyName, string> = {
  workspaceEntity: 'core-entity:workspace',
  authContextUser: 'core-entity:auth-context-user',
  userWorkspaceEntity: 'core-entity:user-workspace',
};
