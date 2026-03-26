import { isLayoutCustomizationModeEnabledState } from '@/layout-customization/states/isLayoutCustomizationModeEnabledState';
import { NavigationMenuItemDroppableIds } from '@/navigation-menu-item/common/constants/NavigationMenuItemDroppableIds';
import { NavigationDropTargetContext } from '@/navigation-menu-item/common/contexts/NavigationDropTargetContext';
import { NavigationMenuItemDroppableSlot } from '@/navigation-menu-item/display/dnd/components/NavigationMenuItemDroppableSlot';
import { NavigationMenuItemSortableItem } from '@/navigation-menu-item/display/dnd/components/NavigationMenuItemSortableItem';
import { useIsDropDisabledForSection } from '@/navigation-menu-item/display/dnd/hooks/useIsDropDisabledForSection';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { styled } from '@linaria/react';
import { useContext } from 'react';
import { NavigationMenuItemType } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { themeCssVariables } from 'twenty-ui/theme-constants';

import { NavigationMenuItemDragContext } from '@/navigation-menu-item/common/contexts/NavigationMenuItemDragContext';
import { NavigationMenuItemDisplay } from '@/navigation-menu-item/display/components/NavigationMenuItemDisplay';
import { NavigationMenuItemOrphanDropTarget } from '@/navigation-menu-item/display/sections/components/NavigationMenuItemOrphanDropTarget';
import type { NavigationMenuItemSectionListDndKitProps } from '@/navigation-menu-item/display/sections/types/NavigationMenuItemSectionListDndKitProps';
import { WorkspaceSectionAddMenuItemButton } from '@/navigation-menu-item/edit/components/WorkspaceSectionAddMenuItemButton';
import { useNavigationMenuItemsDraftState } from '@/navigation-menu-item/edit/hooks/useNavigationMenuItemsDraftState';

type WorkspaceSectionListDndKitProps = NavigationMenuItemSectionListDndKitProps;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.betweenSiblingsGap};
  padding-top: ${themeCssVariables.betweenSiblingsGap};
`;

const StyledListItemRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const WorkspaceSectionListDndKit = ({
  filteredItems,
  getEditModeProps,
  folderChildrenById,
  onNavigationMenuItemClick,
  onActiveObjectMetadataItemClick,
}: WorkspaceSectionListDndKitProps) => {
  const { workspaceNavigationMenuItems } = useNavigationMenuItemsDraftState();
  const isLayoutCustomizationModeEnabled = useAtomStateValue(
    isLayoutCustomizationModeEnabledState,
  );
  const workspaceDropDisabled = useIsDropDisabledForSection(true);
  const { isDragging } = useContext(NavigationMenuItemDragContext);
  const { addToNavigationFallbackDestination } = useContext(
    NavigationDropTargetContext,
  );
  const folderCount = filteredItems.filter(
    (item) => item.type === NavigationMenuItemType.FOLDER,
  ).length;
  const isAddMenuItemButtonVisible = isLayoutCustomizationModeEnabled;
  const reorderOrphanCount = workspaceNavigationMenuItems.filter(
    (item) => !isDefined(item.folderId),
  ).length;
  const orphanAppendDndIndex = Math.max(
    reorderOrphanCount,
    filteredItems.length,
  );
  return (
    <StyledList>
      {filteredItems.map((item, index) => (
        <StyledListItemRow key={item.id}>
          <NavigationMenuItemOrphanDropTarget index={index} compact />
          <NavigationMenuItemSortableItem
            id={item.id}
            index={index}
            group={
              NavigationMenuItemDroppableIds.WORKSPACE_ORPHAN_NAVIGATION_MENU_ITEMS
            }
            disabled={
              !isLayoutCustomizationModeEnabled || workspaceDropDisabled
            }
          >
            <NavigationMenuItemDisplay
              item={item}
              editModeProps={getEditModeProps(item)}
              isDragging={isDragging}
              folderChildrenById={folderChildrenById}
              folderCount={folderCount}
              onNavigationMenuItemClick={onNavigationMenuItemClick}
              onActiveObjectMetadataItemClick={onActiveObjectMetadataItemClick}
              orphanIndex={index}
            />
          </NavigationMenuItemSortableItem>
        </StyledListItemRow>
      ))}
      <NavigationMenuItemDroppableSlot
        droppableId={
          NavigationMenuItemDroppableIds.WORKSPACE_ORPHAN_NAVIGATION_MENU_ITEMS
        }
        index={orphanAppendDndIndex}
        disabled={workspaceDropDisabled}
      >
        <NavigationMenuItemOrphanDropTarget
          index={orphanAppendDndIndex}
          compact={!isAddMenuItemButtonVisible}
        >
          {isAddMenuItemButtonVisible && <WorkspaceSectionAddMenuItemButton />}
        </NavigationMenuItemOrphanDropTarget>
      </NavigationMenuItemDroppableSlot>
      {addToNavigationFallbackDestination?.droppableId ===
        NavigationMenuItemDroppableIds.WORKSPACE_ORPHAN_NAVIGATION_MENU_ITEMS &&
        addToNavigationFallbackDestination.index > orphanAppendDndIndex && (
          <NavigationMenuItemDroppableSlot
            droppableId={
              NavigationMenuItemDroppableIds.WORKSPACE_ORPHAN_NAVIGATION_MENU_ITEMS
            }
            index={addToNavigationFallbackDestination.index}
            disabled={workspaceDropDisabled}
          >
            <NavigationMenuItemOrphanDropTarget
              index={addToNavigationFallbackDestination.index}
              compact
            />
          </NavigationMenuItemDroppableSlot>
        )}
    </StyledList>
  );
};
