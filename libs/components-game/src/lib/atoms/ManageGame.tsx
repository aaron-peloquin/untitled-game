import {Button} from '@components-layout';
import {useDeleteSave, useSetCurrentGameSave} from '@datastore';
import {memo, SyntheticEvent, useCallback, useState} from 'react';
import {T_GameSave} from 'TS_General';

type T_Props = {
    save: T_GameSave
}
const ManageGame: React.FC<T_Props> = memo(({save}) => {
  const [promptDelete, setPromptDelete] = useState<boolean>(false);
  const setDeleteState = useCallback(() => {
    setPromptDelete(true);
  }, []);
  const saveId = save.gameSaveId || 0;

  const handleDeleteGame = useDeleteSave(saveId);

  const setGameSave = useSetCurrentGameSave();
  const handleLoadGame = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    setGameSave(saveId);
  }, [saveId, setGameSave]);
  return <>
    <Button text="Load" onClick={handleLoadGame} />
    <Button text="Delete" disabled={promptDelete} onClick={setDeleteState} />
    <> {save.name}</>
    {promptDelete && <>. Are you sure you want to delete? <Button text="Yes, Delete" onClick={handleDeleteGame} /></>}
  </>;
});

ManageGame.displayName = 'ManageGame';
export {ManageGame};
