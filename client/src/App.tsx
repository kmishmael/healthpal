import { Routes } from "./routes";
import AuthProvider from "./provider/auth-provider";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </>
  );
}

export default App;
