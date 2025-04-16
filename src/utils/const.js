const BASE_URL_SMART_SERVICE = "http://localhost:5005"

export const ThirdPartyAPIs = {
  CREATE_SESSION: `${BASE_URL_SMART_SERVICE}/api/sessions/create`,
  SIGNUP_SELLER_CHAT: `${BASE_URL_SMART_SERVICE}/signUpSellerChat`,
  SIGNUP_BUYER_CHAT:  `${BASE_URL_SMART_SERVICE}/signUpBuyerChat`
}

export const NextAPIs = {
  AUTOMATE_TESTING_CLIENT: `/api/automate-test`,
  BUYER_AUTOMATE_TESTING:`/api/buyer-automate-test`,
}