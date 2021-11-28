export default function () {
    return {
      status: "authenticating", //authenticated, non-authenticated, administrator, super-admin
      user: null,
      token: null,
    };
  }