import { ArrowLeft, ArrowRight, Circle } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1664202526744-516d0dd22932?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[800px] m-auto py-8 relative">
      <div
        style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
        className="w-full h-full rounded-lg bg-center bg-cover duration-100"
      ></div>
      {/* LEft arror */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-[#011627] text-[#2EC4B6] cursor-pointer">
        {<ArrowLeft onClick={prevSlide} size={30} />}
      </div>
      {/* right arror */}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/2 text-white cursor-pointer">
        {<ArrowRight onClick={nextSlide} size={30} />}
      </div>
      <div className="flex justify-center py-4">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer mx-4 ${
              slideIndex === currentSlide ? "bg-[#2EC4B6] rounded-lg text-transparent" : "bg-gray-200 rounded-full text-transparent"
            }`}
          >
            <Circle size={15} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
