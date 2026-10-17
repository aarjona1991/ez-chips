import { ItemType } from "../Item/Item"

export type OptionsType = {
    placeholder?: string
    items: Array<ItemType>
    onChange: (items: Array<ItemType>) => void
    onCloseItem: (items: Array<ItemType>, item: ItemType) => void
    animateChipItem?: boolean
}