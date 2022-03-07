import { createContext, useContext, useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { signIn } from "../utility/Authenty";
import Consts from "../utility/Consts";
import { onUserUpdateByUser } from "../graphql-custom/user/subscription";
import { getReturnData } from "../utility/Util";
import API from "@aws-amplify/api";
import useLocalStorage from "../hooks/useLocalStorage";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getUser } from "../graphql-custom/user/queries";
import { useRouter } from "next/router";
import { listGroupsByUser } from "../graphql-custom/GroupUsers/queries";

const UserContext = createContext();

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
}

function UserProvider(props) {
  const { lsGet, lsSet, lsRemove } = useLocalStorage("session");
  const [cognitoUser, setCognitoUser] = useState(
    lsGet(Consts.SS_CognitoUserKey)
  );
  const [isLogged, setIsLogged] = useState(cognitoUser);
  const [user, setUser] = useState(lsGet(Consts.SS_UserKey));
  const [updatedUser, setUpdatedUser] = useState();
  const subscriptions = {};
  const router = useRouter();

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          isLoginValid();
          break;
        default:
          break;
      }
    });
    return () => {
      setUser(null);
    };
    // eslint-disable-next-line
  }, []);

  const subscrip = () => {
    subscriptions.onUserUpdateByUser = API.graphql({
      query: onUserUpdateByUser,
      variables: {
        id: user.id,
      },
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setUpdatedUser(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (user) {
      lsSet(Consts.SS_UserKey, user);
    } else {
      lsRemove(Consts.SS_UserKey);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (cognitoUser) {
      lsSet(Consts.SS_CognitoUserKey, user);
    } else {
      lsRemove(Consts.SS_CognitoUserKey);
    }
    // eslint-disable-next-line
  }, [cognitoUser]);

  // useEffect(() => {
  //   if (cognitoUser) {
  //     if (!lsGet(Consts.addPostKey)) {
  //       lsSet(Consts.addPostKey, { addPost: true, addPostGuide: true });
  //     }
  //   } else {
  //     lsRemove(Consts.addPostKey);
  //   }
  //   // eslint-disable-next-line
  // }, [cognitoUser]);

  useEffect(() => {
    if (cognitoUser && user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    // eslint-disable-next-line
  }, [cognitoUser, user]);

  useEffect(() => {
    if (updatedUser) {
      setUser(updatedUser);
    }
    // eslint-disable-next-line
  }, [updatedUser]);

  useEffect(() => {
    if (isLogged) {
      subscrip();
    }

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };

    // eslint-disable-next-line
  }, [isLogged]);

  useEffect(() => {
    isLoginValid();
    // eslint-disable-next-line
  }, []);

  const isLoginValid = async () => {
    try {
      const usr = await Auth.currentAuthenticatedUser();
      if (usr) {
        if (!Object.is(usr, cognitoUser)) {
          setCognitoUser(usr);
        }

        let resp = await API.graphql(
          graphqlOperation(getUser, { id: usr.attributes.sub })
        );

        resp = getReturnData(resp);
        let userGroups = await API.graphql(
          graphqlOperation(listGroupsByUser, {
            user_id: usr.attributes.sub,
            limit: 3,
          })
        );
        userGroups = getReturnData(userGroups);
        if (!resp) {
          router.push(
            {
              query: {
                ...router.query,
                prevPath: router.asPath,
                signInUp: "information",
                isModal: true,
              },
            },
            "/signInUp/information",
            { shallow: true, scroll: false }
          );
        } else {
          setUser({ ...resp, groups: userGroups });

          if (resp.category && resp.category.items.length <= 0) {
            router.push(
              {
                query: {
                  ...router.query,
                  prevPath: router.asPath,
                  signInUp: "intrst",
                  isModal: true,
                },
              },
              "/signInUp/intrst",
              { shallow: true, scroll: false }
            );
            setUser({ ...resp, groups: userGroups });
            return false;
          }
        }
      } else {
        setIsLogged(false);
        setUser(null);
        setCognitoUser(null);
      }
    } catch (ex) {
      console.log(ex);
      setIsLogged(false);
      setUser(null);
      setCognitoUser(null);
    }
  };

  const logout = async () => {
    setIsLogged(false);
    setUser(null);
    setCognitoUser(null);
    await Auth.signOut();
    router.replace("/");
  };

  // const value = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider
      value={{ user, cognitoUser, isLogged, setUser, logout, isLoginValid }}
      {...props}
    />
  );
}

export { UserProvider, useUser };
