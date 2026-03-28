import { type CastRecordTypeOrmDatePropertiesToString } from 'src/engine/metadata-modules/flat-entity/types/cast-record-typeorm-date-properties-to-string.type';
import { type API_KEY_ENTITY_NON_COLUMN_PROPERTIES } from 'src/engine/core-modules/api-key/constants/api-key-entity-non-column-properties.constant';
import { type ApiKeyEntity } from 'src/engine/core-modules/api-key/api-key.entity';

type ApiKeyEntityNonColumnProperties =
  (typeof API_KEY_ENTITY_NON_COLUMN_PROPERTIES)[number];

type ApiKeyColumnFields = Omit<ApiKeyEntity, ApiKeyEntityNonColumnProperties>;

export type FlatApiKey = Omit<
  ApiKeyColumnFields,
  keyof CastRecordTypeOrmDatePropertiesToString<ApiKeyColumnFields>
> &
  CastRecordTypeOrmDatePropertiesToString<ApiKeyColumnFields>;
