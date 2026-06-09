import RandomizerOptionElement from "../hoverable/randomizer/RandomizerOptionElement";

/*
<RandomizerElement
    name="Options"
/> 
*/

function Randomizer(props) {
    return (
        <div id="randomizer">
            <div className="title">Randomizer</div>
            <button>
                Randomize
            </button>

            <button onClick={props.eventHandlers.onRandomizerOptionsClick}>
                Options
            </button>
                
            <button onClick={props.eventHandlers.onRandomizerInfoClick}>
                Info
            </button>
        </div>
    );
}

export default Randomizer;