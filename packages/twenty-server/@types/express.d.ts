import { type APP_LOCALES } from 'twenty-shared/translations';

import { type FlatApiKeyEntity } from 'src/engine/core-entity-cache/types/flat-api-key-entity.type';
import { type FlatAuthContextUser } from 'src/engine/core-entity-cache/types/flat-auth-context-user.type';
import { type FlatUserWorkspaceEntity } from 'src/engine/core-entity-cache/types/flat-user-workspace-entity.type';
import { type FlatWorkspaceEntity } from 'src/engine/core-entity-cache/types/flat-workspace-entity.type';
import { type ApplicationEntity } from 'src/engine/core-modules/application/application.entity';
import { type RawAuthContext } from 'src/engine/core-modules/auth/types/auth-context.type';
import { type AuthProviderEnum } from 'src/engine/core-modules/workspace/types/workspace.type';
import { type WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: FlatAuthContextUser | null;
    apiKey?: FlatApiKeyEntity | null;
    application?: ApplicationEntity | null;
    userWorkspace?: FlatUserWorkspaceEntity;
    locale: keyof typeof APP_LOCALES;
    workspace?: FlatWorkspaceEntity;
    workspaceId?: string;
    workspaceMetadataVersion?: number;
    workspaceMemberId?: string;
    workspaceMember?: WorkspaceMemberWorkspaceEntity;
    userWorkspaceId?: string;
    authProvider?: AuthProviderEnum | null;
    impersonationContext?: RawAuthContext['impersonationContext'];
    skipWorkspaceSchemaCreation?: boolean;
  }
}
