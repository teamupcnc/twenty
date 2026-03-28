import { type UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { type FlatUserWorkspaceEntity } from 'src/engine/core-entity-cache/types/flat-user-workspace-entity.type';

export const fromUserWorkspaceEntityToFlat = (
  entity: UserWorkspaceEntity,
): FlatUserWorkspaceEntity => ({
  id: entity.id,
  workspaceId: entity.workspaceId,
  userId: entity.userId,
  defaultAvatarUrl: entity.defaultAvatarUrl,
  locale: entity.locale,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: entity.deletedAt?.toISOString() ?? null,
});
