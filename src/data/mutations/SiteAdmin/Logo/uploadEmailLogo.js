import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../models';

import {
  GraphQLString as StringType
} from 'graphql';

const uploadEmailLogo = {

  type: SiteSettingsType,

  args: {
    fileName: { type: StringType },
    filePath: { type: StringType },
  },

  async resolve({ request }, { fileName, filePath }) {

    if (request.user && request.user.admin == true) {
      await SiteSettings.destroy({
        where: {
          title: 'Email Logo'
        }
      });

      let createLogoRecord = await SiteSettings.create({
        title: 'Email Logo',
        name: 'emailLogo',
        value: fileName,
        type: 'site_settings'
      });

      if (createLogoRecord) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: 'not logged in'
      }
    }

  },
};

export default uploadEmailLogo;
