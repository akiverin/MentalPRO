import "./App.css";
import TheHeader from "./components/TheHeader/TheHeader";
import Button from "./components/ui/Button/Button";
import { Form } from "./components/ui/Form/Form";
import Input from "./components/ui/Input/Input";
import "./styles/main.scss";

function App() {
  return (
    <>
      <TheHeader />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="visually-hidden">Введите email</p>
        <Input
          id="inputEmail"
          name="inputEmail"
          placeholder="Email"
          fullWidth
        />
        <Button
          size="large"
          fullWidth
          onClick={(e) => console.log(e)}
          type="submit"
        >
          Отправить
        </Button>
      </Form>
    </>
  );
}

export default App;
