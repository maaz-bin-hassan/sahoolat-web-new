// const BASE_URL_SMART_SERVICE = "http://localhost:5005"

const BASE_URL_SMART_SERVICE = process.env.BASE_URL_SMART_SERVICE;

export const ThirdPartyAPIs = {
  CREATE_SESSION: `${BASE_URL_SMART_SERVICE}/api/sessions/create`,
  SIGNUP_SELLER_CHAT: `${BASE_URL_SMART_SERVICE}/signUpSellerChat`,
  SIGNUP_BUYER_CHAT:  `${BASE_URL_SMART_SERVICE}/signUpBuyerChat`
}



export const NextAPIs = {
  AUTOMATE_TESTING_CLIENT: `/api/automate-test`,
  BUYER_AUTOMATE_TESTING:`/api/buyer-automate-test`,

  // content update api
  PRIVACY_POLICY_API: "/api/privacy-policy",
  USER_GUIDELINES_API: "/api/user-guidelines",
  TERMS_CONDITION_LANDING_API: "/api/terms-condition-landing",
  TERMS_CONDITION_API: "/api/terms-conditions",

}
