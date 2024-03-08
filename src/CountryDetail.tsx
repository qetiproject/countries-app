import { useParams } from "react-router-dom";
import { environment } from "./environment";
import { useEffect, useState } from "react";

export default function CountryDetail() {
  const { name } = useParams();
  console.log(name);
  const [countriesByCommonName, setCountriesByCommonName] = useState<any>([]);

  const getCountriesByCommonName = async (name: string) => {
    try {
      const res = await fetch(`${environment.FetchData}/name/${name}`);
      const countries = await res.json();
      setCountriesByCommonName(countries);
    } catch (e) {
      console.log(e, "error");
    }
  };

  useEffect(() => {
    if (name) {
      getCountriesByCommonName(name);
    }
  }, []);

  return (
    <div>
      {countriesByCommonName.length > 0 ? (
        countriesByCommonName.map((country: any, index: any) => (
          <article
            key={index}
            className="flex  lg:px-8 items-start justify-between"
          >
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                className="rounded-t-lg lg:px-2"
                src={country.flags.png}
                alt={country.flags.alt}
                style={{ width: "100%", height: "150px" }}
              />
              <div className="p-5">
                <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Name: {name}
                </h5>

                <p className=" font-normal text-gray-700 dark:text-gray-400">
                  Population: {country.population}
                </p>
                <p className=" font-normal text-gray-700 dark:text-gray-400">
                  Region: {country.region}
                </p>
                <p className=" font-normal text-gray-700 dark:text-gray-400">
                  Capital:{country.capital}
                </p>
              </div>
            </div>
          </article>
        ))
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
}
