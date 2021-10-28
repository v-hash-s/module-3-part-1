interface SignUpErrorMessage {
  errorMessage: string;
}

interface SignUpMessage {
  message: string;
}

interface SignUpResponse {
  statusCode: number;
  message: SignUpErrorMessage | SignUpMessage;
}

export { SignUpResponse, SignUpMessage, SignUpErrorMessage };
