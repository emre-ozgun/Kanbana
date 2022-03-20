import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import BoardsPage from './pages/BoardsPage';
import EditCardModalPage from './pages/EditCardModalPage';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import SingleBoardPage from './pages/SingleBoardPage';
import './App.css';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/boards' element={<BoardsPage />} />
				<Route path='/board/:boardId' element={<SingleBoardPage />} />
				<Route path='/card/:cardId' element={<EditCardModalPage />} />
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
