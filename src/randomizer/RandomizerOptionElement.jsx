import randomizerSettings from './data/randomizerSettings';
import HoverableElement from '../components/hoverable/HoverableElement';

class RandomizerOptionElement extends HoverableElement {
    constructor(props) {
        super(props);
        this.events = props.randomizer.events;
        this.option = props.randomizer.settings[this.props.name];
    }

    getFormattedName() {
        return randomizerSettings[this.props.name].name;
    }

    getButtonHtml() {
        const cv = this.option.value.toString();
        return (
            <button 
            name={this.props.name} 
            value={this.option.value} 
            onClick={this.events.onRandomizerToggleClick}
            >
                {cv.replace(/^./, cv[0].toUpperCase())}
            </button>
        )
    }

    render() {
        const optionInfo = randomizerSettings[this.props.name];
        const input = this.props.type === "button"
            ? (this.getButtonHtml())
            : (<input name={this.props.name} type={this.props.type} defaultValue={optionInfo.default}/>);
        return (
            <div id={this.props.name} className="randomizer-opt">
                <label
                    className="hoverable"
                    name={this.props.name}
                    index={this.props.index}
                    onMouseMove={this.onMouseMove}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.props.onClick}
                >
                    <span>{this.getFormattedName()}</span>
                    <span>:</span>
                    {this.getTooltip()}
                </label>
                {input}
            </div>
        )
    }

    getTooltip() {
        const optionInfo = randomizerSettings[this.props.name];
        const defaultValue = "Default Value: " + optionInfo.default;
        return (
            <div className="tooltip randomizer-option" hidden>
                <div>{optionInfo.description}</div>
                <br />
                <div>{defaultValue}</div>
            </div>
        );
    }
}

export default RandomizerOptionElement;