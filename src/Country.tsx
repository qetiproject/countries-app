import { Link } from "react-router-dom";

const Country = (props: any) => {
  const { id, population, region, capital } = props.country;
  const image = props.country.flags.png;
  const alt = props.country.flags.alt;
  const name = props.country.name.common;

  return (
    <Link to={`/country/${name}`}>
      <article
        key={id}
        className="flex max-w-xl flex-col items-start justify-between"
      >
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg"
            src={image}
            alt={alt}
            style={{ width: "100%", height: "150px" }}
          />
          <div className="p-5">
            <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Name: {name}
            </h5>

            <p className=" font-normal text-gray-700 dark:text-gray-400">
              Population: {population}
            </p>
            <p className=" font-normal text-gray-700 dark:text-gray-400">
              Region: {region}
            </p>
            <p className=" font-normal text-gray-700 dark:text-gray-400">
              Capital:{capital}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Country;
