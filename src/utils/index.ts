import {
  GetChipItemClassName,
  HandleAnimationEnd,
  HandleChipClose,
  HandleCloseItem,
  HandleInputChange,
  HandleInputKeyDown,
  HandleDuplicate,
} from "../types/Utils";

export const handleInputChange: HandleInputChange = (setInputValue, event) => {
  if (event.target.value.trim() === "") return;
  setInputValue(event.target.value);
};

export const handleInputKeyDown: HandleInputKeyDown = (
  options,
  setInputValue,
  inputValue,
  event,
) => {
  if (event.key === "Enter" && inputValue.trim() !== "") {
    if (handleDuplicate(options, inputValue)) return;
    options.onChange([...options.items, { id: Math.ceil(Math.random() * new Date().getMilliseconds()), label: inputValue }]);
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

export const handleCloseItem: HandleCloseItem = (options, label) => {
  const item = options.items.find((entry) => entry.label === label);
  if (!item) return;
  const nextItems = options.items.filter((entry) => entry.label !== label);
  options.onChange(nextItems);
  options.onRemove?.(item, nextItems);
};

export const handleDuplicate: HandleDuplicate = (options, label) => {
  const item = options.items.find((entry) => entry.label === label);
  if (!item) return false;
  return true;
};

