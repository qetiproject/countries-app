"use client";
import { useState, useEffect } from "react";
import Country from "./Country";
import { environment } from "./environment";
import { regions } from "./regions";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [countriesByRegion, setCountriesByRegion] = useState([]);
  const [countriesByCommonName, setCountriesByCommonName] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = (value: string) => {
    setKeyword(value);
    if (!value) {
      getCountries();
    }
  };

  const changeRegion = (e: any) => {
    setRegion(e.target.value);
  };

  const getCountries = async () => {
    try {
      const res = await fetch(`${environment.FetchData}/all`);
      const countries = await res.json();
      setCountries(countries);
    } catch (e) {
      console.log(e, "error");
    }
  };

  const getCountriesByRegion = async (region: string) => {
    try {
      const res = await fetch(`${environment.FetchData}/region/${region}`);
      const countries = await res.json();
      setCountriesByRegion(countries);
    } catch (e) {
      console.log(e, "error");
    }
  };

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
    getCountries();
  }, []);

  useEffect(() => {
    getCountriesByRegion(region);
  }, [region]);

  useEffect(() => {
    getCountriesByCommonName(keyword);
  }, [keyword]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8  flex flex-col items-start justify-start">
        <div
          className="mt-6 flex items-center justify-between"
          style={{ width: "100%" }}
        >
          <div className="flex border-2 rounded">
            <button className="flex items-center justify-center px-4 border-r">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 px-4 py-2 w-80"
              value={keyword ?? ""}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
          <div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              aria-label="Default select example"
              onChange={(event) => {
                changeRegion(event);
              }}
            >
              <option aria-checked>Filtered By Region</option>
              {regions.map((x) => (
                <option key={x.name} value={x.name}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-none  lg:grid-cols-4 md:grid-cols-2 sm:grid-col-1">
          {countriesByRegion.length > 0
            ? countriesByRegion.map((country, index) => (
                <Country country={country} key={index} />
              ))
            : countriesByCommonName.length > 0
            ? countriesByCommonName.map((country, index) => (
                <Country country={country} key={index} />
              ))
            : countries.map((country, index) => (
                <Country country={country} key={index} />
              ))}
        </div>
      </div>
    </>
  );
}
