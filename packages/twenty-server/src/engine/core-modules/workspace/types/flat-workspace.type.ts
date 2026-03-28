import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type WORKSPACE_ENTITY_NON_COLUMN_PROPERTIES } from 'src/engine/core-modules/workspace/constants/workspace-entity-non-column-properties.constant';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

type WorkspaceEntityNonColumnProperties =
  (typeof WORKSPACE_ENTITY_NON_COLUMN_PROPERTIES)[number];

type WorkspaceColumnFields = Omit<
  WorkspaceEntity,
  WorkspaceEntityNonColumnProperties
>;

export type FlatWorkspace = Omit<
  WorkspaceColumnFields,
  keyof CastRecordTypeOrmDatePropertiesToString<WorkspaceColumnFields>
> &
  CastRecordTypeOrmDatePropertiesToString<WorkspaceColumnFields>;
