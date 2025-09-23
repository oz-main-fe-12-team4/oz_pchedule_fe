import TabButton from "../components/common/TabButton";

const Someday = () => {
  return (
    <div className="w-full">
      <TabButton tabs={["전체", "내가작성글", "공유스토리"]} />
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-400 text-xl mt-5">
          + 버튼을 눌러 일정을 등록해보세요.
        </p>
      </div>
    </div>
  );
};

export default Someday;
