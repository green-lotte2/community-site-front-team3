import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import './styles/style.scss';

function App() {
    return (
        <div className="App">
            <RouterProvider router={root} />
        </div>
    );
}

export default App;
