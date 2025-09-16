import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router";
// import logo from "../assets/Logo.svg";

function Signin() {
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [checkPasswordInputValue, setCheckPasswordInputValue] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <form
        name="login"
        className="flex flex-col justify-center items-center gap-5"
      >
        {/* <img src={logo} alt="pchedule logo" className="w-[300px] scale-70" /> */}
        <div className="flex flex-col gap-1 justify-center items-start">
          <h2 className="text-[13px]">이름</h2>
          <Input
            type={"text"}
            placeHolder={"이름을 입력하세요."}
            value={nameInputValue}
            setValue={setNameInputValue}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-start">
          <h2 className="text-[13px]">이메일</h2>
          <Input
            type={"email"}
            placeHolder={"이메일을 입력하세요."}
            value={emailInputValue}
            setValue={setEmailInputValue}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-start">
          <h2 className="text-[13px]">비밀번호</h2>
          <Input
            type={"password"}
            placeHolder={"비밀번호를 입력하세요."}
            value={passwordInputValue}
            setValue={setPasswordInputValue}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-start">
          <h2 className="text-[13px]">비밀번호 확인</h2>
          <Input
            type={"password"}
            placeHolder={"비밀번호를 한번 더 입력하세요."}
            value={checkPasswordInputValue}
            setValue={setCheckPasswordInputValue}
            required={true}
            compareValue={passwordInputValue}
          />
        </div>
        <button className="w-[300px] h-8 m-3 rounded-xl bg-[#D9D9D9] hover:bg-[#5AA5B2]">
          회원가입
        </button>
      </form>
      <p className="w-[300px] text-center p-8 border-t border-[#d9d9d9]">
        계정이 있으신가요?{" "}
        <Link to={"/login"}>
          <span className="text-[#2F7884] font-bold">로그인</span>
        </Link>
      </p>
    </div>
  );
}

export default Signin;
