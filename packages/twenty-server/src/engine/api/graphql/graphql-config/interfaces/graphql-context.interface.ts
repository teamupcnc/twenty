import { type YogaDriverServerContext } from '@graphql-yoga/nestjs';

import { type FlatAuthContextUser } from 'src/engine/core-entity-cache/types/flat-auth-context-user.type';
import { type FlatWorkspaceEntity } from 'src/engine/core-entity-cache/types/flat-workspace-entity.type';

export interface GraphQLContext extends YogaDriverServerContext<'express'> {
  user?: FlatAuthContextUser;
  workspace?: FlatWorkspaceEntity;
}
