import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Homepage from './pages/Homepage/Homepage';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import Profilepage from './pages/Profilepage/Profilepage';
import "./configs/firebase.js"





function App() {

  const routes = createBrowserRouter([{
    path: "/", element: <Navbar/>, children: [
      { index: true, element: <Homepage/> },
      { path: 'profile', element: <Profilepage /> }
    ]
  }])
  

  return (
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  )

}

export default App;
