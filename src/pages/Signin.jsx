import { useState } from "react";
import Input from "../components/common/Input";
import { Link } from "react-router";
import logo from "../assets/Logo.svg";
import Button from "../components/common/Button";
import { REG_EXP } from "../constants/regExp";
import { fetchSignin } from "../sevices/authApi";
import { ERROR_MESSAGE } from "../constants/errorMessage";

const Signin = () => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [checkPasswordInputValue, setCheckPasswordInputValue] = useState("");
  const [signinError, setSigninError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchSignin(
      emailInputValue,
      passwordInputValue,
      nameInputValue
    );
    if (!res) return;

    setSigninError(res);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <form
        name="login"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <img src={logo} alt="pchedule logo" className="w-[300px] scale-70" />
        <div className="w-[300px] flex flex-col gap-1 justify-center items-start">
          <Input
            type={"text"}
            placeholder={"이름을 입력하세요."}
            label={"이름"}
            inputId={"이름"}
            pattern={REG_EXP.name}
            errorMessage={ERROR_MESSAGE.name}
            value={nameInputValue}
            setValue={setNameInputValue}
            required={true}
          />
        </div>
        <div className="w-[300px] flex flex-col gap-1 justify-center items-start">
          <Input
            type={"email"}
            placeholder={"이메일을 입력하세요."}
            label={"이메일"}
            inputId={"이메일"}
            pattern={REG_EXP.email}
            errorMessage={ERROR_MESSAGE.email}
            value={emailInputValue}
            setValue={setEmailInputValue}
            required={true}
          />
        </div>
        <div className="w-[300px] flex flex-col gap-1 justify-center items-start">
          <Input
            type={"password"}
            placeholder={"비밀번호를 입력하세요."}
            label={"비밀번호"}
            inputId={"비밀번호"}
            pattern={REG_EXP.password}
            errorMessage={ERROR_MESSAGE.password}
            value={passwordInputValue}
            setValue={setPasswordInputValue}
            required={true}
          />
        </div>
        <div className="w-[300px] flex flex-col gap-1 justify-center items-start">
          <Input
            type={"password"}
            placeholder={"비밀번호를 한번 더 입력하세요."}
            label={"비밀번호 확인"}
            inputId={"비밀번호확인"}
            pattern={REG_EXP.password}
            errorMessage={ERROR_MESSAGE.checkPassword}
            value={checkPasswordInputValue}
            setValue={setCheckPasswordInputValue}
            required={true}
            compareValue={passwordInputValue}
          />
        </div>
        {
          signinError && <div>{signinError}</div> // response 확인해보고 변경해야함.
        }
        <Button type="submit" variant={"login"} children={"회원가입"} />
      </form>
      <p className="w-[300px] text-center p-8 border-t border-[#d9d9d9]">
        계정이 있으신가요?{" "}
        <Link to={"/login"}>
          <span className="text-[#2F7884] font-bold">로그인</span>
        </Link>
      </p>
    </div>
  );
};

export default Signin;
