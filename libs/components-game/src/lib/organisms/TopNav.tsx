import {Card, GridArea, GridTemplate} from '@components-layout';
import {URLs} from '@static';
import Link from 'next/link';
import {memo} from 'react';

export const TopNav = memo(() => {
  return <Card layer='1' heading="An Untitled Game">
    <GridTemplate columns={2}>
      <GridArea><Link href={URLs.mainMenu}>Main Menu</Link></GridArea>
      <GridArea><Link href={URLs.settings}>Settings</Link></GridArea>
    </GridTemplate>
  </Card>;
});
