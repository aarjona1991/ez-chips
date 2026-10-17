import { OptionsType } from "../Options/options";

export type HandleInputChange = (
    setInputValue: (inputValue: string) => void,
    event: React.ChangeEvent<HTMLInputElement>
) => void;

export type HandleInputKeyDown = (
    options: OptionsType,
    setInputValue: (inputValue: string) => void,
    inputValue: string,
    event: React.KeyboardEvent<HTMLInputElement>
) => void;

export type HandleCloseItem = (
    options: OptionsType,
    label: string
) => void;

export type HandleAnimationEnd = (
    onCloseItem: () => void,
    onShowAnimationEnd: () => void,
    event: React.AnimationEvent<HTMLSpanElement>
) => void;

export type HandleChipClose = (
    hiding: boolean,
    animate: boolean | undefined,
    onCloseItem: () => void,
    setHiding: (hiding: boolean) => void
) => void;

export type GetChipItemClassName = (
    animate: boolean | undefined,
    hiding: boolean
) => string;

export type HandleDuplicate = (
    options: OptionsType,
    label: string
) => boolean;