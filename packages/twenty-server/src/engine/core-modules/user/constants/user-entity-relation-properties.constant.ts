import { type UserEntity } from 'src/engine/core-modules/user/user.entity';

export const USER_ENTITY_RELATION_PROPERTIES = [
  'formatEmail',
  'appTokens',
  'keyValuePairs',
  'workspaceMember',
  'userWorkspaces',
  'onboardingStatus',
  'currentWorkspace',
  'currentUserWorkspace',
] as const satisfies ReadonlyArray<keyof UserEntity>;
