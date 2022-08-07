import { getCookie } from 'cookies-next';
import Link from 'next/link';

const AuthDebug = ({uid, user}) => {
  console.log('props:', JSON.parse(user))
  return <>Hello: {uid}.
    <ul>
      <li><Link href="/api/steam-auth/login">Login</Link></li>
      <li><Link href="/api/steam-auth/logout">Logout</Link></li>
    </ul>
  </>;
}

AuthDebug.getInitialProps = async (ctx) => {
  return {
    uid: ctx.req.cookies?.uid,
    user: ctx.req.cookies?.steam_user || ''
  }
}

export default AuthDebug