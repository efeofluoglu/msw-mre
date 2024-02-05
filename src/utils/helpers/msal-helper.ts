/* istanbul ignore file */

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PublicClientApplication,
  RedirectRequest,
  SilentRequest,
} from '@azure/msal-browser';
import { msalConfig } from '../../auth/msal-config';
import { env } from 'next-runtime-env';

const msalInstance = new PublicClientApplication(msalConfig);

export async function requestAccessToken(
  scopes?: string[],
  forceRefreshToken = false
) {
  const account = msalInstance.getAllAccounts()[0];

  if ((msalInstance && account && scopes) || forceRefreshToken) {
    /* Setting forceRefreshToken = true will force a token fetch 
    that will result in a login if it fails. */
    const request = {
      scopes: scopes,
      account: account,
    } as SilentRequest;
    // Silently acquires an access token
    // return
    try {
      const res = await msalInstance.acquireTokenSilent(request);
      return res.accessToken;
    } catch (error: any) {
      console.log('Error fetching access token');
      console.error(error);
      return handleLogin(msalInstance);
    }
  }
}

/**
 * Authenticates the user via MSAL using redirects.
 * @param instance MSAL public client instance.
 * @param prompt If specified as `login`, will force interactive re-authentication with MFA.
 */
export function handleLogin(
  instance: PublicClientApplication,
  prompt?: string
) {
  const inPreviewMode = window.location !== window.parent.location;
  const MFA_ENABLED = env('NEXT_PUBLIC_MFA_ENABLED') !== 'false';
  const redirectClaims = JSON.stringify({
    id_token: { amr: { essential: true, values: ['mfa'] } },
    access_token: { amr: { essential: true, values: ['mfa'] } },
  });
  if (!inPreviewMode) {
    const sessionUrl = window.location.origin;
    instance
      .loginRedirect({
        redirectUri: sessionUrl,
        claims: MFA_ENABLED ? redirectClaims : undefined,
        prompt,
      } as RedirectRequest)
      .catch((e: unknown) => {
        console.log('Could not log in using loginRedirect. Trying popup...');
        console.error(e);
        // TODO: Implement improved fallback login method
        // instance.loginPopup().catch((e) => {
        //   console.error(e);
        // });
      });
  }
}

export { msalInstance };
