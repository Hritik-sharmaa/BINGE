import TvseriesList from "../components/TvseriesList";

const Tvseries = () => {
  return (
    <div>
      <TvseriesList category="popular" title="Popular" />
      <TvseriesList category="top_rated" title="Top rated" />
      <TvseriesList category="airing_today" title="Airing today" />
      <TvseriesList category="on_the_air" title="Now playing" />
    </div>
  );
};

export default Tvseries;
