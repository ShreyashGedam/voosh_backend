const googleModel = require("../models/google.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "103723961995-sdrd6soh4547qp3ns1paccoq4ebggt05.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await googleModel.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await googleModel.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
