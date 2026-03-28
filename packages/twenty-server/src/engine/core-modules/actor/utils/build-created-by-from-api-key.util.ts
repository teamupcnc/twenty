import { type ActorMetadata, FieldActorSource } from 'twenty-shared/types';

import { type FlatApiKeyEntity } from 'src/engine/core-entity-cache/types/flat-api-key-entity.type';

type BuildCreatedByFromApiKeyArgs = {
  apiKey: FlatApiKeyEntity;
};
export const buildCreatedByFromApiKey = ({
  apiKey,
}: BuildCreatedByFromApiKeyArgs): ActorMetadata => ({
  source: FieldActorSource.API,
  name: apiKey.name,
  workspaceMemberId: null,
  context: {},
});
