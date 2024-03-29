import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions, T_KnownQuestTypes} from 'TS_General';


const mercenaries: {ethnicities: T_KnownEthnicities[], personalities: T_KnownPersonalities[], professions: T_KnownProfessions[]} = {
  ethnicities: [
    'human', 'human', 'human', 'human', 'human',
    'dwarf', 'dwarf', 'dwarf', 'dwarf', 'dwarf',
    'elf', 'elf', 'elf', 'elf', 'elf',
    'goblin',
  ],
  personalities: [
    'brave',
    'leader',
    'clever',
  ],
  professions: [
    'fighter', 'fighter', 'fighter', 'fighter',
    'rogue', 'rogue', 'rogue', 'rogue',
    'farmer',
    'fisher',
    'butcher',
  ],
};

const quests: {ethnicities: T_KnownEthnicities[], professions: T_KnownProfessions[]} = {
  ethnicities: [
    'human',
    'goblin',
    'dwarf',
    'elf',
  ],
  professions: [
    'fighter',
    'rogue',
    'farmer', 'farmer', 'farmer',
    'fisher', 'fisher', 'fisher',
    'butcher', 'butcher', 'butcher',
  ],
};

const questTypes: T_KnownQuestTypes[] = [
  'slay',
  // 'Capture',
  'follow',
];

export const worldGeneration = {
  mercenaries,
  questTypes,
  quests,
};
