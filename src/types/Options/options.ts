import { ItemType } from "../Item/Item"

export type OptionsType = {
    placeholder?: string
    items: Array<ItemType>
    onChange: (items: Array<ItemType>) => void
    onRemove?: (item: ItemType, items: Array<ItemType>) => void
    animate?: boolean
    disabled?: boolean
    readOnly?: boolean
    maxItems?: number
    allowDuplicates?: boolean
    className?: string
    addKey?: Array<string> | ["Enter"]
}