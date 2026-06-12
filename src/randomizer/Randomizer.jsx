import { randomElement, shuffle } from "../utils";

import races from "../gamedata/races";
import skills from "../gamedata/skills";
import primaryAttributes from "../gamedata/primaryAttributes";
import birthsigns from "../gamedata/birthsigns";

import RandomizerOptionElement from "./RandomizerOptionElement";

const attrNames = Object.keys(primaryAttributes);

function attr(skill) {
    return skills[skill].governingAttribute;
}
function attrCount(_skills) {
    let attributeCount = {};
    attrNames.forEach((key) => { attributeCount[key] = 0; });
    _skills.forEach((skill) => { ++attributeCount[attr(skill)] })
    return attributeCount;
}
function getAttrsFromSkills(options, _skills) {
    const numAttrs = options['NumAttributes'].value;
    const attributeCount = attrCount(_skills);
    //const attributeNames = [...attrNames];
    return attrNames.sort((a, b) => attributeCount[b] - attributeCount[a]).slice(0, numAttrs);
}

function spec(skill) {
    return skills[skill].spec;
}
function getSpecFromSkills(options, _skills) {
    const halfLength = _skills.length / 2;
    const majorWeight = options['MajorSkillSpecWeight'].value;
    const minorWeight = options['MinorSkillSpecWeight'].value;
    let most = 'combat';
    let specCount = {
        magic: 0,
        combat: 0,
        stealth: 0
    }

    for (let i = 0; i < _skills.length; ++i) {
        const s = spec(_skills[i]);
        const score = i < halfLength ? majorWeight : minorWeight;
        specCount[s] += score;
        if (specCount[s] > specCount[most])
            most = s;
    }
    return most;
}

