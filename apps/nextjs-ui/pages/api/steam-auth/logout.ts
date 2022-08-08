import { setCookie } from "cookies-next";
import SteamAuth from "node-steam-openid";

const steam = new SteamAuth({
  realm: process.env['DOMAIN'],
  returnUrl: process.env['DOMAIN'] +  "/api/steam-auth/return",
  apiKey: process.env['STEAM_API_KEY']
});



export default async (req, res) => {
  setCookie('uid', '', { req, res });
  setCookie('steam_user', '', { req, res });

  return res.redirect('/');
}
