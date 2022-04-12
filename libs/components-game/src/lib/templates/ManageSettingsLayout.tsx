import {Button, Card, GridArea, GridTemplate} from '@components-layout';
import {useDeleteGameSetting, useListGameSettings, useSetGameSetting} from '@datastore';

import {TopNav} from '../organisms/TopNav';

export const ManageSettingsLayout = () => {
  const settings = useListGameSettings();
  const handleChange = useSetGameSetting();
  const resetSetting = useDeleteGameSetting();
  return <>
    <TopNav />
    <Card heading='Settings' layer="2">
      <form>
        <Card layer="3">
          <GridTemplate gridTemplateColumns="1fr 2fr 1fr" gridGap="16px">
            {settings.map((setting) => {
              return <>
                <GridArea textAlign="right"><label htmlFor={setting.name}>{setting.label}: </label></GridArea>
                <GridArea><input name={setting.name} onChange={handleChange} type={setting.type} value={setting.value} /></GridArea>
                <GridArea><Button type="button" text='Reset to default' onClick={(e) => {
                  e.preventDefault();
                  resetSetting(setting.name);
                }} /></GridArea>
              </>;
            })}
          </GridTemplate>
        </Card>
      </form>
    </Card>
  </>;
};
