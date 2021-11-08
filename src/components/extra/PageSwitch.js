import { Route, Switch, useLocation } from "react-router-dom";
import { UserProvider } from "../../context/userContext";
import QueryModals from "../../pages/QueryModals";
import Routes from "../../routes";
import WithAuth from "../auth/WithAuth";
import NavBar from "../navigation/NavBar";
import PrivateRoute from "./PrivateRoute";
import UnAuthRoute from "./UnAuthRoute";

const PageSwitch = (props) => {
  let location = useLocation();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background;

  return (
    <UserProvider>
      <WithAuth />
      <NavBar />
      <Switch location={background || location}>
        {Routes.map((route, index) => {
          if (route.auth) {
            return (
              <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page}
                isAuth={props.isAuth}
              />
            );
          } else if (route.unAuth) {
            return (
              <UnAuthRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page}
                isAuth={props.isAuth}
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page}
              />
            );
          }
        })}
      </Switch>
      {Routes.map((route, index) => {
        if (route.background) {
          if (route.auth) {
            return (
              background && (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.page}
                  isAuth={props.isAuth}
                />
              )
            );
          } else if (route.unAuth) {
            return (
              <UnAuthRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page}
                isAuth={props.isAuth}
              />
            );
          } else {
            return (
              background && (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.page}
                />
              )
            );
          }
        } else {
          return null;
        }
      })}
      <Route path="/" component={null} />
      <QueryModals />
    </UserProvider>
  );
};

export default PageSwitch;
