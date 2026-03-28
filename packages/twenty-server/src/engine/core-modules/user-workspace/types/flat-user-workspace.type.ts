import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type USER_WORKSPACE_ENTITY_NON_COLUMN_PROPERTIES } from 'src/engine/core-modules/user-workspace/constants/user-workspace-entity-non-column-properties.constant';
import { type UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';

type UserWorkspaceEntityNonColumnProperties =
  (typeof USER_WORKSPACE_ENTITY_NON_COLUMN_PROPERTIES)[number];

type UserWorkspaceColumnFields = Omit<
  UserWorkspaceEntity,
  UserWorkspaceEntityNonColumnProperties
>;

export type FlatUserWorkspace = Omit<
  UserWorkspaceColumnFields,
  keyof CastRecordTypeOrmDatePropertiesToString<UserWorkspaceColumnFields>
> &
  CastRecordTypeOrmDatePropertiesToString<UserWorkspaceColumnFields>;
