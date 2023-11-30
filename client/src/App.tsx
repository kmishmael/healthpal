import Header from "./components/header"
import Footer from "./components/footer"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {

  return (
    <>
       <Header />
      <div className="min-h-[100vh]">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </>
  )
}

export default App
