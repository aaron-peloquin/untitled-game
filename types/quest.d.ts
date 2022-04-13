
declare module 'TS_Quest' {
  import {T_ParsedStats} from 'TS_Stats'
  import {T_Mercenary} from 'TS_Mercenary'
  import {IndexableType, PromiseExtended} from 'dexie'
  import {T_KnownEthnicities, T_KnownProfessions, T_KnownQuestTypes, T_NumGenSig, T_TwoItemNumberArray} from 'TS_General'

  type T_Quest = {
    questId: number
    level: number
    type: T_KnownQuestTypes
    targetEthnicity: T_KnownEthnicities
    targetName: string
    targetProfession: T_KnownProfessions
}

  type T_createQuestArgs = {
    numberGenerator: T_NumGenSig
    levelRange: T_TwoItemNumberArray
  }

  type T_createQuestSig = (T_createQuestArgs) => PromiseExtended<IndexableType>

  type T_QuestLogItem = {
    person: string
    action: string
  }

  type T_QuestOutcome = 'Victory' | 'Failure' | 'Death'

  type T_QuestResult = {
    outcome: T_QuestOutcome
    removeMercenary: boolean
    mercenaryCurrentHealth: number
    rewards: {
      bandExp: number
      mercenaryExp: number
      gold: number
    }
    roundsLog: T_QuestLogItem[]
  }

  type T_RunQuestArgs = {
    quest: T_Quest,
    mercenary: T_Mercenary,
    mercenaryStats: T_ParsedStats,
    questStats: T_ParsedStats
  }
  type T_RunQuestSig = (questRunnerArgsBag: T_RunQuestArgs) => T_QuestResult
}
