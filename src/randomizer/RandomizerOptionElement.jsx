import { useState } from 'react';

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
        const hook = this.props.hooks[this.props.name];
        return (
            <button
                name={this.props.name}
                value={this.option.value}
                onClick={ e => hook.update(e.target.value) }//this.events.onRandomizerToggleClick}
            >
                {hook.value}
            </button>
        )
    }

    getInputHtml() {
        const hook = this.props.hooks[this.props.name];
        return (
            <input
                name={this.props.name}
                type={this.props.type}
                value={this.option.value}
                onChange={ e => hook.update(e.target.value) }
            />
        )
    }

    render() {
        const input = this.props.type === "button"
            ? (this.getButtonHtml())
            : (this.getInputHtml());
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
        const defaultValue = "Default Value: " + this.option.default;
        return (
            <div className="tooltip randomizer-option" hidden>
                <div>{this.option.description}</div>
                <br />
                <div>{defaultValue}</div>
            </div>
        );
    }
}

export default RandomizerOptionElement;