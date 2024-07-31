import { Records } from "./Records";
import { RightSide } from "./RightSide";

export const MainSection = () => {
  return (
    <div className="bg-[#F3F4F6] pb-[32px] border">
      <div className="flex max-w-screen-2xl m-auto px-[120px]">
        <div className="w-[22%] px-[16px] mt-[24px] py-[24px] bg-[#F9FAFB] rounded-xl">
          <Records />
        </div>
        <div className="w-[100%]">
          <RightSide />
        </div>
      </div>
    </div>
  );
};
