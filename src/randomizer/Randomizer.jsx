import RandomizerOptionElement from "./RandomizerOptionElement";

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

            <button onClick={props.randomizer.events.onRandomizerOptionsClick}>
                Options
            </button>
                
            <button onClick={props.randomizer.events.onRandomizerInfoClick}>
                Info
            </button>
        </div>
    );
}

export default Randomizer;