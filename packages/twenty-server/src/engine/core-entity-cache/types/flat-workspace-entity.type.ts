import { type WorkspaceActivationStatus } from 'twenty-shared/workspace';

import { type ModelId } from 'src/engine/metadata-modules/ai/ai-models/types/model-id.type';

// Manually defined to avoid ScalarFlatEntity issues
// with WorkspaceEntity's complex relation graph
export type FlatWorkspaceEntity = {
  id: string;
  displayName?: string;
  logo?: string;
  logoFileId: string | null;
  inviteHash?: string;
  allowImpersonation: boolean;
  isPublicInviteLinkEnabled: boolean;
  trashRetentionDays: number;
  eventLogRetentionDays: number;
  activationStatus: WorkspaceActivationStatus;
  metadataVersion: number;
  databaseSchema: string | null;
  subdomain: string;
  customDomain: string | null;
  isGoogleAuthEnabled: boolean;
  isGoogleAuthBypassEnabled: boolean;
  isTwoFactorAuthenticationEnforced: boolean;
  isPasswordAuthEnabled: boolean;
  isPasswordAuthBypassEnabled: boolean;
  isMicrosoftAuthEnabled: boolean;
  isMicrosoftAuthBypassEnabled: boolean;
  isCustomDomainEnabled: boolean;
  editableProfileFields: string[] | null;
  defaultRoleId: string | null;
  version: string | null;
  fastModel: ModelId;
  smartModel: ModelId;
  aiAdditionalInstructions: string | null;
  enabledAiModelIds: string[];
  useRecommendedModels: boolean;
  workspaceCustomApplicationId: string;
  routerModel: ModelId;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  suspendedAt: string | null;
};
