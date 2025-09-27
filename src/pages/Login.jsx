import { useState } from "react";
import Input from "../components/common/Input";
import logo from "../assets/Logo.svg";
import googleLogo from "../assets/google.png";
import naverLogo from "../assets/naver.png";
import kakaoLogo from "../assets/kakao.png";
import { Link } from "react-router";
import Button from "../components/common/Button";
import { fetchLogin } from "../sevices/authApi";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const { setUserData, setIsAdmin } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUserData = await fetchLogin(emailInputValue, passwordInputValue);
    await setIsAdmin(loginUserData.is_admin);
    await setUserData(loginUserData.userData);
    if (loginUserData.is_admin) navigate("/admin/user_list");
    if (!loginUserData.is_admin) navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 m-20">
      <form
        name="login"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <img src={logo} alt="pchedule logo" className="w-[300px] scale-70" />
        <div className="w-[300px] flex flex-col gap-1 justify-center items-start">
          <Input
            label={"이메일"}
            inputId={"이메일"}
            type={"email"}
            placeholder={"이메일을 입력하세요."}
            value={emailInputValue}
            setValue={setEmailInputValue}
            required={true}
          />
        </div>
        <div className="w-[300px] flex flex-col gap-1 justify-center items-start">
          <Input
            label={"비밀번호"}
            inputId={"비밀번호"}
            type={"password"}
            placeholder={"비밀번호를 입력하세요."}
            value={passwordInputValue}
            setValue={setPasswordInputValue}
            required={true}
          />
        </div>
        <Button type="submit" variant={"login"} children={"로그인"} />
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
};

export default Login;
