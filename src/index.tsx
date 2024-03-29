import { ConfigProvider, theme } from 'antd'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import { Auth } from './features/auth/auth'
import './index.css'
import { AddConsumer } from './pages/add-consumer'
import { Consumer } from './pages/consumer'
import { Consumers } from './pages/consumers'
import { EditConsumer } from './pages/edit-consumer'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Status } from './pages/status'
import { Paths } from './paths'
import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Consumers />,
	},
	{
		path: Paths.login,
		element: <Login />,
	},
	{
		path: Paths.register,
		element: <Register />,
	},
	{
		path: Paths.addConsumer,
		element: <AddConsumer />,
	},
	{
		path: `${Paths.status}/:status`,
		element: <Status />,
	},
	{
		path: `${Paths.consumer}/:id`,
		element: <Consumer />,
	},
	{
		path: `${Paths.editConsumer}/:id`,
		element: <EditConsumer />,
	},
])

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					algorithm: theme.darkAlgorithm,
				}}
			>
				<Auth>
					<RouterProvider router={router} />
				</Auth>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
)

reportWebVitals()
