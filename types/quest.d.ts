
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
    action: string
    icon?: IconType
    person: string
    styles?: Record<string, string>
  }

  type T_QuestOutcome = 'Victory' | 'Success' | 'Failure' | 'Death' | 'Caught'

  type T_QuestResultsMercenary = {
    remove: boolean
    health: number
    exp: number
  }

  type T_QuestResultsQuest = {
    remove: boolean
  }

  type T_QuestResultsBand = {
    exp: number
    gold: number
  }

  type T_QuestResults = {
    band: T_QuestResultsBand
    finalStyles: Record<string, string>
    mercenary: T_QuestResultsMercenary
    outcome: T_QuestOutcome
    quest: T_QuestResultsQuest
    roundsLog: T_QuestLogItem[]
  }

  type T_RunQuestArgs = {
    quest: T_Quest,
    mercenary: T_Mercenary,
    mercenaryStats: T_ParsedStats,
    questStats: T_ParsedStats
  }
  type T_RunQuestSig = (questRunnerArgsBag: T_RunQuestArgs) => T_QuestResults
}
