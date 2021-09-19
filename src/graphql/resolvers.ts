import { Substance, Contact, MusicOption } from '../database/models';
import axios from 'axios';

const resolvers = {
  Query: {
    substances: async () => {
      return Substance.find();
    },
    contacts: async () => {
      return Contact.find();
    },
    spotifyToken: (_, { userCode }: { userCode: string }, __) => {
      const myClientId = '65e60069d81c42cc8200ac163cbac690';
      const mySecret = 'cc7a5192799e4b3daab4702fac6eb139';
      const returnUrl = 'http://localhost:8100/settings/music/callback';
      return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
          grant_type: 'authorization_code',
          code: userCode,
          redirect_uri: returnUrl,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: myClientId,
          password: mySecret,
        },
      })
        .then((response) => {
          console.log('Authentication Response', response);
          const secondsToLive = response.data.expires_in || 0;
          return {
            token: response.data.access_token,
            type: response.data.token_type,
            expiresAt: new Date(new Date().getTime() + secondsToLive * 1000).toISOString(),
            scope: response.data.scope,
            refreshToken: response.data.refresh_token,
          };
        })
        .catch((e) => {
          console.error('Authentication Error', e);
          throw e;
        });
    },
    refreshSpotifyToken: (_, { refreshToken }: { refreshToken: string }, __) => {
      const myClientId = '65e60069d81c42cc8200ac163cbac690';
      const mySecret = 'cc7a5192799e4b3daab4702fac6eb139';
      return axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: myClientId,
          password: mySecret,
        },
      })
        .then((response) => {
          console.log('Authentication Response', response);
          const secondsToLive = response.data.expires_in || 0;
          return {
            token: response.data.access_token,
            type: response.data.token_type,
            expiresAt: new Date(new Date().getTime() + secondsToLive * 1000).toISOString(),
            scope: response.data.scope,
            refreshToken: response.data.refresh_token,
          };
        })
        .catch((e) => {
          console.error('Authentication Error', e);
          throw e;
        });
    },
    musicOptions: async () => {
      console.log('You asked for music options?');
      return MusicOption.findOne();
    },
  },
  Mutation: {
    //Contacts
    createContact: async (_, { contact }, __) => {
      console.log('creating contact', contact);
      const newContact = new Contact(contact);
      if (contact.active) {
        await Contact.updateMany(
          {},
          {
            $set: {
              active: false,
            },
          }
        );
      }
      return newContact.save();
    },
    updateContact: async (_, { contact }, __) => {
      if (contact.active) {
        await Contact.updateMany(
          {},
          {
            $set: {
              active: false,
            },
          }
        );
      }
      return Contact.findOneAndUpdate(
        { _id: contact.id },
        { $set: contact },
        {
          new: true,
        }
      );
    },
    deleteContact: async (_, { contact }, __) => {
      console.log('deleting contact', contact);
      if (contact.active) {
        console.log('updating new active', true);
        await Contact.findOneAndUpdate(
          { _id: { $ne: contact.id } },
          {
            $set: {
              active: true,
            },
          }
        );
      }
      await Contact.deleteOne({
        _id: contact.id,
      });
      return {
        success: true,
        error: null,
      };
    },

    //Music Options
    musicOptions: async (_, { musicOptions }, __) => {
      return MusicOption.findOneAndUpdate(
        { _id: musicOptions.id },
        { $set: musicOptions },
        {
          new: true,
          upsert: true,
        }
      );
    },
  },
};

export { resolvers };
