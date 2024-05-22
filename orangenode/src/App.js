import { RouterProvider } from 'react-router-dom';
import root from './router/root';

function App() {
    return (
        <div className="App">
            return <RouterProvider router={root} />;
        </div>
    );
}

export default App;
