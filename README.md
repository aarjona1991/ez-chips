# ez-chips

Editable text chips for React. `ez-chips` publishes one component, `ChipContainer`, plus the TypeScript types for its props.

**0.1.0.** The public API is still in development. Until 1.0.0, breaking changes ship in minor versions.

## Installation

```bash
npm install ez-chips
```

The package needs React and react-dom in the app. Supported versions are 18.3 and 19. In a TypeScript app, install `@types/react` 18 or 19 as well.

The component imports its own stylesheet. The app bundler must allow CSS imports from dependencies. Vite, webpack, and Create React App do. In the Next.js App Router, import `ChipContainer` from a Client Component.

## Usage

The list is controlled. Store `items` in state and pass the next list back from `onChange` and `onCloseItem`.

```tsx
import { useState } from "react";
import { ChipContainer } from "ez-chips";
import type { ItemType } from "ez-chips";

export function Tags() {
  const [items, setItems] = useState<ItemType[]>([
    { text: "React" },
    { text: "TypeScript" },
  ]);

  return (
    <ChipContainer
      placeholder="Add a tag"
      items={items}
      onChange={setItems}
      onCloseItem={setItems}
    />
  );
}
```

Press Enter to add the input text as a chip. Blank text is ignored. The stored label keeps its surrounding spaces. Click the close mark to remove a chip. `text` is the React key, so each label in the list has to be unique. This version does not reject a duplicate.

Each `ChipContainer` animates only its own changes. A chip that is added to that list bounces in. The chip that is closed shrinks out, and the list updates when that animation finishes. Chips already in `items` when the component mounts do not animate, and one list does not trigger the animations of another. Set `animateChipItem={false}` on a container to disable both animations for that instance.

## API

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `items` | `ItemType[]` | yes | Chips to render |
| `onChange` | `(items: ItemType[]) => void` | yes | Next list after a chip is added or removed |
| `onCloseItem` | `(items: ItemType[], item: ItemType) => void` | yes | Called when a chip finishes closing, with the next list and the removed item |
| `placeholder` | `string` | no | Input placeholder. Defaults to `Add a new item` |
| `animateChipItem` | `boolean` | no | Enter and exit animations for this container only. Defaults to `true` |

`setItems` can be passed to `onCloseItem`. React state setters ignore the extra item argument.

Each item is an `ItemType`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `string` | yes | Chip label |
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
