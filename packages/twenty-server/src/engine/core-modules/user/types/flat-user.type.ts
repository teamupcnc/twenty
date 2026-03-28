import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type USER_ENTITY_NON_COLUMN_PROPERTIES } from 'src/engine/core-modules/user/constants/user-entity-non-column-properties.constant';
import { type UserEntity } from 'src/engine/core-modules/user/user.entity';

type UserEntityNonColumnProperties =
  (typeof USER_ENTITY_NON_COLUMN_PROPERTIES)[number];

type UserColumnFields = Omit<UserEntity, UserEntityNonColumnProperties>;

export type FlatUser = Omit<
  UserColumnFields,
  keyof CastRecordTypeOrmDatePropertiesToString<UserColumnFields>
> &
  CastRecordTypeOrmDatePropertiesToString<UserColumnFields>;
