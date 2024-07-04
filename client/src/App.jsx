import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Roots';
import HomePage from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <Login />}
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
