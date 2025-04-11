import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./scss/styles.scss";
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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "/find-friend",
        element: <FindFriendLazy component={<FindFriend />} />,
      },
      {
        path: "/profile/:id",
        element: <ProfileLazy component={<Profile />} />,
      },
      { path: "/chatlist", element: <ChatLazy component={<Chat />} /> },

      { path: "/settings", element: <SettingLazy component={<Settings />} /> },
      {
        path: "/settings/account",
        element: <SettingLazy component={<AccountSettings />} />,
      },
      {
        path: "/settings/address",
        element: <SettingLazy component={<AddressSettings />} />,
      },
      {
        path: "/settings/password",
        element: <SettingLazy component={<PasswordSettings />} />,
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
