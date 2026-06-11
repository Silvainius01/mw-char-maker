
function RandomizerControls(props) {
    return (
        <div id="randomizer">
            <div className="title">Randomizer</div>
            <button onClick={props.randomizer.events.onRandomizerClick}>
                Randomize
            </button>

            <button onClick={props.randomizer.events.onRandomizerOptionsClick}>
                Options
            </button>
                
            <button onClick={props.randomizer.events.onRandomizerInfoClick}>
                Info
            </button>
        </div>
    );
}

export default RandomizerControls;