import {T_KnownEthnicities, T_KnownPersonalities, T_KnownProfessions} from 'TS_Stats';


const mercenaries: {ethnicities: T_KnownEthnicities[], personalities: T_KnownPersonalities[], professions: T_KnownProfessions[]} = {
  ethnicities: ['human'],
  personalities: ['brave', 'leader'],
  professions: ['fighter', 'fighter', 'fighter', 'farmer'],
};

const quests: {ethnicities: T_KnownEthnicities[], professions: T_KnownProfessions[]} = {
  ethnicities: ['human'],
  professions: ['fighter', 'farmer', 'farmer', 'farmer'],
};

const questTypes = [
  'Slay',
  'Capture',
  'Follow',
];

export const worldGeneration = {
  mercenaries,
  questTypes,
  quests,
};
