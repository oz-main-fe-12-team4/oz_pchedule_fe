import { Button } from "./assets/components/Button";

function App() {
  return (
    <>
      <Button
        onCancelClick={() => console.log("취소 클릭")}
        onConfirmClick={() => console.log("저장 클릭")}
      />
    </>
  );
}

export default App;
