import { type AuthContextUser } from 'src/engine/core-modules/auth/types/auth-context-user.type';
import { type FlatAuthContextUser } from 'src/engine/core-modules/auth/types/flat-auth-context-user.type';

export const fromAuthContextUserToFlat = (
  entity: AuthContextUser,
): FlatAuthContextUser => ({
  id: entity.id,
  firstName: entity.firstName,
  lastName: entity.lastName,
  email: entity.email,
  defaultAvatarUrl: entity.defaultAvatarUrl,
  isEmailVerified: entity.isEmailVerified,
  disabled: entity.disabled,
  canImpersonate: entity.canImpersonate,
  canAccessFullAdminPanel: entity.canAccessFullAdminPanel,
  locale: entity.locale,
  passwordHash: entity.passwordHash,
  createdAt: entity.createdAt.toISOString(),
  updatedAt: entity.updatedAt.toISOString(),
  deletedAt: entity.deletedAt?.toISOString() ?? null,
});
