import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useLocation,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import BoardsPage from './pages/BoardsPage';
import KanbanBoardPage from './pages/KanbanBoardPage';
import EditCardModalPage from './pages/EditCardModalPage';
import NotFound from './pages/NotFound';
import { useAppSelector } from './hooks';
import { selectAuth } from './features/auth/authSlice';
import './App.css';

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
							<KanbanBoardPage />
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
