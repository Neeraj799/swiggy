import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import Searchbar, { type SearchForm } from "@/components/Searchbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-4xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <Searchbar
          placeHolder="Search by City ot Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracing-tighter">
            Order tackaway even faster!
          </span>

          <span>
            Download the Swiggy App for faster ordering and personalised
            recommendations
          </span>

          <img src={appDownloadImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
