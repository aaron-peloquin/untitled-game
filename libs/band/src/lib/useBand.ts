import { useCallback, useMemo, useReducer, useState } from 'react';
import {T_Band, T_BandController} from 'TS_Band';
import {I_Mercenary} from 'TS_Mercenary';

export const NEW_BAND: T_Band = {
  gold: 15,
  mercenaries: [],
  name: 'Mercenary Band Name',
};

type action = {
  type: string
  payload: I_Mercenary | number
}

export const useBand: () => T_BandController = () => {
  const [gold, setGold] = useState<number>(15);
  const [mercenaries, setMercenaries] = useState<I_Mercenary[]>([])

  const adjustGold = useCallback((adjustGoldBy: number) => {
    setGold(gold + adjustGoldBy)
  },[gold])

  const addMercenary = useCallback((newMercenary: I_Mercenary) => {
    const adjustedGold = gold - newMercenary.stats.cost
    if(adjustedGold<0) {
      return false
    }
    setGold(adjustedGold)
    const appendedMercenaries = [
      ...mercenaries,
      newMercenary,
    ]
    setMercenaries(appendedMercenaries)
    return true
  }, [mercenaries])

  const removeMercenary = useCallback((removeMerc: I_Mercenary) => {
    console.log('mercenaries', mercenaries)
    const filteredMercenaries = mercenaries.filter(({mercenaryId}) => mercenaryId !== removeMerc.mercenaryId)
    console.log('removing', {removeMerc,filteredMercenaries,mercenaries})
    setMercenaries(filteredMercenaries)
  }, [mercenaries])

  console.log({mercenaries})

  const result = useMemo<T_BandController>(() => ({
    data: {
      name: 'A band of mercs',
      gold,
      mercenaries,
    },
    adjustGold,
    removeMercenary,
    addMercenary,
  }), [gold, mercenaries, adjustGold, removeMercenary, addMercenary])

  return result
};
