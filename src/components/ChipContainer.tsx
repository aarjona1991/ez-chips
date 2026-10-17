import type { ReactElement } from "react";
import { useRef, useState } from "react";
import { ChipItem } from "./base/ChipItem";
import { OptionsType } from "../types";
import { handleCloseItem, handleInputChange, handleInputKeyDown } from "../utils";

function ChipContainer(options: OptionsType): ReactElement {
    const [inputValue, setInputValue] = useState("");
    const [entering, setEntering] = useState<string[]>([]);
    const previousTexts = useRef<string[] | null>(null);
    const texts = options.items.map((item) => item.text);
    const animate = options.animateChipItem !== false;

    if (previousTexts.current === null) {
        previousTexts.current = texts;
    } else if (texts.join("\0") !== previousTexts.current.join("\0")) {
        const added = animate
            ? texts.filter((text) => !previousTexts.current!.includes(text))
            : [];
        previousTexts.current = texts;
        if (added.length > 0) {
            setEntering((current) => [...current, ...added]);
        }
    }

    const finishEnter = (text: string) => {
        setEntering((current) => current.filter((entry) => entry !== text));
    };

    return (
        <div className="chip-container">
            {options.items.map((item) => (
                <ChipItem
                    key={item.text}
                    item={item}
                    showAnimation={entering.includes(item.text)}
                    animateExit={animate}
                    onCloseItem={() => handleCloseItem(options, item.text)}
                    onShowAnimationEnd={() => finishEnter(item.text)} />
            ))}
            <input type="text"
                placeholder={options.placeholder || "Add a new item"}
                value={inputValue}
                onChange={ (event) => handleInputChange(setInputValue, event) }
                onKeyDown={ (event) => handleInputKeyDown(options, setInputValue, inputValue, event) } />
        </div>
    );
}

export { ChipContainer };