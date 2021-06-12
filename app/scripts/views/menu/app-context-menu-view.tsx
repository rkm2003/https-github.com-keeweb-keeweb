import { FunctionComponent } from 'preact';
import { AppContextMenuItem } from 'ui/menu/app-context-menu-item';
import { ContextMenuItem } from 'models/context-menu';
import { useRef } from 'preact/hooks';
import { withoutPropagation } from 'util/ui/events';
import { useBodyClick, usePositionable } from 'util/ui/hooks';
import { Position } from 'util/types';

export const AppContextMenuView: FunctionComponent<{
    pos: Position;
    items: ContextMenuItem[];
    selectedItem: ContextMenuItem | undefined;

    bodyClicked: () => void;
}> = ({ pos, items, selectedItem, bodyClicked }) => {
    const el = useRef<HTMLDivElement>();

    useBodyClick(bodyClicked);
    const position = usePositionable(pos, el);

    return (
        <div class="dropdown" style={position} onClick={withoutPropagation()} ref={el}>
            {items.map((item) => (
                <AppContextMenuItem item={item} active={item === selectedItem} key={item.id} />
            ))}
        </div>
    );
};