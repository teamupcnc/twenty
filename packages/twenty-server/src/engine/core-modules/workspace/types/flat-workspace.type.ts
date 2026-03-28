import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type WORKSPACE_ENTITY_RELATION_PROPERTIES } from 'src/engine/core-modules/workspace/constants/workspace-entity-relation-properties.constant';
import { type WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

type WorkspaceEntityRelationProperties =
  (typeof WORKSPACE_ENTITY_RELATION_PROPERTIES)[number];

type WorkspaceScalarFields = Omit<
  WorkspaceEntity,
  WorkspaceEntityRelationProperties
>;

export type FlatWorkspace = Omit<
  WorkspaceScalarFields,
  keyof CastRecordTypeOrmDatePropertiesToString<WorkspaceScalarFields>
> &
  CastRecordTypeOrmDatePropertiesToString<WorkspaceScalarFields>;
