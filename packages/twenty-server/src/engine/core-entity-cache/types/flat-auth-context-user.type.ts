import { type AuthContextUser } from 'src/engine/core-modules/auth/types/auth-context-user.type';
import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';

export type FlatAuthContextUser = Omit<
  AuthContextUser,
  keyof CastRecordTypeOrmDatePropertiesToString<AuthContextUser>
> &
  CastRecordTypeOrmDatePropertiesToString<AuthContextUser>;
