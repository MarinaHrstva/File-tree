import reducer, {
  initialState,
  setCredentials,
  resetCredentials,
} from "./credentialsSlice";

const CREDENTIALS_MOCK = {
  secretKey: "secretKeyTest",
  accessKeyId: "accessKeyIdTest",
  bucketName: "bucketNameTest",
};

describe("credentials reducer", () => {
  const initialCredentialsState = initialState;

  it("tests setCredentials", () => {
    const newCredentials = reducer(
      initialCredentialsState,
      setCredentials(CREDENTIALS_MOCK)
    );

    expect(newCredentials.accessKeyId).toEqual(CREDENTIALS_MOCK.accessKeyId);
    expect(newCredentials.secretKey).toEqual(CREDENTIALS_MOCK.secretKey);
    expect(newCredentials.bucketName).toEqual(CREDENTIALS_MOCK.bucketName);
    expect(newCredentials.region).toEqual(process.env.REACT_APP_AWS_REGION);
    expect(newCredentials.isLoggedIn).toBe(true);
  });

  it("tests resetCredentials", () => {
    const newCredentials = reducer(
      initialCredentialsState,
      setCredentials(CREDENTIALS_MOCK)
    );

    const resetState = reducer(newCredentials, resetCredentials());
    expect(resetState).toEqual(initialCredentialsState);
  });
});
