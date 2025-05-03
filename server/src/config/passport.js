import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as VkStrategy } from "passport-vkontakte";
import { Strategy as YandexStrategy } from "passport-yandex";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        return user ? done(null, user) : done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new VkStrategy(
    {
      clientID: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/vk/callback`,
      scope: ["profile"],
      profileFields: ["id", "displayName", "familyName"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ vkId: profile.id });
        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            vkId: profile.id,
            emailConfirmed: true,
          });
        }
        return done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.use(
  new YandexStrategy(
    {
      clientID: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/yandex/callback`,
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ yandexId: profile.id });
        const avatarId = profile._json.default_avatar_id;
        const image = avatarId
          ? `https://avatars.yandex.net/get-yapic/${avatarId}/islands-200`
          : "https://avatars.yandex.net/get-yapic/0/islands-200";
        if (!user) {
          user = await User.create({
            firstName: profile.displayName,
            yandexId: profile.id,
            image,
            email: profile.emails[0].value,
            emailConfirmed: true,
          });
        }
        return done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

export default passport;
