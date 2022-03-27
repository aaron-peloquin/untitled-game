import {I_Mercenary} from 'TS_Mercenary';

interface I_Band {
  gold: number,
  mercenaries: I_Mercenary[],
  name: string
}

const BAND_DATASTORE: I_Band = {
  gold: 15,
  mercenaries: [],
  name: 'Mercenary Band Name',
};

export const band = () => {
  const addMercenary = (addMercenary:I_Mercenary) => {
    BAND_DATASTORE.mercenaries.push(addMercenary);
  };

  const removeMercenary = (removeMercenary:I_Mercenary) => {
    BAND_DATASTORE.mercenaries = BAND_DATASTORE.mercenaries.filter((bandMercenary) => bandMercenary === removeMercenary);
  };

  const adjustGold = (amount: number) => {
    BAND_DATASTORE.gold += amount;
  };

  const getData = () => BAND_DATASTORE;

  return {
    addMercenary,
    adjustGold,
    getData,
    removeMercenary,
  };
};
