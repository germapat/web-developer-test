export enum ErrorCode {
  UserNotFound = 'USER_NOT_FOUND',
  NoOrderBuilderUrl = 'NO_ORDER_BUILDER_URL_CONFIGURATED',
  ErrorGettingAuthorizations = "ERROR_GETTING_AUTHORIZATIONS_FROM_SERVICE",
  ErrorSaveUser = "ERROR_CREATING_USER",
  ExistingUserWithSameEmail = "EXISTING_USER_WITH_SAME_EMAIL",
  ExistingUserWithSameIdentification = "EXISTING_USER_WITH_SAME_IDENTIFICATION"
};