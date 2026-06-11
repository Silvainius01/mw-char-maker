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

    if(classSkills.length > numSkills)
        console.error("TOO MANY SKILLS");
    else if(classSkills.length < numSkills)
        console.error("NOT ENOUGH SKILLS");
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