function generateSkills(options, attributes) {
    const numSkills = options['NumSkills'].value;
    const maxLocks = options['MaxLockSkills'].value;
    const maxArmors = options['MaxArmorSkills'].value;
    const maxWeapons = options['MaxWeaponSkills'].value;
    const disabled = options['DisabledSkills'].value;

    const lockSkills = options['LockSkills'].value;
    const armorSkills = options['ArmorSkills'].value.filter((s) => {
        const unarmored = options['UnarmoredIsArmor'].value;
        if ((!unarmored && s === "unarmored"))
            return false;
        return true;
    });
    const weaponSkills = options['WeaponSkills'].value.filter((s) => {
        const marksman = options['MarksmanIsWeapon'].value;
        const hand2hand = options['HandToHandIsWeapon'].value;
        if ((!marksman && s === "marksman") || (!hand2hand && s === "hand-to-hand"))
            return false;
        return true;
    });


    // Sort skills into primary and secondary arrays
    const skillNames = Object.keys(skills).filter((s) => !disabled.includes(s));
    const attrSkills = shuffle(skillNames.filter((s) => { return attributes.includes(attr(s)); }));
    const miscSkills = shuffle(skillNames.filter((s) => { return !attributes.includes(attr(s)); }));
    const attributeCount = attrCount(skillNames); // Total number of skills in each attribute

    // Trackers for what kind of skills are added
    let numLocks = 0;
    let numArmors = 0;
    let numWeapons = 0;
    let classSkills = [];
    let skillAttributes = {};

    // Skill utility
    const AtCategoryCapacity = (skill) => {
        const result =
            (numLocks >= maxLocks && lockSkills.includes(skill)) ||
            (numArmors >= maxArmors && armorSkills.includes(skill)) ||
            (numWeapons >= maxWeapons && weaponSkills.includes(skill));
        return result;
    }
    const AtAttributeCapacity = (skill) => {
        const gov = attr(skill);
        const result =
            options['ForceTrainableAttrs'].value &&
            Object.hasOwn(skillAttributes, gov) &&
            skillAttributes[gov] >= attributeCount[gov] - 1;
        return result;
    }
    const IsValid = (skill) => {
        if (AtCategoryCapacity(skill)) {
            console.log(`Skipped ${skill}: category limit reached`);
            return false;
        }
        if (AtAttributeCapacity(skill)) {
            console.log(`Skipped ${skill}: attribute limit reached`);
            return false;
        }
        if (classSkills.includes(skill)) {
            console.log(`Skipped ${skill}: already added`);
            return false;
        }
        return true;
    }
    const AddSkill = (skill) => {
        if (lockSkills.includes(skill))
            ++numLocks;
        if (armorSkills.includes(skill))
            ++numArmors;
        if (weaponSkills.includes(skill))
            ++numWeapons;

        const gov = attr(skill);
        if (!Object.hasOwn(skillAttributes, gov))
            skillAttributes[gov] = 0;
        ++skillAttributes[gov];

        classSkills.push(skill);
    }

    // Add skills from the primary pool first
    console.log("======== PHASE 1 ========");
    for (let i = 0; i < attrSkills.length && classSkills.length < numSkills; ++i) {
        const skill = attrSkills[i];
        if (IsValid(skill)) {
            AddSkill(skill);
            console.log(`Adding ${skill}`);
        }
    }

    // Exit early if we get lucky
    if (classSkills.length === numSkills)
        return classSkills;

    // Validation utility
    const missingLocks = () => options['ForceLockSkill'].value ? 1 - numLocks : 0;
    const missingArmors = () => options['ForceArmorSkill'].value ? 1 - numArmors : 0;
    const missingWeapons = () => options['ForceWeaponSkill'].value ? 1 - numWeapons : 0;
    const missingReqs = () => missingLocks() + missingArmors() + missingWeapons();
    const IsRequired = (skill) => {
        const result =
            (missingLocks() > 0 && lockSkills.includes(skill)) ||
            (missingArmors() > 0 && armorSkills.includes(skill)) ||
            (missingWeapons() > 0 && weaponSkills.includes(skill));
        return result;
    }
    const RemoveSkill = (skill) => {
        const index = classSkills.indexOf(skill);
        if (index < 0)
            return false;

        if (lockSkills.includes(skill))
            --numLocks;
        else if (armorSkills.includes(skill))
            --numArmors;
        else if (weaponSkills.includes(skill))
            --numWeapons;

        --skillAttributes[attr(skill)];
        classSkills.splice(index, 1);
        console.log(`Removed ${skill}`);
    }

    // If there is not enough room for required skills, remove some.
    console.log("======== REMOVAL ========");
    for (let i = classSkills.length - 1; i >= 0 && classSkills.length > numSkills - missingReqs(); --i) {
        let s = classSkills[i];
        if (!IsRequired(s)) {
            RemoveSkill(s);
            console.log(`Removed ${skill}: needed room`);
        }
    }

    // Add any required skills from primary skills first.
    console.log("======== PHASE 2 ========");
    for (let i = 0; i < attrSkills.length && classSkills.length < numSkills; ++i) {
        const s = attrSkills[i];
        const canAddValid = (numSkills - classSkills.length) > missingReqs();
        if (IsRequired(s)) {
            AddSkill(s);
            console.log(`Added ${s}: required`);
        }
        else if (canAddValid && IsValid(s)) {
            AddSkill(s);
            console.log(`Added ${s}: filling from primary`);
        }
    }

    // Add required skills and fill gaps from secondary skills
    console.log("======== PHASE 3 ========");
    for (let i = 0; i < miscSkills.length && classSkills.length < numSkills; ++i) {
        const s = miscSkills[i];
        const canAddValid = (numSkills - classSkills.length) > missingReqs();
        if (IsRequired(s)) {
            AddSkill(s);
            console.log(`Added ${s}: required`);
        }
        else if (canAddValid && IsValid(s)) {
            AddSkill(s);
            console.log(`Added ${s}: filling from secondary`);
        }
    }

    if (classSkills.length > numSkills)
        console.error("TOO MANY SKILLS");
    else if (classSkills.length < numSkills)
        console.error("NOT ENOUGH SKILLS");
    return classSkills;
}


