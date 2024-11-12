import FindFriend from "./Components/FindFriend/FindFriend";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import AuthPage from "./Components/AuthPage/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Settings from "./Components/Settings/Settings";
import ErrorPage from "./Components/ErrorPage";
import AccountSettings from "./Components/Settings/SubSettings/AccountSettings";
import AddressSettings from "./Components/Settings/SubSettings/AddressSettings"
import PasswordSettings from "./Components/Settings/SubSettings/PasswordSettings";
import Chats from "./Components/Chats/Chats";


function App() {

  const routes = createBrowserRouter([{
    path: "/", element: <Homepage/>, children: [
      { index: true, element:  <Main />},
      { path: '/auth', element: <AuthPage /> },
      { path: '/find-friend', element: <FindFriend /> },
      { path: '/profile/:id', element: <Profile />},
      { path: '/chatlist',  element: <Chats />},
      { path: "/settings", element: <Settings />},
      { path: "/settings/account", element: <AccountSettings />},
      { path: "/settings/address", element: <AddressSettings />},
      { path: "/settings/password", element: <PasswordSettings />},
      { path: "*", element: <ErrorPage />}

    ]
  }])
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes}/>  
      </Provider>

    </>
  );
}

export default App;
