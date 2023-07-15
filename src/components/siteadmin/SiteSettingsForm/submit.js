// Redux Form
import { SubmissionError, initialize } from 'redux-form';

// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import { toastr } from 'react-redux-toastr';
import { setSiteSettings } from '../../../actions/siteSettings';

async function submit(values, dispatch) {

  values.appAvailableStatus= Number(values.appAvailableStatus);
  const query = `
  query (
    $siteName: String,
    $siteTitle: String,
    $metaDescription: String,
    $metaKeyword: String,
    $logo: String,
    $facebookLink: String,
    $twitterLink: String,
    $instagramLink: String
    $logoHeight: Int,
    $logoWidth: Int,
    $homePageType: Int,
    $videoLink: String,
    $phoneNumberStatus: Int,
    $homePageLogoHeight: Int,
    $homePageLogoWidth: Int,
    $appAvailableStatus: Boolean,
    $playStoreUrl: String,
    $appStoreUrl: String,
    $email: String,
    $phoneNumber: String,
    $address: String,
    $stripePublishableKey: String
  ) {
    updateSiteSettings (
      siteName: $siteName,
      siteTitle: $siteTitle,
      metaDescription: $metaDescription,
      metaKeyword: $metaKeyword,
      logo: $logo,
      facebookLink: $facebookLink,
      twitterLink: $twitterLink,
      instagramLink: $instagramLink,
      logoHeight: $logoHeight,
      logoWidth: $logoWidth,
      homePageType: $homePageType,
      videoLink: $videoLink,
      phoneNumberStatus: $phoneNumberStatus,
      homePageLogoHeight: $homePageLogoHeight,
      homePageLogoWidth: $homePageLogoWidth,
      appAvailableStatus: $appAvailableStatus,
      playStoreUrl: $playStoreUrl,
      appStoreUrl: $appStoreUrl,
      email: $email,
      phoneNumber: $phoneNumber,
      address: $address,
      stripePublishableKey: $stripePublishableKey
    ) {
        status
    }
  }
  `;
  
  let logoHeight = values.logoHeight != '' ? values.logoHeight : 0;
  let logoWidth = values.logoWidth != '' ? values.logoWidth : 0;
  let homePageLogoHeight = values.homePageLogoHeight != '' ? values.homePageLogoHeight : 0;
  let homePageLogoWidth = values.homePageLogoWidth != '' ? values.homePageLogoWidth : 0;
  let variables = Object.assign({}, values, { logoHeight, logoWidth, homePageLogoHeight, homePageLogoWidth });

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();
  // console.log(data);
  if (data.updateSiteSettings.status === "success") {
    toastr.success("Update Settings", "Changes are updated!");
    dispatch(setSiteSettings());
    
  } else {
    toastr.error("Update Settings", "Updating Site Settings failed");
  }

}

export default submit;
