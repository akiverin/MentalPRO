import "./App.css";
import TheHeader from "./components/TheHeader/TheHeader";
import Input from "./components/ui/Input/Input";
import "./styles/main.scss";

function App() {
  return (
    <>
      <TheHeader />
      <Input placeholder="Email" fullWidth />
    </>
  );
}

export default App;
