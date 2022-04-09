
declare module 'TS_Quest' {
  import {T_Mercenary} from 'TS_Mercenary'
  import {T_NumGenSig, T_TwoItemNumberArray} from 'TS_General'
  import {IndexableType, PromiseExtended} from 'dexie'

  type T_Quest = {
    questId: number
    level: number
    type: string
    targetEthnicity: string
    targetName: string
    targetProfession: string
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

  type T_QuestResult = {
    outcome: string
    removeMercenary: boolean
    rewards: {
      bandExp: number
      mercenaryExp: number
      gold: number
    }
    roundsLog: T_QuestLogItem[]
  }

  type T_RunQuestSig = (quest: T_BaseQuest, mercenary: T_Mercenary) => T_QuestResult
}
