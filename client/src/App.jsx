import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root';
import BoardPage from './pages/board/boardPage';
import { boardLoader } from './pages/board/boardLoader';	

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
	}
])

function App() {
 
  return <RouterProvider router={router} />
  
}

export default App
