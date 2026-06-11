import { shuffle } from "../utils";

import races from "../gamedata/races";
import skills from "../gamedata/skills";
import primaryAttributes from "../gamedata/primaryAttributes";

import RandomizerOptionElement from "./RandomizerOptionElement";

function attr(skill) {
    return skills[skill].governingAttribute;
}

function generateSkills(options, attributes) {
    const numSkills = 10;
    const maxLocks = options['MaxLockSkills'].value;
    const maxArmors = options['MaxArmorSkills'].value;
    const maxWeapons = options['MaxWeaponSkills'].value;
    const lockSkills = options['LockSkills'].value;
    const armorSkills = options['ArmorSkills'].value;
    const weaponSkills = options['WeaponSkills'].value;


    // Sort skills into primary and secondary arrays
    const skillNames = Object.keys(skills);
    const attrSkills = shuffle(skillNames.filter((s) => { return  attrsInit.includes(attr(s)); }));
    const miscSkills = shuffle(skillNames.filter((s) => { return !attrsInit.includes(attr(s)); }));

    // Get total number of skills in each attribute
    const attributeCount = {};
    Object.keys(primaryAttributes).forEach((key) => { attributeCount[key] = 0; });
    skillNames.forEach((skill) => { ++attributeCount[attr(skill)] })

    // Trackers for what kind of skills are added
    let numLocks = 0;
    let numArmors = 0;
    let numWeapons = 0;
    let classSkills = [];
    let skillAttributes = {};

    // Skill utility
    const AtCategoryCapacity = (skill) => {
        return 
        (numLocks >= maxLocks && lockSkills.includes(skill)) ||
        (numArmors >= maxArmors && armorSkills.includes(skill)) ||
        (numWeapons >= maxWeapons && weaponSkills.includes(skill));
    }
    const AtAttributeCapacity = (skill) => {
        const gov = attr(skill);
        return 
            options['ForceTrainableAttrs'].value && skillAttributes.has(gov) &&
            attributeCount[gov] >= skillAttributes(gov);
    }
    const IsValidSkill = (skill) => {
        if(AtCategoryCapacity(skill)) {
            console.log(`Skipped ${skill}: category limit reached`);
            return false;
        }
        if(AtAttributeCapacity(skill)) {
            console.log(`Skipped ${skill}: attribute limit reached`);
            return false;
        }
        if(classSkills.has(skill)) {
            console.log(`Skipped ${skill}: already added`);
            return false;
        }
        return true;
    }
    const AddSkill = (skill) => {
        if(lockSkills.includes(skill))
            ++numLocks;
        if(armorSkills.includes(skill))
            ++numArmors;
        if(weaponSkills.includes(skill))
            ++numWeapons;

        const gov = attr(skill);
        if(!skillAttributes.has(gov))
            skillAttributes[gov] = 0;
        ++skillAttributes[gov];

        classSkills.push(skill);
    }

    // Add skills from the primary pool first
    for(let i = 0; i < attrSkills.length && classSkills.length < numSkills; ++i) {
        const skill = attrSkills[i];
        if(IsValidSkill(skill)) {
            AddSkill(skill);
            console.log(`Adding ${skill}`);
        }
    }

    return classSkills;
}

function generateCharacter(options) {
    console.log("Generating new character...");

    // Shorthands for settings
    const numAttrs = options['NumAttributes'].value;

    // Choose random attributes
    const attrsInit = shuffle(Object.keys(primaryAttributes).filter((a) => a != "luck")).slice(0, numAttrs);
    console.log(attrsInit);

    generateSkills(options, attrsInit);
    
}

export {
    generateCharacter
}