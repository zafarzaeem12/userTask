import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux'
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';


import RegisterPage from './pages/RegisterPage';
import OTPPage from './pages/OTPPage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreateTaskPage from './pages/CreateTaskPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskPage from './pages/TaskPage';
import UpdateTaskPage from './pages/UpdateTaskPage';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'createtask', element: <CreateTaskPage /> },
        { path: 'gettask', element: <TaskPage /> },
        { path: 'updatetask/:id', element: <UpdateTaskPage /> },
        { path: 'gettask/:id', element: <TaskDetailPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'otp',
      element: <OTPPage />,
    },
    {
      path: 'forgetpassword',
      element: <ForgetPasswordPage />,
    },
    {
      path: 'resetpassword',
      element: <ResetPasswordPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
