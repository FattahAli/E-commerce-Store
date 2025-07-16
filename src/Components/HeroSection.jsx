import { ArrowLeft, ArrowRight } from "lucide-react";

const HeroSection = () => {
  

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="max-w-[1400px] h-[700px] w-full m-auto py-8 relative">
      <div
        style={{ backgroundImage: `url(${slides.map((slide) => slide.url)})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-100"
      ></div>
      {/* LEft arror */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/2 text-white cursor-pointer">
        {<ArrowLeft size={30}/>}
      </div>
      {/* right arror */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/2 text-white cursor-pointer">
        {<ArrowRight size={30}/>}
      </div>
    </div>
  );
};

export default HeroSection;
