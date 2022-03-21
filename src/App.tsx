import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import BoardsPage from './pages/BoardsPage';
import EditCardModalPage from './pages/EditCardModalPage';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import SingleBoardPage from './pages/SingleBoardPage';
import './App.css';
import { useAppSelector } from './hooks';
import { selectAuth } from './features/auth/authSlice';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/auth' element={<AuthPage />} />

				<Route
					path='/boards'
					element={
						<RequireAuth>
							<BoardsPage />
						</RequireAuth>
					}
				/>
				<Route
					path='/board/:boardId'
					element={
						<RequireAuth>
							<SingleBoardPage />
						</RequireAuth>
					}
				/>

				<Route
					path='/card/:cardId'
					element={
						<RequireAuth>
							<EditCardModalPage />
						</RequireAuth>
					}
				/>

				<Route path='/*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const { user } = useAppSelector(selectAuth);
	let location = useLocation();
	if (!user) {
		return <Navigate to='/auth' state={{ from: location }} replace />;
	}

	return children;
};

export default App;
