
declare module 'TS_Quest' {
  import {T_ParsedStats} from 'TS_Stats'
  import {T_Mercenary} from 'TS_Mercenary'
  import {IndexableType, PromiseExtended} from 'dexie'
  import {T_KnownEthnicities, T_KnownProfessions, T_KnownQuestTypes, T_NumGenSig, T_TwoItemNumberArray} from 'TS_General'
  import CSS from 'csstype'

  type T_Quest = {
    questId: number
    level: number
    questCompletedByMercenaryId: number
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
    styles?: CSS.Properties
  }

  type T_QuestOutcome = 'Victory' | 'Failure' | 'Death'

  type T_QuestResultMercenary = {
    remove: boolean
    health: number
    exp: number
  }

  type T_QuestResultQuest = {
    remove: boolean
  }

  type T_QuestResultBand = {
    exp: number
    gold: number
  }

  type T_QuestResult = {
    outcome: T_QuestOutcome
    mercenary: T_QuestResultMercenary
    quest: T_QuestResultQuest
    band: T_QuestResultBand
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
