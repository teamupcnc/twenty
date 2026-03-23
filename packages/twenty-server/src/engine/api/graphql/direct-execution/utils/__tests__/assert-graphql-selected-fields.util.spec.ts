import { RESOLVER_METHOD_NAMES } from 'src/engine/api/graphql/workspace-resolver-builder/constants/resolver-method-names';

import { assertGraphqlSelectedFields } from 'src/engine/api/graphql/direct-execution/utils/assert-graphql-selected-fields.util';

const FULL_CONNECTION_SELECTION = {
  edges: {
    node: { id: {}, name: {}, __typename: {} },
    cursor: {},
    __typename: {},
  },
  pageInfo: {
    hasNextPage: {},
    hasPreviousPage: {},
    startCursor: {},
    endCursor: {},
    __typename: {},
  },
  totalCount: {},
  __typename: {},
};

describe('assertGraphqlSelectedFields', () => {
  describe('happy path – connection methods', () => {
    const connectionMethods = [
      RESOLVER_METHOD_NAMES.FIND_MANY,
      RESOLVER_METHOD_NAMES.FIND_DUPLICATES,
      RESOLVER_METHOD_NAMES.CREATE_MANY,
      RESOLVER_METHOD_NAMES.UPDATE_MANY,
      RESOLVER_METHOD_NAMES.DELETE_MANY,
      RESOLVER_METHOD_NAMES.DESTROY_MANY,
      RESOLVER_METHOD_NAMES.RESTORE_MANY,
    ];

    it.each(connectionMethods)(
      'should not throw for %s with full connection selection',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: FULL_CONNECTION_SELECTION,
            method,
          }),
        ).not.toThrow();
      },
    );

    it.each(connectionMethods)(
      'should not throw for %s with minimal edges-only selection',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: { edges: { node: { id: {} } } },
            method,
          }),
        ).not.toThrow();
      },
    );

    it.each(connectionMethods)(
      'should not throw for %s with only totalCount',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: { totalCount: {} },
            method,
          }),
        ).not.toThrow();
      },
    );

    it.each(connectionMethods)(
      'should not throw for %s with only __typename',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: { __typename: {} },
            method,
          }),
        ).not.toThrow();
      },
    );

    it.each(connectionMethods)(
      'should not throw for %s with aggregate fields',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: {
              edges: { node: { id: {} } },
              totalCount: {},
              avgScore: {},
              sumAmount: {},
              minCreatedAt: {},
              maxCreatedAt: {},
              countUniqueValuesStatus: {},
              countEmptyEmail: {},
              countNotEmptyEmail: {},
              percentageEmptyPhone: {},
              percentageNotEmptyPhone: {},
              countTrueIsActive: {},
              countFalseIsActive: {},
            },
            method,
          }),
        ).not.toThrow();
      },
    );

    it.each(connectionMethods)(
      'should not throw for %s with pageInfo subset',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: { pageInfo: { hasNextPage: {} } },
            method,
          }),
        ).not.toThrow();
      },
    );
  });

  describe('happy path – groupBy', () => {
    it('should not throw with full group by connection selection', () => {
      expect(() =>
        assertGraphqlSelectedFields({
          selectedFields: {
            groupByDimensionValues: {},
            edges: {
              node: { id: {}, name: {}, __typename: {} },
              cursor: {},
              __typename: {},
            },
            pageInfo: {
              hasNextPage: {},
              hasPreviousPage: {},
              startCursor: {},
              endCursor: {},
              __typename: {},
            },
            totalCount: {},
            __typename: {},
          },
          method: RESOLVER_METHOD_NAMES.GROUP_BY,
        }),
      ).not.toThrow();
    });

    it('should not throw with only groupByDimensionValues', () => {
      expect(() =>
        assertGraphqlSelectedFields({
          selectedFields: { groupByDimensionValues: {}, __typename: {} },
          method: RESOLVER_METHOD_NAMES.GROUP_BY,
        }),
      ).not.toThrow();
    });

    it('should not throw with aggregate fields', () => {
      expect(() =>
        assertGraphqlSelectedFields({
          selectedFields: {
            groupByDimensionValues: {},
            totalCount: {},
            avgScore: {},
            sumAmount: {},
          },
          method: RESOLVER_METHOD_NAMES.GROUP_BY,
        }),
      ).not.toThrow();
    });

    it('should not throw with edges and pageInfo subset', () => {
      expect(() =>
        assertGraphqlSelectedFields({
          selectedFields: {
            groupByDimensionValues: {},
            edges: { node: { id: {} } },
            pageInfo: { hasNextPage: {} },
          },
          method: RESOLVER_METHOD_NAMES.GROUP_BY,
        }),
      ).not.toThrow();
    });
  });

  describe('happy path – single record methods', () => {
    const singleRecordMethods = [
      RESOLVER_METHOD_NAMES.FIND_ONE,
      RESOLVER_METHOD_NAMES.CREATE_ONE,
      RESOLVER_METHOD_NAMES.UPDATE_ONE,
      RESOLVER_METHOD_NAMES.DELETE_ONE,
      RESOLVER_METHOD_NAMES.DESTROY_ONE,
      RESOLVER_METHOD_NAMES.RESTORE_ONE,
      RESOLVER_METHOD_NAMES.MERGE_MANY,
    ];

    it.each(singleRecordMethods)(
      'should not throw for %s regardless of selection shape',
      (method) => {
        expect(() =>
          assertGraphqlSelectedFields({
            selectedFields: {
              id: {},
              name: {},
              anything: {},
              nested: { deep: {} },
            },
            method,
          }),
        ).not.toThrow();
      },
    );
  });
});
