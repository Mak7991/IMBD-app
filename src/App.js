import "./App.css";
import AppRouting from "./router/router";
import AppProvider from "./Context";

function App() {
  return (
    <AppProvider>
      <div>
        <AppRouting />
      </div>
    </AppProvider >
  );
}

export default App;
