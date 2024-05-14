import SteamAuth from "node-steam-openid";
import { setCookie } from 'cookies-next';

const steam = new SteamAuth({
  realm: process.env['DOMAIN'],
  returnUrl: process.env['DOMAIN'] +  "/api/steam-auth/return",
  apiKey: process.env['STEAM_API_KEY']
});


export default async (req, res) => {
  const user = await steam.authenticate(req);

  const gameUserId = user.steamid

  setCookie('uid', gameUserId, { req, res });
  setCookie('steam_user', JSON.stringify(user), { req, res });

  return res.redirect('/');
}
