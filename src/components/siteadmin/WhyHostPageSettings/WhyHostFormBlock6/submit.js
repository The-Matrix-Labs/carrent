import fetch from '../../../../core/fetch';
import {toastr} from 'react-redux-toastr';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $peaceTitleHeading: String,
    $peaceTitle1: String,
    $peaceTitle2: String,
    $peaceTitle3: String,
    $peaceContent1: String,
    $peaceContent2: String,
    $peaceContent3: String
) {
  updateWhyHostPage (
    peaceTitleHeading: $peaceTitleHeading,
    peaceTitle1: $peaceTitle1,
    peaceTitle2: $peaceTitle2,
    peaceTitle3: $peaceTitle3,
    peaceContent1: $peaceContent1,
    peaceContent2: $peaceContent2,
    peaceContent3: $peaceContent3
  ) {
      status
  }
}

  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.updateWhyHostPage.status === "success") {
    toastr.success("Success", "Updated why become host settings");
  } else {
    toastr.error("Oops!", "Updating Why Become Owner Settings failed");
  }

}

export default submit;
