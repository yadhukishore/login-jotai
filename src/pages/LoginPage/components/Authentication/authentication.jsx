import Image from "@src/components/Image";
import LoginForm from "../LoginForm";

const Authentication = () => {
  return (
    <div className="w-full relative flex flex-col items-center p-4">
      <div className="w-[210px] aspect-[210/20] mb-[50px] relative">
        <Image src={"images/waccommerce.svg"} alt={"logo"} />
      </div>
      <div className="flex bg-white rounded-md border border-basic-200 w-full max-w-[29rem] shadow-[0px_3px_4px_0px_#0000000F]">
        <LoginForm />
      </div>
    </div>
  );
};

export default Authentication;
