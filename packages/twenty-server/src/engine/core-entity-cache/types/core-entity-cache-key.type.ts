import { type FlatAuthContextUser } from 'src/engine/core-modules/auth/types/flat-auth-context-user.type';
import { type FlatUserWorkspace } from 'src/engine/core-modules/user-workspace/types/flat-user-workspace.type';
import { type FlatWorkspace } from 'src/engine/core-modules/workspace/types/flat-workspace.type';

export type CoreEntityCacheDataMap = {
  workspaceEntity: FlatWorkspace;
  authContextUser: FlatAuthContextUser;
  userWorkspaceEntity: FlatUserWorkspace;
};

export type CoreEntityCacheKeyName = keyof CoreEntityCacheDataMap;

export const CORE_ENTITY_CACHE_KEYS: Record<CoreEntityCacheKeyName, string> = {
  workspaceEntity: 'core-entity:workspace',
  authContextUser: 'core-entity:auth-context-user',
  userWorkspaceEntity: 'core-entity:user-workspace',
};
