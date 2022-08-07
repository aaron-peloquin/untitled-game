import {Corner} from '@components-layout';
import {getCookie, hasCookie} from 'cookies-next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {useMemo} from 'react';

const SteamHeaderWithCookies = () => {
  const user = useMemo(() => {
    if (hasCookie('steam_user')) {
      const userString = getCookie('steam_user') as string;
      if (userString.length) {
        return JSON.parse(userString);
      }
    }
    return {};
  }, []);

  return <Corner location="top-right">
    {user?.username ?
    <><Image src={user.avatar.small} height={32} width={32} /> {user.username} <Link href="/api/steam-auth/logout">Logout</Link></> :
    <Link href="/api/steam-auth/login"><Image src="/img/steam.png" height={43} width={114} /></Link>}
  </Corner>;
};


const SteamHeader = dynamic(() => Promise.resolve(SteamHeaderWithCookies), {ssr: false});
SteamHeader.displayName = 'SteamHeader';

export {SteamHeader};