function generateAttrDistribution(options, _skills, attriubtes) {
    const attributeCount = attrCount(_skills.filter((s) => attriubtes.includes(attr(s))));
    let scores = {
        total: 0
    };

    Object.entries(attributeCount).forEach((entry) => {
        scores.total += entry[1];
        scores[entry[0]] = { score: entry[1] };
    });

    return scores;
}
function generateRaceDistribution(options, _skills, attributes) {
    const minScore = options['MinRaceScore'].value;
    const skillWeight = options['RaceSkillWeight'].value;
    const attributeWeight = options['RaceAttributeWeight'].value;

    let scores = {
        total: 0
    };

    Object.entries(races).forEach((entry) => {
        let skillScore = 0;
        let totalScoreMale = 0;
        let totalScoreFemale = 0;
        const name = entry[0];
        const race = entry[1];

        Object.entries(race.skills).forEach((entry) => {
            const skill = entry[0];
            const bonus = entry[1];
            if (_skills.includes(skill))
                skillScore += bonus * skillWeight;
        });
        Object.entries(race.primaryAttributes.male).forEach((entry) => {
            const attr = entry[0];
            const value = entry[1];
            if (attributes.includes(attr))
                totalScoreMale += (value - 40) * attributeWeight;
        });
        Object.entries(race.primaryAttributes.female).forEach((entry) => {
            const attr = entry[0];
            const value = entry[1];
            if (attributes.includes(attr))
                totalScoreFemale += (value - 40) * attributeWeight;
        });

        totalScoreMale += skillScore;
        totalScoreFemale += skillScore;

        if (totalScoreMale >= minScore)
            scores.total += totalScoreMale;
        if (totalScoreFemale >= minScore)
            scores.total += totalScoreFemale;

        scores[`Male ${name}`] = {
            name: name,
            sex: 'male',
            score: totalScoreMale
        }
        scores[`Female ${name}`] = {
            name: name,
            sex: 'female',
            score: totalScoreMale
        }
    });

    return scores;
}

function logDistribution(name, distro, minScore) {
    let msg = `${name} Distribution:`
    const entries = Object.entries(distro)
        .filter((e) => e[0] !== "total" && e[1] !== undefined)
        .sort((a, b) => b[1].score - a[1].score);
    entries.forEach((entry) => {
        const tabs = entry[0].length < 15 ? "\t\t" : "\t";
        let chance = entry[1].score >= minScore
            ? (entry[1].score / distro.total) * 100
            : 0;
            msg += `\n\t${entry[0]}:${tabs}${chance.toFixed(2)}% (${entry[1].score})`
    });
    console.log(msg);
}

function generateCharacter(options) {
    console.log("Generating new character...");

    // Shorthands for settings
    const numAttrs = options['NumAttributes'].value;

    // Choose random attributes
    const attrsInit = shuffle(attrNames.filter((a) => a != "luck")).slice(0, numAttrs);
    console.log(attrsInit);

    const classSkills = generateSkills(options, attrsInit);
    const attrsActual = getAttrsFromSkills(options, classSkills);
    console.log(attrsActual);
    console.log(classSkills);

    const attrScores = generateAttrDistribution(options, classSkills, attrsActual);
    const raceScores = generateRaceDistribution(options, classSkills, attrsActual);
    const randomEntry = (scores, minScore) => {
        const r = Math.random();
        const totalScore = scores.total;
        const entries = Object.entries(scores)
            .filter((e) => e[0] !== "total" && e[1] !== undefined)
            .sort((a, b) => b[1].score - a[1].score);

        let chance = 0;
        let selected = 0;
        for (let i = 0; i < entries.length; ++i) {
            const entry = entries[i];
            let score = entry[1].score >= minScore ? entry[1].score : 0;
            chance += score / totalScore;
            if (r < chance) {
                selected = i;
                break;
            }
        }

        return entries[selected];
    }

    const firstAttribute = attrsActual[0];
    const secondAttribute = attrsActual[1];
    const specialization = getSpecFromSkills(options, classSkills);
    const selectedRace = randomEntry(raceScores, options['MinRaceScore'].value);
    const birthsign = randomElement(Object.keys(birthsigns));

    console.log(selectedRace[0]);
    console.log(firstAttribute + " " + secondAttribute);
    logDistribution("Race", raceScores, options['MinRaceScore'].value);

    const nsHalf = options['NumSkills'].value / 2;
    const newState = {
        race: selectedRace[1].name,
        sex: selectedRace[1].sex,
        specialization: specialization,
        birthsign: birthsign,
        favoredAttributes: [firstAttribute, secondAttribute],
        majorSkills: classSkills.slice(0, nsHalf),
        minorSkills: classSkills.slice(nsHalf)
    }
    return newState;
}

export {
    generateCharacter
}