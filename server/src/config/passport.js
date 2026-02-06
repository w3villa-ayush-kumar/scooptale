import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../modules/users/user.model.js";
import { env } from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.googleClientId,
      clientSecret: env.googleClientSecret,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(
            new Error("Google account does not provide an email."),
            null,
          );
        }

        const avatar = profile.photos?.[0]?.value;

        let user = await User.findOne({ email });

        if (user) {
          if (!user.providers?.google?.id) {
            user.providers.google = { id: profile.id };

            if (!user.profileImageUrl && avatar) {
              user.profileImageUrl = avatar;
            }

            await user.save();
          }

          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName,
          email,
          providers: {
            google: { id: profile.id },
          },
          isEmailVerified: true,
          profileImageUrl: avatar,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails", "photos"],
      enableProof: true,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(
            new Error(
              "Facebook account does not provide an email. Please use Google or email signup.",
            ),
            null,
          );
        }

        const avatar =
          profile.photos?.[0]?.value ||
          `https://graph.facebook.com/${profile.id}/picture?type=large`;

        let user = await User.findOne({ email });

        if (user) {
          if (!user.providers?.facebook?.id) {
            user.providers.facebook = { id: profile.id };

            if (!user.profileImageUrl && avatar) {
              user.profileImageUrl = avatar;
            }

            await user.save();
          }

          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName,
          email,
          providers: {
            facebook: { id: profile.id },
          },
          isEmailVerified: true,
          profileImageUrl: avatar,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
