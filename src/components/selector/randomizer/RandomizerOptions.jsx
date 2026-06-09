import RandomizerOptionElement from "../../hoverable/randomizer/RandomizerOptionElement";

function RandomizerOptions(props) {
    return (
        <div id="randomizer-options" hidden={!props.active}>
            <div>
                <div className="options-menu">
                    <div className="title">Options</div>
                    <br/>
                    <RandomizerOptionElement name='NumAttributes'>
                        <input></input>
                    </RandomizerOptionElement>
                    <RandomizerOptionElement name='MaxWeaponSkills'/>
                    <RandomizerOptionElement name='MaxArmorSkills'/>
                    <RandomizerOptionElement name='MaxLockSkills'/>
                    <br/>
                    <RandomizerOptionElement name='RaceSkillWeight'/>
                    <RandomizerOptionElement name='RaceAttributeWeight'/>
                    <RandomizerOptionElement name='MinRaceScore'/>
                    <br/>
                    <RandomizerOptionElement name='FactionSkillWeight'/>
                    <RandomizerOptionElement name='FactionAttributeWeight'/>
                    <RandomizerOptionElement name='MinFactionScore'/>
                    <br/>
                    <RandomizerOptionElement name='MajorSkillSpecWeight'/>
                    <RandomizerOptionElement name='MinorSkillSpecWeight'/>
                    <br/>
                    <RandomizerOptionElement name='AllowAdvFactionPairs'/>
                    <RandomizerOptionElement name='ForceLockSkill'/>
                    <RandomizerOptionElement name='ForceWeaponSkill'/>
                    <RandomizerOptionElement name='ForceArmorSkill'/>
                    <RandomizerOptionElement name='ForceTrainableAttrs'/>
                </div>
            </div>
            <button onClick={props.onSelectionClick}>Accept</button>
            <button onClick={props.onSelectionClick}>Reset</button>
        </div>
    );
}

export default RandomizerOptions;