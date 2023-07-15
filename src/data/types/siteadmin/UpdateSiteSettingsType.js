import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const UpdateSiteSettingsType = new ObjectType({
  name: 'UpdateSiteSettings',
  fields: {
    siteName: { type: new NonNull(StringType) },
    siteTitle: { type: new NonNull(StringType) },
    metaDescription: { type: StringType },
    metaKeyword: { type: StringType },
    logo: { type: new NonNull(StringType) },
    facebookAPI: { type: StringType },
    facebookAPISecret: { type: StringType },
    googleAPI: { type: StringType },
    googleAPISecret: { type: StringType },
    googleMapAPI: { type: new NonNull(StringType) },
    googleMapServerAPI: { type: new NonNull(StringType) },
    googleAnalytics: { type: StringType },
    facebookLink: { type: StringType },
    twitterLink: { type: StringType },
    instagramLink: { type: StringType },
    status: { type: StringType },
    phoneNumberStatus: { type: IntType },
    homePageLogoHeight: { type: IntType },
    homePageLogoWidth: { type: IntType },
    appAvailableStatus: { type: BooleanType },
    playStoreUrl: { type: StringType },
    appStoreUrl: { type: StringType },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    address: { type: StringType }
  },
});

export default UpdateSiteSettingsType;
