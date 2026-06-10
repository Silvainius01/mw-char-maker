import { useState } from "react";

import RandomizerOptionElement from "./RandomizerOptionElement";

function RandomizerOptions(props) {
    const hookDict = {}
    const settings = props.randomizer.settings;

    // Numeric options
    const [n0, setN0] = useState(settings['NumAttributes'].value); hookDict['NumAttributes'] = { value: n0, setter: setN0 };
    const [n1, setN1] = useState(settings['MaxWeaponSkills'].value); hookDict['MaxWeaponSkills'] = { value: n1, setter: setN1 };
    const [n2, setN2] = useState(settings['MaxArmorSkills'].value); hookDict['MaxArmorSkills'] = { value: n2, setter: setN2 };
    const [n3, setN3] = useState(settings['MaxLockSkills'].value); hookDict['MaxLockSkills'] = { value: n3, setter: setN3 };
    const [n4, setN4] = useState(settings['RaceSkillWeight'].value); hookDict['RaceSkillWeight'] = { value: n4, setter: setN4 };
    const [n5, setN5] = useState(settings['RaceAttributeWeight'].value); hookDict['RaceAttributeWeight'] = { value: n5, setter: setN5 };
    const [n6, setN6] = useState(settings['MinRaceScore'].value); hookDict['MinRaceScore'] = { value: n6, setter: setN6 };
    const [n7, setN7] = useState(settings['FactionSkillWeight'].value); hookDict['FactionSkillWeight'] = { value: n7, setter: setN7 };
    const [n8, setN8] = useState(settings['FactionAttributeWeight'].value); hookDict['FactionAttributeWeight'] = { value: n8, setter: setN8 };
    const [n9, setN9] = useState(settings['MinFactionScore'].value); hookDict['MinFactionScore'] = { value: n9, setter: setN9 };
    const [n10, setN10] = useState(settings['MajorSkillSpecWeight'].value); hookDict['MajorSkillSpecWeight'] = { value: n10, setter: setN10 };
    const [n11, setN11] = useState(settings['MinorSkillSpecWeight'].value); hookDict['MinorSkillSpecWeight'] = { value: n11, setter: setN11 };
    let numberUpdate = (key, cv) => {
        let nv = Number(cv);

        if (Number.isNaN(nv))
            nv = settings[key].default;

        settings[key].value = nv;
        hookDict[key].setter(nv.toString());
        console.log(settings[key].name + " -> " + nv);
    }

    // Toggle options
    const [b0, setB0] = useState(settings['AllowAdvFactionPairs'].value); hookDict['AllowAdvFactionPairs'] = { value: b0, setter: setB0 };
    const [b1, setB1] = useState(settings['ForceLockSkill'].value); hookDict['ForceLockSkill'] = { value: b1, setter: setB1 };
    const [b2, setB2] = useState(settings['ForceWeaponSkill'].value); hookDict['ForceWeaponSkill'] = { value: b2, setter: setB2 };
    const [b3, setB3] = useState(settings['ForceArmorSkill'].value); hookDict['ForceArmorSkill'] = { value: b3, setter: setB3 };
    const [b4, setB4] = useState(settings['ForceTrainableAttrs'].value); hookDict['ForceTrainableAttrs'] = { value: b4, setter: setB4 };
    let buttonUpdate = (key, cv) => {
        const nv = cv === "false" ? true : false;

        // Capitalize first letter
        let str = nv.toString();
        str = str.replace(/^./, str[0].toUpperCase());

        settings[key].value = nv;
        hookDict[key].setter(str);
        console.log(settings[key].name + " -> " + nv);
    }

    // Generate auto updaters
    for (let key of Object.keys(hookDict)) {
        hookDict[key].update = (cv) => {
            switch (settings[key].type) {
                case 'bool':
                    buttonUpdate(key, cv);
                    break;
                case 'number':
                    numberUpdate(key, cv)
                    break;
            }
        }
    }

    const [tick, setState] = useState(false);
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
                <RandomizerOptionElement name='RaceSkillWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='RaceAttributeWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MinRaceScore' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                <RandomizerOptionElement name='FactionSkillWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='FactionAttributeWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MinFactionScore' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                <RandomizerOptionElement name='MajorSkillSpecWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <RandomizerOptionElement name='MinorSkillSpecWeight' type="number" randomizer={props.randomizer} hooks={hookDict} />
                <br />
                <RandomizerOptionElement name='AllowAdvFactionPairs' type="button" randomizer={props.randomizer} hooks={hookDict} />
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