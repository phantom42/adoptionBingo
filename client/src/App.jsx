import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import {BoardPage} from './pages/board/boardPage';
import {ListPage} from './pages/list/listPage';
import { boardLoader } from './pages/board/boardLoader';	
import { listLoader } from './pages/list/listLoader';

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
 
  return <RouterProvider router={router} />
  
}

export default App
