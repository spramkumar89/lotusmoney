const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

let apiInstance = new SibApiV3Sdk.ContactsApi();

export function createContact(user) {
  let createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = user.email;
  createContact.listIds = [5];
  apiInstance.createContact(createContact).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
}
