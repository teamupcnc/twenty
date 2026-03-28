import { SettingsBillingLabelValueItem } from '@/settings/billing/components/internal/SettingsBillingLabelValueItem';
import { SubscriptionInfoContainer } from '@/settings/billing/components/SubscriptionInfoContainer';
import { GraphWidgetLineChart } from '@/page-layout/widgets/graph/graph-widget-line-chart/components/GraphWidgetLineChart';
import { type LineChartSeriesWithColor } from '@/page-layout/widgets/graph/graph-widget-line-chart/types/LineChartSeriesWithColor';
import { createGraphColorRegistry } from '@/page-layout/widgets/graph/utils/createGraphColorRegistry';
import { getColorSchemeByIndex } from '@/page-layout/widgets/graph/utils/getColorSchemeByIndex';
import { WidgetComponentInstanceContext } from '@/page-layout/widgets/states/contexts/WidgetComponentInstanceContext';
import { Select } from '@/ui/input/components/Select';
import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { getOperationTypeLabel } from '@/settings/usage/utils/getOperationTypeLabel';
import { getPeriodDates } from '@/settings/usage/utils/getPeriodDates';
import { getPeriodOptions } from '@/settings/usage/utils/getPeriodOptions';
import { type PeriodPreset } from '@/settings/usage/utils/periodPreset';
import { UsagePieChart } from '@/settings/usage/components/UsagePieChart';
import { useUsageValueFormatter } from '@/settings/usage/hooks/useUsageValueFormatter';
import { Trans, useLingui } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { styled } from '@linaria/react';
import { useContext, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { H2Title } from 'twenty-ui/display';
import { Section } from 'twenty-ui/layout';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import { useQuery } from '@apollo/client/react';
import { GetUsageAnalyticsDocument } from '~/generated-metadata/graphql';
import { formatDate } from '~/utils/date-utils';

const AI_OPERATION_TYPES = ['AI_CHAT_TOKEN', 'AI_WORKFLOW_TOKEN'];

const StyledLineChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

export const SettingsAIUsageUserDetail = () => {
  const { t: tLingui } = useLingui();
  const { userWorkspaceId } = useParams<{ userWorkspaceId: string }>();
  const { theme } = useContext(ThemeContext);
  const { formatUsageValue } = useUsageValueFormatter();
  const colorRegistry = createGraphColorRegistry(theme.color);

  const [dailyPeriod, setDailyPeriod] = useState<PeriodPreset>('30d');
  const [typePeriod, setTypePeriod] = useState<PeriodPreset>('30d');
  const [modelPeriod, setModelPeriod] = useState<PeriodPreset>('30d');

  const periodOptions = getPeriodOptions();

  const dailyDates = getPeriodDates(dailyPeriod);
  const typeDates = getPeriodDates(typePeriod);
  const modelDates = getPeriodDates(modelPeriod);

  const {
    data: dailyData,
    loading: dailyLoading,
    previousData: previousDailyData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: {
      input: {
        ...dailyDates,
        userWorkspaceId,
        operationTypes: AI_OPERATION_TYPES,
      },
    },
    skip: !userWorkspaceId,
  });

  const {
    data: typeData,
    loading: typeLoading,
    previousData: previousTypeData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: {
      input: {
        ...typeDates,
        userWorkspaceId,
        operationTypes: AI_OPERATION_TYPES,
      },
    },
    skip: !userWorkspaceId,
  });

  const {
    data: modelData,
    loading: modelLoading,
    previousData: previousModelData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: {
      input: {
        ...modelDates,
        userWorkspaceId,
        operationTypes: AI_OPERATION_TYPES,
      },
    },
    skip: !userWorkspaceId,
  });

  const effectiveDailyData = dailyData ?? previousDailyData;
  const effectiveTypeData = typeData ?? previousTypeData;
  const effectiveModelData = modelData ?? previousModelData;

  const dailyAnalytics = effectiveDailyData?.getUsageAnalytics;
  const typeAnalytics = effectiveTypeData?.getUsageAnalytics;
  const modelAnalytics = effectiveModelData?.getUsageAnalytics;

  const userDailyUsage = dailyAnalytics?.userDailyUsage?.dailyUsage ?? [];
  const usageByOperationType = typeAnalytics?.usageByOperationType ?? [];
  const usageByModel = modelAnalytics?.usageByModel ?? [];

  const userName =
    dailyAnalytics?.usageByUser?.find((item) => item.key === userWorkspaceId)
      ?.label ??
    typeAnalytics?.usageByUser?.find((item) => item.key === userWorkspaceId)
      ?.label;

  const totalValue = usageByOperationType.reduce(
    (sum, item) => sum + item.creditsUsed,
    0,
  );

  const displayName = userName ?? userWorkspaceId ?? '';

  const pieData = usageByOperationType.map((item, index) => ({
    id: getOperationTypeLabel(item.key),
    value: item.creditsUsed,
    color: getColorSchemeByIndex(colorRegistry, index).solid,
  }));

  const lineData: LineChartSeriesWithColor[] = [
    {
      id: 'ai-usage',
      label: t`AI Usage`,
      data: userDailyUsage.map((point) => ({
        x: formatDate(point.date, 'MMM d'),
        y: point.creditsUsed,
      })),
    },
  ];

  const modelPieData = usageByModel.map((item, index) => ({
    id: item.key,
    value: item.creditsUsed,
    color: getColorSchemeByIndex(colorRegistry, index + pieData.length).solid,
  }));

  const isInitialLoading =
    (dailyLoading && !effectiveDailyData) ||
    (typeLoading && !effectiveTypeData) ||
    (modelLoading && !effectiveModelData);

  const breadcrumbLinks = [
    {
      children: <Trans>Workspace</Trans>,
      href: getSettingsPath(SettingsPath.Workspace),
    },
    {
      children: <Trans>AI</Trans>,
      href: getSettingsPath(SettingsPath.AI),
    },
    { children: isInitialLoading ? '' : displayName },
  ];

  if (isInitialLoading) {
    return (
      <SubMenuTopBarContainer
        title={tLingui`AI User Usage`}
        links={breadcrumbLinks}
      >
        <SettingsPageContainer>
          <SkeletonTheme
            baseColor={theme.background.tertiary}
            highlightColor={theme.background.transparent.lighter}
            borderRadius={4}
          >
            <Section>
              <Skeleton width={120} height={16} />
              <Skeleton
                width="100%"
                height={200}
                borderRadius={8}
                style={{ marginTop: 16 }}
              />
            </Section>
            <Section>
              <Skeleton width={120} height={16} />
              <Skeleton
                width="100%"
                height={220}
                borderRadius={8}
                style={{ marginTop: 16 }}
              />
            </Section>
          </SkeletonTheme>
        </SettingsPageContainer>
      </SubMenuTopBarContainer>
    );
  }

  return (
    <SubMenuTopBarContainer
      title={displayName}
      links={breadcrumbLinks}
    >
      <SettingsPageContainer>
        {userDailyUsage.length === 0 && pieData.length === 0 && (
          <Section>
            <SubscriptionInfoContainer>
              <SettingsBillingLabelValueItem
                label={t`No usage data`}
                value={t`No AI consumption recorded for this user.`}
              />
            </SubscriptionInfoContainer>
          </Section>
        )}

        {userDailyUsage.length > 0 && (
          <Section>
            <H2Title
              title={t`Daily AI Usage`}
              description={t`Per-day AI consumption.`}
              adornment={
                <Select
                  dropdownId="ai-user-daily-period"
                  value={dailyPeriod}
                  options={periodOptions}
                  onChange={setDailyPeriod}
                  needIconCheck
                  selectSizeVariant="small"
                />
              }
            />
            <SubscriptionInfoContainer>
              <StyledLineChartContainer>
                <WidgetComponentInstanceContext.Provider
                  value={{ instanceId: 'ai-user-daily-line-chart' }}
                >
                  <GraphWidgetLineChart
                    id="ai-user-daily-line-chart"
                    data={lineData}
                    colorMode="automaticPalette"
                    showLegend={false}
                    enableArea
                  />
                </WidgetComponentInstanceContext.Provider>
              </StyledLineChartContainer>
            </SubscriptionInfoContainer>
          </Section>
        )}

        {usageByOperationType.length > 0 && (
          <Section>
            <H2Title
              title={t`AI Usage by Type`}
              description={formatUsageValue(totalValue)}
              adornment={
                <Select
                  dropdownId="ai-user-type-period"
                  value={typePeriod}
                  options={periodOptions}
                  onChange={setTypePeriod}
                  needIconCheck
                  selectSizeVariant="small"
                />
              }
            />
            <SubscriptionInfoContainer>
              <UsagePieChart data={pieData} />
            </SubscriptionInfoContainer>
          </Section>
        )}

        {modelPieData.length > 0 && (
          <Section>
            <H2Title
              title={t`AI Usage by Model`}
              description={t`Breakdown across AI models.`}
              adornment={
                <Select
                  dropdownId="ai-user-model-period"
                  value={modelPeriod}
                  options={periodOptions}
                  onChange={setModelPeriod}
                  needIconCheck
                  selectSizeVariant="small"
                />
              }
            />
            <SubscriptionInfoContainer>
              <UsagePieChart data={modelPieData} />
            </SubscriptionInfoContainer>
          </Section>
        )}
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
