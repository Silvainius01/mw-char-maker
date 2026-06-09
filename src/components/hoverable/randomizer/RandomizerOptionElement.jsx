import randomizerOptions from '../../../gamedata/randomizer/randomizerOptions';

import HoverableElement from '../HoverableElement';

class RandomizerOptionElement extends HoverableElement {
    getFormattedName() {
         return randomizerOptions[this.props.name].name;
    }

    getTooltip() {
        const optionInfo = randomizerOptions[this.props.name];
        const defaultValue = "Default Value: " + optionInfo.default;
        return (
            <div className="tooltip randomizer-option" hidden>
                <div>{optionInfo.description}</div>
                <br/>
                <div>{defaultValue}</div>
            </div>
        );
    }
}

export default RandomizerOptionElement;