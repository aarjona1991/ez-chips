import type { CSSProperties, ReactElement } from "react";
import { useState } from "react";
import { ItemType } from "../../types";
import { getChipItemClassName, handleAnimationEnd, handleChipClose } from "../../utils";

function ChipItem({
  item,
  showAnimation,
  animateExit,
  onCloseItem,
  onShowAnimationEnd,
}: {
  item: ItemType,
  showAnimation: boolean,
  animateExit: boolean,
  onCloseItem: () => void,
  onShowAnimationEnd: () => void,
}): ReactElement {
  const [hiding, setHiding] = useState(false);
  const style = {
    ...(item.background ? { "--ez-chips-background": item.background } : {}),
    ...(item.color ? { "--ez-chips-color": item.color } : {}),
  } as CSSProperties;

  return (
    <span
      className={getChipItemClassName(showAnimation, hiding)}
      style={style}
      onAnimationEnd={(event) => handleAnimationEnd(onCloseItem, onShowAnimationEnd, event)}
    >
        <span
          className="chip-item-close"
          onClick={() => handleChipClose(hiding, animateExit, onCloseItem, setHiding)}
        >&times;</span>
        {item.text}
    </span>
  );
}

export { ChipItem };