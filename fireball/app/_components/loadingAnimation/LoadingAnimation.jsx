import Image from "next/image";
import Loading from "public/gif/Loading.gif";

export default function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center pt-20">
      <Image
        src={Loading}
        alt="Loading..."
        height={80}
        width={80}
        priority={true}
      />
    </div>
  );
}
