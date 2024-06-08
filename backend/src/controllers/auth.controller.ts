import { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { saveUserDetails } from '../services/auth.service';

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
  tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  clientID: process.env.OUTLOOK_CLIENT_ID!,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET!,
  callbackURL: process.env.CALLBACK_URL!
}, async (accessToken: string, _refreshToken: string, profile: Object, done: Function) => {
  const user = await saveUserDetails(accessToken, profile);
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

const outlookLogin = passport.authenticate('oauth2');

const outlookCallback = (req: Request, res: Response) => {
  passport.authenticate('oauth2', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  })(req, res);
};

export default { outlookLogin, outlookCallback };
