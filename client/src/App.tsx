import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import {BoardPage} from './pages/board/BoardPage';
import {ListPage} from './pages/list/ListPage';
import { boardLoader } from './pages/board/boardLoader';	
import { listLoader } from './pages/list/listLoader';
import Header from './components/Header';

import './App.css'


const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				element: <BoardPage />,
				loader: boardLoader	
			}
		]
	},
	{
		path: '/squares',
		element: <Root />,
		children: [
			{
				index: true,
				element: <ListPage />,
				loader: listLoader
			}
		]
	}
])

function App() {
 
  return (
  <>
  <RouterProvider router={router} />
  </>
  )
}

export default App
