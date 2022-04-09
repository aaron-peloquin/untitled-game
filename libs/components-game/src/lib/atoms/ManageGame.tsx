// import {useDeleteSave, useSetCurrentSave} from '@helper';
import {useDeleteSave} from '@datastore';
import {useSetCurrentSave} from '@helper';
import {useRouter} from 'next/router';
import {memo, SyntheticEvent, useCallback, useState} from 'react';
import {T_GameSave} from 'TS_General';

type T_Props = {
    save: T_GameSave
}
export const ManageGame: React.FC<T_Props> = memo(({save}) => {
  const router = useRouter();
  const [promptDelete, setPromptDelete] = useState<boolean>(false);
  const setDeleteState = useCallback(() => {
    setPromptDelete(true);
  }, []);
  const saveId = save?.id || 0;

  const handleDeleteGame = useDeleteSave(saveId);

  const setGameSave = useSetCurrentSave();
  const handleLoadGame = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setGameSave(save.id);
  }, [save.id, setGameSave]);
  return <>
    <button onClick={handleLoadGame}>Load</button>
    <button onClick={setDeleteState}>Delete</button>
    <> {save.name}</>
    {promptDelete && <>. Are you sure you want to delete? <button onClick={handleDeleteGame}>Yes, delete</button></>}
  </>;
});
