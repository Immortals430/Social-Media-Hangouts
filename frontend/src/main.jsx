import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import { store } from "./redux/store.js";
import FindFriendLazy from "./Components/FindFriend/FindFriendLazy.jsx";
import ProfileLazy from "./Components/Profile/ProfileLazy.jsx";
import ChatLazy from "./Components/Chats/ChatLazy.jsx";
import SettingLazy from "./Components/Settings/SettingLazy.jsx";
import PropagateLoader from "react-spinners/PropagateLoader.js";
import StoreLazy from "./Components/Store/StoreLazy.jsx";
import GroupsLazy from "./Components/Groups/GroupsLazy.jsx";


const AuthPage = lazy(() => import("./Components/AuthPage/AuthPage.jsx"));
const FindFriend = lazy(() => import("./Components/FindFriend/FindFriend.jsx"));
const Profile = lazy(() => import("./Components/Profile/Profile.jsx"));
const Chat = lazy(() => import("./Components/Chats/Chats.jsx"));
const Settings = lazy(() => import("./Components/Settings/Settings.jsx"));
const AccountSettings = lazy(() =>
  import("./Components/Settings/SubSettings/AccountSettings.jsx")
);
const AddressSettings = lazy(() =>
  import("./Components/Settings/SubSettings/AddressSettings.jsx")
);
const PasswordSettings = lazy(() =>
  import("./Components/Settings/SubSettings/PasswordSettings.jsx")
);
const Store = lazy(() => import("./Components/Store/Store.jsx"));
const Groups = lazy(() => import("./Components/Groups/Groups.jsx"))

import "./scss/styles.scss";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "/find-friend",
        element: (
          <Suspense fallback={<FindFriendLazy />}>
            <FindFriend />
          </Suspense>
        ),
      },
      {
        path: "/store",
        element: (
          <Suspense fallback={<StoreLazy />}>
            <Store />
          </Suspense>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <Suspense fallback={<ProfileLazy />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/chatlist",
        element: (
          <Suspense fallback={<ChatLazy />}>
            <Chat />
          </Suspense>
        ),
      },

      {
        path: "/settings",
        element: (
          <Suspense fallback={<SettingLazy />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "/settings/account",
        element: (
          <Suspense fallback={<SettingLazy />}>
            <AccountSettings />
          </Suspense>
        ),
      },
      {
        path: "/settings/address",
        element: (
          <Suspense fallback={<SettingLazy />}>
            <AddressSettings />
          </Suspense>
        ),
      },
      {
        path: "/settings/password",
        element: (
          <Suspense fallback={<SettingLazy />}>
            <PasswordSettings />
          </Suspense>
        ),
      },
      {
        path: "/groups", element: (
          <Suspense fallback={<GroupsLazy />}>
            <Groups />
          </Suspense>
        )
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "auth",
    element: (
      <Suspense
        fallback={
          <div className="propogator">
            <PropagateLoader color="#0055ff" />
          </div>
        }
      >
        <AuthPage />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>

  // </StrictMode>
);
