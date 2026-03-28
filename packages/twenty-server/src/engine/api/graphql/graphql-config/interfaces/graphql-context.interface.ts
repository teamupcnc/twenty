import { type YogaDriverServerContext } from '@graphql-yoga/nestjs';

import { type FlatAuthContextUser } from 'src/engine/core-entity-cache/types/flat-auth-context-user.type';
import { type FlatWorkspace } from 'src/engine/core-entity-cache/types/flat-workspace.type';

export interface GraphQLContext extends YogaDriverServerContext<'express'> {
  user?: FlatAuthContextUser;
  workspace?: FlatWorkspace;
}
