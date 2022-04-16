import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions, T_KnownQuestTypes} from 'TS_General';


const mercenaries: {ethnicities: T_KnownEthnicities[], personalities: T_KnownPersonalities[], professions: T_KnownProfessions[]} = {
  ethnicities: ['human', 'human', 'human', 'human', 'human', 'human', 'human', 'human', 'human', 'goblin'],
  personalities: ['brave', 'brave', 'leader'],
  professions: ['fighter', 'fighter', 'fighter', 'farmer'],
};

const quests: {ethnicities: T_KnownEthnicities[], professions: T_KnownProfessions[]} = {
  ethnicities: ['human', 'goblin'],
  professions: ['fighter', 'farmer', 'farmer', 'farmer'],
};

const questTypes: T_KnownQuestTypes[] = [
  'Slay',
  // 'Capture',
  // 'Follow',
];

export const worldGeneration = {
  mercenaries,
  questTypes,
  quests,
};
