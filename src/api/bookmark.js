import axios from "axios";

// 찜하기 API 호출을 담당하는 함수
export async function toggleBookmarkApi(itemId, add) {
  // 인증을 위한 토큰은 필요에 따라 전역 설정하거나, 함수 인자로 받아 사용
  const accessToken = localStorage.getItem("accessToken"); // 예시

  if (add) {
    // 찜하기 등록 (POST /favorite)
    return axios.post(
      `/favorite`,
      { id: itemId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } else {
    // 찜하기 취소 (DELETE /favorite/{itemId})
    return axios.delete(`/favorite/${itemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
