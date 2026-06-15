import { useState } from "react";

import RandomizerOptionElement from "./RandomizerOptionElement";

function RandomizerOptions(props) {
    const settings = props.randomizer.settings;
    const capFirst = (s) => { return s.replace(/^./, s[0].toUpperCase()); }
    const initNumber = (key) => { return settings[key].default.toString(); }
    const initButton = (key) => { return capFirst(settings[key].default.toString()); }

    let numberUpdate = (key, cv) => {
        let nv = Number(cv);

        if (Number.isNaN(nv))
            nv = settings[key].default;

        settings[key].value = nv;
        hookDict[key].setter(nv.toString());
        console.log(settings[key].name + " -> " + nv);
    }
    let buttonUpdate = (key, cv) => {
        // Button value comes in as a string
        const nv = cv === "false" ? true : false;

        settings[key].value = nv;
        hookDict[key].setter(capFirst(nv.toString()));
        console.log(settings[key].name + " -> " + nv);
    }
    const reset = () => {
        for (let key of Object.keys(hookDict)) {
            switch (settings[key].type) {
                case 'bool':
                    buttonUpdate(key, (!settings[key].default).toString());
                    break;
                case 'number':
                    numberUpdate(key, settings[key].default);
                    break;
            }
        }
        console.log("reset!");
    }

    // Generate useState hooks for every option
    const hookDict = {}
    Object.entries(settings).forEach((e) => {
        const key = e[0];
        const option = e[1];
        let init = undefined;
        const hook = hookDict[key] = {};

        switch (option.type) {
            case 'bool':
                init = initButton(key);
                hook.update = (cv) => buttonUpdate(key, cv);
                break;
            case 'number':
                init = initNumber(key);
                hook.update = (cv) => numberUpdate(key, cv);
                break;
            default: // Skip anything of unknown type
                return;
        }

        const [value, setValue] = useState(init);
        hook.value = value;
        hook.setter = setValue;
    });

    return (
        <div id="randomizer-options" hidden={!props.active}>
            <div className="title">Options</div>
            <div className="options-menu">
                <br />
                <RandomizerOptionElement name='NumAttributes' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MaxWeaponSkills' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MaxArmorSkills' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MaxLockSkills' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                <RandomizerOptionElement name='UseWeightedRaces' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='RaceSkillWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='RaceAttributeWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MinRaceScore' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                {/* <RandomizerOptionElement name='FactionSkillWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='FactionAttributeWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MinFactionScore' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='AllowAdvFactionPairs' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <br /> */}
                <RandomizerOptionElement name='MajorSkillSpecWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MinorSkillSpecWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                <RandomizerOptionElement name='UnarmoredIsArmor' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MarksmanIsWeapon' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='HandToHandIsWeapon' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='IgnoreDisabledSkills' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                <RandomizerOptionElement name='ForceLockSkill' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='ForceWeaponSkill' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='ForceArmorSkill' type="button" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='ForceTrainableAttrs' type="button" randomizer={props.randomizer} hooks={hookDict} />
            </div>
            <button onClick={props.onSelectionClick}>Accept</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default RandomizerOptions;