import RandomizerOptionElement from "./RandomizerOptionElement";

function RandomizerOptions(props) {
    return (
        <div id="randomizer-options" hidden={!props.active}>
            <div className="title">Options</div>
            <div className="options-menu">
                <br />
                <RandomizerOptionElement name='NumAttributes' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='MaxWeaponSkills' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='MaxArmorSkills' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='MaxLockSkills' type="number"  randomizer={props.randomizer}/>
                <br />
                <RandomizerOptionElement name='RaceSkillWeight' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='RaceAttributeWeight'type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='MinRaceScore' type="number" randomizer={props.randomizer}/>
                <br />
                <RandomizerOptionElement name='FactionSkillWeight' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='FactionAttributeWeight' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='MinFactionScore' type="number" randomizer={props.randomizer}/>
                <br />
                <RandomizerOptionElement name='MajorSkillSpecWeight' type="number" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='MinorSkillSpecWeight' type="number" randomizer={props.randomizer}/>
                <br />
                <RandomizerOptionElement name='AllowAdvFactionPairs' type="button" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='ForceLockSkill' type="button" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='ForceWeaponSkill' type="button" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='ForceArmorSkill' type="button" randomizer={props.randomizer}/>
                <RandomizerOptionElement name='ForceTrainableAttrs' type="button" randomizer={props.randomizer}/>
            </div>
            <button onClick={props.onSelectionClick}>Accept</button>
            <button onClick={props.onSelectionClick}>Reset</button>
        </div>
    );
}

export default RandomizerOptions;