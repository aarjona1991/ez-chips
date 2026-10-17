import type { ReactElement } from "react";
import { useRef, useState } from "react";
import { ChipItem } from "./base/ChipItem";
import { OptionsType } from "../types";
import { handleCloseItem, handleInputChange, handleInputKeyDown } from "../utils";

function ChipContainer(options: OptionsType): ReactElement {
    const [inputValue, setInputValue] = useState("");
    const [entering, setEntering] = useState<string[]>([]);
    const previousLabels = useRef<string[] | null>(null);
    const labels = options.items.map((item) => item.label);
    const animate = options.animate !== false;

    if (previousLabels.current === null) {
        previousLabels.current = labels;
    } else if (labels.join("\0") !== previousLabels.current.join("\0")) {
        const added = animate
            ? labels.filter((label) => !previousLabels.current!.includes(label))
            : [];
        previousLabels.current = labels;
        if (added.length > 0) {
            setEntering((current) => [...current, ...added]);
        }
    }

    const finishEnter = (label: string) => {
        setEntering((current) => current.filter((entry) => entry !== label));
    };

    return (
        <div className="chip-container">
            {options.items.map((item) => (
                <ChipItem
                    key={item.id}
                    item={item}
                    showAnimation={entering.includes(item.label)}
                    animateExit={animate}
                    onCloseItem={() => handleCloseItem(options, item.label)}
                    onShowAnimationEnd={() => finishEnter(item.label)} />
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