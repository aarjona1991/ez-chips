# ez-chips

Editable text chips for React. `ez-chips` publishes one component, `ChipContainer`, plus the TypeScript types for its props.

**0.2.0.** This version replaces the 0.1.0 item shape and callbacks. Each item requires an `id`, and `id` is the React key. `onCloseItem` and `animateChipItem` are gone. Use `onRemove` and `animate`. The public API is still in development. Until 1.0.0, breaking changes ship in minor versions.

## Installation

```bash
npm install ez-chips
```

The package needs React and react-dom in the app. Supported versions are 18.3 and 19. In a TypeScript app, install `@types/react` 18 or 19 as well.

The component imports its own stylesheet. The app bundler must allow CSS imports from dependencies. Vite, webpack, and Create React App do. In the Next.js App Router, import `ChipContainer` from a Client Component.

## Usage

The list is controlled. Store `items` in state and pass the next list back from `onChange`.

```tsx
import { useState } from "react";
import { ChipContainer } from "ez-chips";
import type { ItemType } from "ez-chips";

export function Tags() {
  const [items, setItems] = useState<ItemType[]>([
    { id: "react", label: "React" },
    { id: "ts", label: "TypeScript" },
  ]);

  return (
    <ChipContainer
      placeholder="Add a tag"
      items={items}
      onChange={setItems}
    />
  );
}
```

Press Enter to add the input text as a chip. Blank text is ignored. The stored `label` keeps its surrounding spaces. The component generates the new item `id`. An exact `label` match is rejected, and the input is left in place.

Click the close mark to remove a chip. Removal calls `onChange` with the next list and, when passed, `onRemove(item, items)` with the removed item first. `setItems` fits `onChange`. It does not fit `onRemove`, because the first argument is the item.

Each `ChipContainer` animates only its own changes. A chip that is added to that list bounces in. The chip that is closed shrinks out, and the list updates when that animation finishes. Chips already in `items` when the component mounts do not animate, and one list does not trigger the animations of another. Set `animate={false}` on a container to disable both animations for that instance.

## API

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `ItemType[]` | yes | Chips to render |
| `onChange` | `(items: ItemType[]) => void` | yes | Next list after a chip is added or removed |
| `onRemove` | `(item: ItemType, items: ItemType[]) => void` | no | Called after a chip is removed, with the removed item and the next list |
| `placeholder` | `string` | no | Input placeholder. Defaults to `Add a new item` |
| `animate` | `boolean` | no | Enter and exit animations for this container only. Defaults to `true` |
| `disabled` | `boolean` | no | Accepted by the type. This version does not apply it |
| `readOnly` | `boolean` | no | Accepted by the type. This version does not apply it |
| `maxItems` | `number` | no | Accepted by the type. This version does not apply it |
| `allowDuplicates` | `boolean` | no | Accepted by the type. This version always rejects an exact `label` match |
| `className` | `string` | no | Accepted by the type. This version does not write it to the DOM |
| `addKey` | `string[]` | no | Accepted by the type. Defaults to Enter. This version adds on Enter |

`disabled`, `readOnly`, `maxItems`, `allowDuplicates`, `className`, and `addKey` are part of the 0.2.0 contract so callers can type them now. Applying them is later work.

Each item is an `ItemType`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number \| string` | yes | Stable identity and React key |
| `label` | `string` | yes | Chip label |
| `color` | `string` | no | Text color for this chip. Any CSS color |
| `background` | `string` | no | Background color for this chip. Any CSS color |

The default chip is gray (`#f0f0f0` background, `#333` text). `color` and `background` replace that chip only. Class names (`chip-container`, `chip-item`, `chip-item-close`) are global. To restyle every chip, set the variables on a parent. These inherit, so they win without `!important`:

```css
.tags {
  --ez-chips-background: #111827;
  --ez-chips-background-hover: #1f2937;
  --ez-chips-color: #f9fafb;
}
```

```ts
import type { ItemType, OptionsType } from "ez-chips";
```

## License

MIT © Adrian Arjona Clavelo
