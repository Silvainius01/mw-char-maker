const randomizerSettings = {
    NumAttributes: {
        name: 'Num Attributes',
        description: 'The number of attributes to pull skills from.',
        type: "number",
        default: 3
    },
    NumSkills: { // Defined in case some modder comes around and messes with skills
        name: 'Num Skills',
        description: 'The number of skills pulled from the attribute pool.',
        type: "number",
        default: 10
    },
    MaxWeaponSkills: {
        name: 'Max Weapon Skills',
        description: 'The maximum amount of weapon skills that can be included.',
        type: "number",
        default: 1
    },
    MaxArmorSkills: {
        name: 'Max Armor Skills',
        description: 'The maximum amount of armor skills that can be included.',
        type: "number",
        default: 1
    },
    MaxLockSkills: {
        name: 'Num Lockpick Skills',
        description: 'The maximum amount of lockpicking skills that can be included.',
        type: "number",
        default: 1
    },

    UseWeightedRaces: {
        name: 'Use Weighted Races',
        description: `If enabled, the generator will use a weighted distribution for race selection based on skills and attributes.\n\nWARNING: this will heavily favor races that are capable all-rounders or have some capacity for magic.`,
        type: "bool",
        default: false
    },
    RaceSkillWeight: {
        name: 'Race Skill Weight',
        description: 'How important skill bonuses are when building the distribution for races.',
        type: "number",
        default: 0.2
    },
    RaceAttributeWeight: {
        name: 'Race Attribute Weight',
        description: 'How important attribute bonuses are when building the distribution for races.',
        type: "number",
        default: 0.2
    },
    MinRaceScore: {
        name: 'Race Score Threshold',
        description: 'The minimum compatibility score a race needs to be included in the distribution.',
        type: "number",
        default: 0
    },

    FactionSkillWeight: {
        name: 'Faction Skill Weight',
        description: 'How important a faction\'s favored skills are when building the distribution for factions.',
        type: "number",
        default: 1
    },
    FactionAttributeWeight: {
        name: 'Faction Attribute Weight',
        description: 'How important a faction\'s favored attributes are when building the distribution for factions.',
        type: "number",
        default: 0.5
    },
    MinFactionScore: {
        name: 'Faction Score Threshold',
        description: 'The minimum compatibility score a faction needs to be included in the distribution.',
        type: "number",
        default: 2.5
    },

    MajorSkillSpecWeight: {
        name: 'Major Skill Spec Weight',
        description: 'How important Major Skills are when determining specializtion.',
        type: "number",
        default: 1
    },
    MinorSkillSpecWeight: {
        name: 'Minor Skill Spec Weight',
        description: 'How important Minor Skills are when determining specializtion.',
        type: "number",
        default: 1.25
    },

    AllowAdvFactionPairs: {
        name: 'Advanced Faction Pairs',
        description: 'If enabled, allows faction pairings that require specific quest completion order and/or game knowledge to complete both factions.',
        type: "bool",
        default: false
    },
    ForceLockSkill: {
        name: 'Force Lockpicking Skill',
        description: 'If enabled, forces the generator to include at least one skill that opens locks.',
        type: "bool",
        default: false
    },
    ForceWeaponSkill: {
        name: 'Force Weapon Skill',
        description: 'If enabled, forces the generator to include at least one weapon skill.',
        type: "bool",
        default: true
    },
    ForceArmorSkill: {
        name: 'Force Armor Skill',
        description: 'If enabled, forces the generator to include at least one armor skill.',
        type: "bool",
        default: true
    },
    ForceTrainableAttrs: {
        name: 'Force Trainable Attributes',
        description: 'If enabled, forces the generator to keep at least one skill from every attribute under Misc Skills.',
        type: "bool",
        default: true
    },

    UnarmoredIsArmor: {
        name: 'Unarmored Is Armor',
        description: `If enabled, the generator will consider unarmored an armor skill.\n\nTurning this off is helpful for beast races.`,
        type: "bool",
        default: false
    },
    MarksmanIsWeapon: {
        name: 'Marksman Is Weapon',
        description: `If enabled, the generator will consider marksman a weapon skill.\n\nReccomended to turn off if 'Max Weapon Skill' is set to 1.`,
        type: "bool",
        default: false
    },
    HandToHandIsWeapon: {
        name: 'Hand-to-Hand Is Weapon',
        description: `If enabled, the generator will consider Hand-to-Hand a weapon skill.\n\nReccomended to turn off if 'Max Weapon Skill' is set to 1.`,
        type: "bool",
        default: false
    },
    IgnoreDisabledSkills: {
        name: 'Ignore Disabled Skills',
        description: `If enabled, the generator will never use skills that have been disabled.\n\nBy default, these skills are Armorer and Hand to Hand`,
        type: "bool",
        default: true
    },

    LockSkills: {
        name: 'Lockpicking Skills',
        description: 'The skills the generator counts as able to open locks',
        type: "array",
        default: [
            "security",
            "alteration"
        ]
    },
    ArmorSkills: {
        name: 'Lockpicking Skills',
        description: 'The skills the generator counts as able to open locks',
        type: "array",
        default: [
            "light_armor",
            "medium_armor",
            "heavy_armor",
            "unarmored"
        ]
    },
    WeaponSkills: {
        name: 'Lockpicking Skills',
        description: 'The skills the generator counts as able to open locks',
        type: "array",
        default: [
            "axe",
            "blunt_weapon",
            "long_blade",
            "spear",
            "hand-to-hand",
            "short_blade",
            "marksman"
        ]
    },
    DisabledSkills: {
        name: 'Disabled Skills',
        description: 'The skills the generator counts as able to open locks',
        type: "array",
        default: [
            "armorer",
            "hand-to-hand",
        ]
    },
};

export default randomizerSettings;