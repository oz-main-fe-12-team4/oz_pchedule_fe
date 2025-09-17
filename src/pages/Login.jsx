import { useState } from "react";
import Input from "../components/Input";
import logo from "../assets/Logo.svg";
import googleLogo from "../assets/google.png";
import naverLogo from "../assets/naver.png";
import kakaoLogo from "../assets/kakao.png";
import { Link } from "react-router";

function Login() {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <form
        name="login"
        className="flex flex-col justify-center items-center gap-5"
      >
        <img src={logo} alt="pchedule logo" className="w-[300px] scale-70" />
        <div className="flex flex-col gap-1 justify-center items-start">
          <Input
            label={"이메일"}
            type={"email"}
            placeHolder={"이메일을 입력하세요."}
            value={emailInputValue}
            setValue={setEmailInputValue}
            required={true}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-start">
          <Input
            label={"비밀번호"}
            type={"password"}
            placeHolder={"비밀번호를 입력하세요."}
            value={passwordInputValue}
            setValue={setPasswordInputValue}
            required={true}
          />
        </div>
        <button className="w-[300px] h-8 m-3 rounded-xl bg-[#D9D9D9] hover:bg-[#5AA5B2]">
          Login
        </button>
      </form>
      <div className="w-[300px] flex justify-center items-center gap-10 p-8 border-t border-[#d9d9d9]">
        <img
          src={googleLogo}
          alt="google logo"
          className="w-12 h-12 rounded-full"
        />
        <img
          src={naverLogo}
          alt="naver logo"
          className="w-12 h-12 rounded-full"
        />
        <img
          src={kakaoLogo}
          alt="kakao logo"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <p>
        계정이 없으신가요?{" "}
        <Link to={"/signin"}>
          <span className="text-[#2F7884] font-bold">회원가입</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
