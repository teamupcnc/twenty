import { useQuery } from '@apollo/client/react';
import { useState } from 'react';

import { getPeriodDates } from '@/settings/usage/utils/getPeriodDates';
import { getPeriodOptions } from '@/settings/usage/utils/getPeriodOptions';
import { type PeriodPreset } from '@/settings/usage/utils/periodPreset';
import { GetUsageAnalyticsDocument } from '~/generated-metadata/graphql';

type UseUsageAnalyticsDataParams = {
  operationTypes?: readonly string[] | string[];
  userWorkspaceId?: string;
  skip?: boolean;
};

export const useUsageAnalyticsData = ({
  operationTypes,
  userWorkspaceId,
  skip,
}: UseUsageAnalyticsDataParams) => {
  const [period, setPeriod] = useState<PeriodPreset>('30d');

  const periodDates = getPeriodDates(period);
  const periodOptions = getPeriodOptions();

  const { data, loading, previousData } = useQuery(GetUsageAnalyticsDocument, {
    variables: {
      input: {
        ...periodDates,
        ...(operationTypes ? { operationTypes: [...operationTypes] } : {}),
        ...(userWorkspaceId ? { userWorkspaceId } : {}),
      },
    },
    skip,
  });

  const effectiveData = data ?? previousData;
  const analytics = effectiveData?.getUsageAnalytics;
  const isInitialLoading = loading && !effectiveData;

  return {
    analytics,
    loading,
    isInitialLoading,
    period,
    setPeriod,
    periodOptions,
  };
};
