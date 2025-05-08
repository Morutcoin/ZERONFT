import { createThirdwebClient } from "thirdweb";
const api = "15adf8e9820f3d79ca3602f05f0425d5"
const clientId = api;

if (!clientId) {
  throw new Error("Missing NEXT_PUBLIC_CLIENT_ID environment variable");
}

export const client = createThirdwebClient({
  clientId,
});
