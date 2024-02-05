import { useEffect } from 'react';
import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionType,
} from '@azure/msal-browser';
import {
  useIsAuthenticated as checkIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from '@azure/msal-react';
import { env } from 'next-runtime-env';
import { KH_CONTENT_ADMIN_GROUP_ID } from '../views/dac/helpers';
import { FAQ_MODERATOR_GROUP_ID } from '../views/moderation/ModerationPage';
import { userIsGroupMember } from './user-is-group-member';

export const EMPLOYEE_GROUP_ID = '0aeadfd7-7f8c-43d7-8ccd-2c688311e69b'; // G IGA Role BP Employee

export type AuthState = {
  isAuthenticated: boolean;
  account?: AccountInfo;
  email?: string;
  isModerator?: boolean;
  isContentAdmin?: boolean;
  isBPEmployee?: boolean;
};
export function useIsAuthenticated(): AuthState {
  const MFA_ENABLED = env('NEXT_PUBLIC_MFA_ENABLED') !== 'false';
  const redirectClaims = JSON.stringify({
    id_token: { amr: { essential: true, values: ['mfa'] } },
    access_token: { amr: { essential: true, values: ['mfa'] } },
  });
  const isAuthenticated = checkIsAuthenticated();
  const loginRequest = {
    redirectUri: '/',
    claims: MFA_ENABLED ? redirectClaims : undefined,
  };

  /**
   * TODO: Change default login to InteractionType.Silent and the
   * backup to InteractionType.Redirect. This makes login silent the majority
   * of the time which is far more seamless. To enable this, E2E login and dump
   * session storage must be updated.
   */
  const { login, error } = useMsalAuthentication(
    InteractionType.Redirect,
    loginRequest
  );

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      login(InteractionType.Popup);
    }
  }, [error]);

  const { accounts } = useMsal();
  const account = isAuthenticated ? accounts?.[0] : undefined;

  return {
    isAuthenticated,
    account,
    email: account?.username,
    isModerator: userIsGroupMember({
      account,
      groupId: FAQ_MODERATOR_GROUP_ID,
    }),
    isContentAdmin: userIsGroupMember({
      account,
      groupId: KH_CONTENT_ADMIN_GROUP_ID,
    }),
    isBPEmployee: userIsGroupMember({
      account,
      groupId: EMPLOYEE_GROUP_ID,
    }),
  };
}
