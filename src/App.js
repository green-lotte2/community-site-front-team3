import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import "./styles/style.scss";
import "./styles/admin.scss";
import "./styles/board.scss";
import "./styles/chat.scss";
import "./styles/newpage.scss";
import "./styles/project.scss";
import "./styles/member.scss";

function App() {
  return (
    <div className="App">
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
