import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Roots';
import HomePage from './pages/Home';
import Login from './pages/Login';
import NewAccount from './pages/NewAccount';
import Post from './pages/Post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: "post", element: <Post />},
      {path: "login", element: <Login />},
      {path: "login/signUp", element: <NewAccount />}
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
