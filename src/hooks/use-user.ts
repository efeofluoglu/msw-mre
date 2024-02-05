import { useContext, useEffect, useState } from 'react';
import { useGetUserByEmail } from './use-get-user-by-email';
import { AuthContext } from '../pages/_app.page';

export type UserData = {
  jobTitle: string;
  photo: string;
  givenName: string;
  surname: string;
  email: string;
  userId: string;
};

type GetUserByEmailData = {
  getUserByEmail: {
    jobTitle: string;
    photo: string;
    givenName: string;
    surname: string;
    email: string;
    userId: string;
  };
};

export function useUser() {
  const { isAuthenticated, isModerator, isContentAdmin, email } =
    useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<
    UserData & {
      isModerator?: boolean;
      isContentAdmin?: boolean;
    }
  >();

  const { data: getUserByEmailData }: { data?: GetUserByEmailData } =
    useGetUserByEmail(email);

  useEffect(() => {
    if (isAuthenticated && getUserByEmailData) {
      setUserProfile({
        ...getUserByEmailData?.getUserByEmail,
        isModerator,
        isContentAdmin,
      });
    }
  }, [isAuthenticated, getUserByEmailData]);

  return userProfile;
}
