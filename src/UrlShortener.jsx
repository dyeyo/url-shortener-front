import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "./constants/url.js";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [listUrl, setListUrl] = useState([]);

  const getUrls = async () => {
    try {
      const response = await axios.get(`${url}shortens`);
      if (Array.isArray(response.data.data)) {
        setListUrl(response.data.data);
        console.log(listUrl);
      } else {
        console.error("Unexpected data format:", response.data);
        setListUrl([]);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}shorten`, {
        original_url: originalUrl,
      });
      setShortenedUrl(response.data.shortened_url);
      setOriginalUrl("");
      getUrls();
    } catch (error) {
      console.error("Error acortando la URL:", error);
    }
  };

  useEffect(() => {
    getUrls();
  }, []);

  useEffect(() => {
    console.log(listUrl);
  }, [listUrl]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 antialiased">
        <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 rounded-[20px] p-3 bg-gray-800">
          <div className="text-center m-6">
            <h1 className="text-3xl font-semibold text-gray-100">
              Acortador de URLs
            </h1>
            <p className="text-gray-200">Prueba para acortar URLs</p>
          </div>
          <div className="m-6">
            <div className="mb-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    URL
                  </label>
                  <input
                    type="text"
                    id="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Digite la URL"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-row gap-2">
              <button
                onClick={() => {
                  setOriginalUrl("");
                }}
                className="bg-gray-700 text-white w-full p-2 flex flex-row justify-center gap-2 items-center rounded-sm hover:bg-gray-900 duration-100 ease-in-out"
              >
                Limpiar
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center rounded-sm hover:bg-green-600 duration-100 ease-in-out"
              >
                Generar
              </button>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  URL Cortada
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {shortenedUrl}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <a href={shortenedUrl} target="_blank">Ir</a>
                  </th>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
