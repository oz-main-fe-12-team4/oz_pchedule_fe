import { Button } from "./Button";

function Test() {
  return (
    <div className="m-3 gap-2">
      {/* text */}
      <div className="flex flex-row gap-2">
        <Button variant="cancel" size="s">
          취소
        </Button>
        <Button variant="confirm" size="s">
          저장
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Button variant="category" size="s">
          카테고리
        </Button>
        <Button variant="category" size="s">
          우선순위
        </Button>
        <Button variant="category" size="s">
          공유
        </Button>
        <Button variant="category" size="s">
          반복
        </Button>
      </div>
      <Button variant="login">로그인</Button>
      <Button variant="login">가입하기</Button>
    </div>
  );
}

export default Test;
