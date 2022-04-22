import passport from 'passport';
import githubStrategy from 'passport-github2';
import goggleStrategy from  'passport-google-oauth20';

const githubStrategyOption = {
  clientID: 'dbf34f19b58c62b6d2d7',
  clientSecret: '4554b6bfd43cd7b177657483060dacb84e1a93a1',
  callbackURL: '/auth/github/callback',
};

const googleStrategyOption = {
  clientID: '900905899464-i1qc9ors00lv8ikijgvts0pqsif77r4f.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback',
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new githubStrategy.Strategy(
    githubStrategyOption,
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.use(
  new goggleStrategy.Strategy(
    googleStrategyOption,
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

export {passport}
