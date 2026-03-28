import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { billingState } from '@/client-config/states/billingState';
import { GraphWidgetLineChart } from '@/page-layout/widgets/graph/graph-widget-line-chart/components/GraphWidgetLineChart';
import { type LineChartSeriesWithColor } from '@/page-layout/widgets/graph/graph-widget-line-chart/types/LineChartSeriesWithColor';
import { createGraphColorRegistry } from '@/page-layout/widgets/graph/utils/createGraphColorRegistry';
import { getColorSchemeByIndex } from '@/page-layout/widgets/graph/utils/getColorSchemeByIndex';
import { WidgetComponentInstanceContext } from '@/page-layout/widgets/states/contexts/WidgetComponentInstanceContext';
import { SettingsBillingLabelValueItem } from '@/settings/billing/components/internal/SettingsBillingLabelValueItem';
import { SubscriptionInfoContainer } from '@/settings/billing/components/SubscriptionInfoContainer';
import { SettingsEnterpriseFeatureGateCard } from '@/settings/components/SettingsEnterpriseFeatureGateCard';
import { UsagePieChart } from '@/settings/usage/components/UsagePieChart';
import { useUsageValueFormatter } from '@/settings/usage/hooks/useUsageValueFormatter';
import { getOperationTypeLabel } from '@/settings/usage/utils/getOperationTypeLabel';
import { getPeriodDates } from '@/settings/usage/utils/getPeriodDates';
import { getPeriodOptions } from '@/settings/usage/utils/getPeriodOptions';
import { type PeriodPreset } from '@/settings/usage/utils/periodPreset';
import { Select } from '@/ui/input/components/Select';
import { Table } from '@/ui/layout/table/components/Table';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableHeader } from '@/ui/layout/table/components/TableHeader';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useQuery } from '@apollo/client/react';
import { styled } from '@linaria/react';
import { t } from '@lingui/core/macro';
import { useContext, useState } from 'react';
import { SettingsPath } from 'twenty-shared/types';
import { getSettingsPath } from 'twenty-shared/utils';
import { Tag } from 'twenty-ui/components';
import { H2Title, IconChevronRight, IconLock } from 'twenty-ui/display';
import { SearchInput } from 'twenty-ui/input';
import { Section } from 'twenty-ui/layout';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import { GetUsageAnalyticsDocument } from '~/generated-metadata/graphql';
import { formatDate } from '~/utils/date-utils';
import { normalizeSearchText } from '~/utils/normalizeSearchText';

const AI_OPERATION_TYPES = ['AI_CHAT_TOKEN', 'AI_WORKFLOW_TOKEN'];

const StyledSearchInputContainer = styled.div`
  padding-bottom: ${themeCssVariables.spacing[2]};
`;

