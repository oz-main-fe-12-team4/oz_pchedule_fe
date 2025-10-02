import { api, clearAccessToken, setAccessToken } from "./api";

export const fetchSignin = async (email, password, name) => {
  const userData = {
    email: email,
    password: password,
    name: name,
    profile_image: "string",
    allow_notification: true,
  };
  try {
    const res = await api.post("/user/signup/", userData);
    if (!res) throw new Error("회원가입 에러");

    if (res.status === 201) window.location.href = "/login";

    if (res.status === 409 || res.status === 422) return res;
  } catch (err) {
    console.error(err);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
    return false;
  }
};

export const fetchLogin = async (email, password) => {
  const userData = {
    email: email,
    password: password,
  };

  try {
    const res = await api.post("/user/login/", userData);
    console.log(res?.data);
    if (!res) throw new Error("로그인 응답이 없음.");

    if (res.status === 200) {
      setAccessToken(res.data.access_token);
      return res.data.is_admin;
    }

    if (res.status === 401) {
      window.location.href = "/login";
    }

    if (res.status === 403)
      alert("정지된 계정입니다. 관리자에게 문의하세요. (admin@admin.com)");
  } catch (err) {
    console.log(err);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
  }
};

export const fetchLogout = async () => {
  try {
    console.log("getCsrf", document.cookie);
    const res = await api.post("/user/logout/");
    if (!res) throw new Error("로그아웃 응답 없음.");

    if (res.status === 200) {
      clearAccessToken();
      return res;
    }
  } catch (err) {
    console.log(err);
    alert("예기치 못한 서버오류가 있습니다. 잠시후 다시 시도해주세요.");
  }
};
