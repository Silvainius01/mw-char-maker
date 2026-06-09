import Person from './Person';
import Class from './Class';
import Birthsign from './Birthsign';
import Randomizer from './Randomizer';

function Form(props) {
    return (
        <div id="form">
            <Person
                eventHandlers={props.eventHandlers.person}
                name={props.data.name}
                race={props.data.race}
                sex={props.data.sex}
            />
            <Class
                eventHandlers={props.eventHandlers.class}
                specialization={props.data.specialization}
                favoredAttributes={props.data.favoredAttributes}
                majorSkills={props.data.majorSkills}
                minorSkills={props.data.minorSkills}
            />
            <Birthsign
                eventHandlers={props.eventHandlers.birthsign}
                birthsign={props.data.birthsign}
            />
            <div id="randomizer">
                <Randomizer
                    eventHandlers={props.eventHandlers.randomizer}
                />
            </div>
        </div>
    );
}

export default Form;