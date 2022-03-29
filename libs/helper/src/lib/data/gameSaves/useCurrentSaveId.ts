import {useCurrentSave} from './useCurrentSave';

export const useCurrentSaveId = () => {
  const currentSave = useCurrentSave();
  return currentSave?.id;
};

