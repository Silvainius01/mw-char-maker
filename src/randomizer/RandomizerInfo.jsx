function RandomizerInfo(props) {
    return (
        <div id="randomizer-info" hidden={!props.active}>
            <div>
                <div className="randomizer-how-to">
                    <div className="title">Generation Process</div>
                    <br/>
                    Clicking 'Randomize' will, by default, generate a character through a 5-step process:
                    <p>1. Choose 3 random attributes. </p>
                    <p>2. Choose 10 random skills governed by those attributes</p>
                    <p>3. Choose a specialization based on skill selection</p>
                    <p>4. Generate weighted distributions for both race and faction based on the attributes and skills that were selected</p>
                    <p>5. Randomly pull a race and two factions from those distributions.</p>

                    Note that Males and Females are considered as different races when generating the distribution, so the differences between the sexes are automatically factored in.
                    (e.g.) Male Dark Elf and Female Dark Elf are processed as different races with identical skill bonuses but different attributes.
                </div>
            </div>
            <button onClick={props.onSelectionClick}>OK</button>
        </div>
    );
}

export default RandomizerInfo;