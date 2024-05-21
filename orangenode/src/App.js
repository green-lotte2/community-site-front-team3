import logo from './logo.svg';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import './styles/main/main.css';
import './styles/admin/admin.css';

function App() {
    return (
        <div className="App">
            return <RouterProvider router={root} />;
        </div>
    );
}

export default App;
