import {createAuthClient} from "better-auth/svelte";
import { usernameClient } from "better-auth/client/plugins";

export const auth = createAuthClient({
   baseURL: import.meta.env.VITE_API_URL,
   plugins:[usernameClient()]
})