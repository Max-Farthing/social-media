import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Roots';
import HomePage from './pages/Home';
import Login from './pages/Login';
import NewAccount from './pages/NewAccount';
import Post from './pages/Post';
import AuthContextProvider from './store/AuthContext';
import ProfilePage from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "post", element: <Post /> },
      { path: "login", element: <Login /> },
      { path: "login/signUp", element: <NewAccount /> },
      { path: "profile/:userName", element: <ProfilePage />}
    ]
  }
])

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