const StyledIconChevronRightContainer = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
`;

const StyledLineChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const USAGE_USER_TABLE_GRID_TEMPLATE_COLUMNS = '1fr 120px 36px';

export const SettingsAIUsageTab = () => {
  const { theme } = useContext(ThemeContext);
  const { formatUsageValue } = useUsageValueFormatter();
  const currentWorkspace = useAtomStateValue(currentWorkspaceState);
  const billing = useAtomStateValue(billingState);
  const isBillingEnabled = billing?.isBillingEnabled ?? false;

  const hasEnterpriseAccess =
    isBillingEnabled || currentWorkspace?.hasValidEnterpriseKey === true;

  const [typePeriod, setTypePeriod] = useState<PeriodPreset>('30d');
  const [modelPeriod, setModelPeriod] = useState<PeriodPreset>('30d');
  const [dailyPeriod, setDailyPeriod] = useState<PeriodPreset>('30d');
  const [userPeriod, setUserPeriod] = useState<PeriodPreset>('30d');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  const colorRegistry = createGraphColorRegistry(theme.color);
  const periodOptions = getPeriodOptions();

  const typeDates = getPeriodDates(typePeriod);
  const modelDates = getPeriodDates(modelPeriod);
  const dailyDates = getPeriodDates(dailyPeriod);
  const userDates = getPeriodDates(userPeriod);

  const {
    data: typeData,
    loading: typeLoading,
    previousData: previousTypeData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: { input: { ...typeDates, operationTypes: AI_OPERATION_TYPES } },
    skip: !hasEnterpriseAccess,
  });

  const {
    data: dailyData,
    loading: dailyLoading,
    previousData: previousDailyData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: {
      input: { ...dailyDates, operationTypes: AI_OPERATION_TYPES },
    },
    skip: !hasEnterpriseAccess,
  });

  const {
    data: modelData,
    loading: modelLoading,
    previousData: previousModelData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: {
      input: { ...modelDates, operationTypes: AI_OPERATION_TYPES },
    },
    skip: !hasEnterpriseAccess,
  });

  const {
    data: userData,
    loading: userLoading,
    previousData: previousUserData,
  } = useQuery(GetUsageAnalyticsDocument, {
    variables: { input: { ...userDates, operationTypes: AI_OPERATION_TYPES } },
    skip: !hasEnterpriseAccess,
  });

  if (!hasEnterpriseAccess) {
    return (
      <Section>
        <H2Title
          title={t`AI Usage`}
          description={t`Track AI consumption across your workspace.`}
          adornment={
            <Tag
              text={t`Enterprise`}
              color="transparent"
              Icon={IconLock}
              variant="border"
            />
          }
        />
        <SettingsEnterpriseFeatureGateCard
          description={t`AI usage analytics is available with an Enterprise key.`}
        />
      </Section>
    );
  }

  const effectiveTypeData = typeData ?? previousTypeData;
  const effectiveModelData = modelData ?? previousModelData;
  const effectiveDailyData = dailyData ?? previousDailyData;
  const effectiveUserData = userData ?? previousUserData;

  const typeAnalytics = effectiveTypeData?.getUsageAnalytics;
  const modelAnalytics = effectiveModelData?.getUsageAnalytics;
  const dailyAnalytics = effectiveDailyData?.getUsageAnalytics;
  const userAnalytics = effectiveUserData?.getUsageAnalytics;

  const usageByOperationType = typeAnalytics?.usageByOperationType ?? [];
  const usageByModel = modelAnalytics?.usageByModel ?? [];
  const timeSeries = dailyAnalytics?.timeSeries ?? [];
  const usageByUser = userAnalytics?.usageByUser ?? [];

  const isInitialLoading =
    (typeLoading && !effectiveTypeData) ||
    (modelLoading && !effectiveModelData) ||
    (dailyLoading && !effectiveDailyData) ||
    (userLoading && !effectiveUserData);

  if (isInitialLoading) {
    return null;
  }

  const hasAnyData =
    usageByOperationType.length > 0 ||
    usageByModel.length > 0 ||
    timeSeries.length > 0 ||
    usageByUser.length > 0;

  const totalValue = usageByOperationType.reduce(
    (sum, item) => sum + item.creditsUsed,
    0,
  );

  const filteredUsageByUser = usageByUser.filter((item) => {
    const search = normalizeSearchText(userSearchTerm);
    const name = normalizeSearchText(item.label ?? item.key);

    return name.includes(search);
  });

  const pieData = usageByOperationType.map((item, index) => ({
    id: getOperationTypeLabel(item.key),
    value: item.creditsUsed,
    color: getColorSchemeByIndex(colorRegistry, index).solid,
  }));

  const modelPieData = usageByModel.map((item, index) => ({
    id: item.key,
    value: item.creditsUsed,
    color: getColorSchemeByIndex(colorRegistry, index + pieData.length).solid,
  }));

  const lineData: LineChartSeriesWithColor[] = [
    {
      id: 'ai-usage',
      label: t`AI Usage`,
      data: timeSeries.map((point) => ({
        x: formatDate(point.date, 'MMM d'),
        y: point.creditsUsed,
      })),
    },
  ];

  if (!hasAnyData) {
    return (
      <Section>
        <H2Title
          title={t`AI Usage`}
          description={t`AI usage breakdown for your workspace.`}
        />
        <SubscriptionInfoContainer>
          <SettingsBillingLabelValueItem
            label={t`No usage data`}
            value={t`No AI consumption recorded yet.`}
          />
        </SubscriptionInfoContainer>
      </Section>
    );
  }

  return (
    <>
      {timeSeries.length > 0 && (
        <Section>
          <H2Title
            title={t`Daily AI Usage`}
            description={t`AI consumption over time.`}
            adornment={
              <Select
                dropdownId="ai-usage-daily-period"
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
                value={{ instanceId: 'ai-usage-daily-line-chart' }}
              >
                <GraphWidgetLineChart
                  id="ai-usage-daily-line-chart"
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
                dropdownId="ai-usage-type-period"
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
                dropdownId="ai-usage-model-period"
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

      {usageByUser.length > 0 && (
        <Section>
          <H2Title
            title={t`AI Usage by User`}
            description={t`Click a user to see their daily breakdown.`}
            adornment={
              <Select
                dropdownId="ai-usage-user-period"
                value={userPeriod}
                options={periodOptions}
                onChange={setUserPeriod}
                needIconCheck
                selectSizeVariant="small"
              />
            }
          />
          <StyledSearchInputContainer>
            <SearchInput
              placeholder={t`Search for a user...`}
              value={userSearchTerm}
              onChange={setUserSearchTerm}
            />
          </StyledSearchInputContainer>
          <Table>
            <TableRow
              gridTemplateColumns={USAGE_USER_TABLE_GRID_TEMPLATE_COLUMNS}
            >
              <TableHeader>{t`Name`}</TableHeader>
              <TableHeader align="right">{t`Usage`}</TableHeader>
              <TableHeader />
            </TableRow>
            {filteredUsageByUser.map((item) => (
              <TableRow
                key={item.key}
                gridTemplateColumns={USAGE_USER_TABLE_GRID_TEMPLATE_COLUMNS}
                to={getSettingsPath(SettingsPath.AIUsageUserDetail, {
                  userWorkspaceId: item.key,
                })}
              >
                <TableCell color={themeCssVariables.font.color.primary}>
                  {item.label ?? item.key}
                </TableCell>
                <TableCell align="right">
                  {formatUsageValue(item.creditsUsed)}
                </TableCell>
                <TableCell align="center">
                  <StyledIconChevronRightContainer>
                    <IconChevronRight
                      size={theme.icon.size.md}
                      stroke={theme.icon.stroke.sm}
                    />
                  </StyledIconChevronRightContainer>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Section>
      )}
    </>
  );
};
