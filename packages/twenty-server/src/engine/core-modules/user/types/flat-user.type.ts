import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type USER_ENTITY_RELATION_PROPERTIES } from 'src/engine/core-modules/user/constants/user-entity-relation-properties.constant';
import { type UserEntity } from 'src/engine/core-modules/user/user.entity';

type UserEntityRelationProperties =
  (typeof USER_ENTITY_RELATION_PROPERTIES)[number];

type UserScalarFields = Omit<UserEntity, UserEntityRelationProperties>;

export type FlatUser = Omit<
  UserScalarFields,
  keyof CastRecordTypeOrmDatePropertiesToString<UserScalarFields>
> &
  CastRecordTypeOrmDatePropertiesToString<UserScalarFields>;
