import {URLs} from '@static';
import Link from 'next/link';
import {memo} from 'react';

export const SideNav = memo(() => {
  return <>
    <h1>An untitled game</h1>
    <ul>
      <li><Link href={URLs.mainMenu}>Main Menu</Link></li>
      <li><Link href={URLs.settings}>Settings</Link></li>
    </ul>
  </>;
});
