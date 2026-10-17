import {
  GetChipItemClassName,
  HandleAnimationEnd,
  HandleChipClose,
  HandleCloseItem,
  HandleInputChange,
  HandleInputKeyDown,
} from "../types/Utils";

export const handleInputChange: HandleInputChange = (setInputValue, event) => {
  setInputValue(event.target.value);
};

export const handleInputKeyDown: HandleInputKeyDown = (
  options,
  setInputValue,
  inputValue,
  event,
) => {
  if (event.key === "Enter" && inputValue.trim() !== "") {
    options.onChange([...options.items, { text: inputValue }]);
    setInputValue("");
  }
};

export const handleChipClose: HandleChipClose = (hiding, animate, onCloseItem, setHiding) => {
  if (hiding) return;
  if (!animate) {
    onCloseItem();
    return;
  }
  setHiding(true);
};

export const getChipItemClassName: GetChipItemClassName = (animate, hiding) => {
  return [
    "chip-item",
    animate && !hiding ? "chip-item-show-bounce" : "",
    hiding ? "chip-item-hide-explode" : "",
  ].filter(Boolean).join(" ");
};

export const handleAnimationEnd: HandleAnimationEnd = (onCloseItem, onShowAnimationEnd, event) => {
  if (event.target !== event.currentTarget) return;
  if (event.animationName === "chip-item-hide-explode") {
    onCloseItem();
  }
  if (event.animationName === "chip-item-show-bounce") {
    onShowAnimationEnd();
  }
};

export const handleCloseItem: HandleCloseItem = (options, text) => {
  const item = options.items.find((entry) => entry.text === text);
  if (!item) return;
  const nextItems = options.items.filter((entry) => entry.text !== text);
  options.onChange(nextItems);
  options.onCloseItem(nextItems, item);
};
