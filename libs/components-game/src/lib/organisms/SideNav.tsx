import {Card} from '@components-layout';
import {URLs} from '@static';
import Link from 'next/link';
import {memo} from 'react';

export const SideNav = memo(() => {
  return <Card layer='1' heading="An Game">
    <ul>
      <li><Link href={URLs.mainMenu}>Main Menu</Link></li>
      <li><Link href={URLs.settings}>Settings</Link></li>
    </ul>
  </Card>;
});
