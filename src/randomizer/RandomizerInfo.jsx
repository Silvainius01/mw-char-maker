function RandomizerInfo(props) {
    return (
        <div id="randomizer-info" hidden={!props.active}>
            <div>
                <div className="randomizer-how-to">
                    <div className="title">Generation Process</div>
                    <br/>
                    Clicking 'Randomize' will generate a character through the following process:
                    <p>1. Choose 3 random attributes. </p>
                    <p>2. Choose 10 random skills governed by those attributes</p>
                    <p>3. Choose a specialization based on major and minor skills</p>
                    <p>4. Randomly select a race, sex, and birthsign</p>


                    Note that Males and Females are considered different races when generating with the weighted distribution option.
                    <br/>
                    (e.g. Male Dark Elf and Female Dark Elf are processed as different races with identical skill bonuses but different attributes.)
                    <br/><br/>
                    Most of the buttons, levers, and dials that control the behaviour of the generator are availble to play with in the options menu.
                    <br/><br/>
                    If you want to see the statistics of the race distribution, press F12 and go to the debug console. I print it off in there.
                </div>
            </div>
            <button onClick={props.onSelectionClick}>OK</button>
        </div>
    );
}

export default RandomizerInfo;