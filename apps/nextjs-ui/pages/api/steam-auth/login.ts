import SteamAuth from "node-steam-openid";

const steam = new SteamAuth({
  realm: process.env['DOMAIN'],
  returnUrl: process.env['DOMAIN'] +  "/api/steam-auth/return",
  apiKey: process.env['STEAM_API_KEY']
});



export default async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  return res.redirect(redirectUrl);
}
