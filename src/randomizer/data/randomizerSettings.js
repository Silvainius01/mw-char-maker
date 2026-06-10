const randomizerSettings = {
    NumAttributes: {
        name: 'Num Attributes',
        description: 'The number of attributes to pull skills from.',
        type: "number", 
        default: 3
    },

    MaxWeaponSkills: {
        name: 'Max Weapon Skills',
        description: 'The maximum amount of weapon skills that can be included.',
        type: "number",
         default: 2
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
         default: 1.5
    },

    MinRaceScore: {
        name: 'Race Score Threshold',
        description: 'The minimum compatibility score a race needs to be included in the distribution.',
        type: "number",
         default: 0
    },
    MinFactionScore: {
        name: 'Faction Score Threshold',
        description: 'The minimum compatibility score a faction needs to be included in the distribution.',
        type: "number",
         default: 2.5
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
    }
};

export default randomizerSettings;