import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type AuthContextUser } from 'src/engine/core-modules/auth/types/auth-context-user.type';

// AuthContextUser is already a Pick of scalar fields (no relations),
// so we only need the Date→string conversion.
export type FlatAuthContextUser = Omit<
  AuthContextUser,
  keyof CastRecordTypeOrmDatePropertiesToString<AuthContextUser>
> &
  CastRecordTypeOrmDatePropertiesToString<AuthContextUser>;
