import HeroSection from "../Components/HeroSection";
import ProductList from "../Components/ProductList";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-8 py-12">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
