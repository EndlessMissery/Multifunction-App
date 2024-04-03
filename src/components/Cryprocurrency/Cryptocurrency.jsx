import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cryptocurrency.css";

function Cryptocurrency() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`https://openapiv1.coinstats.app/coins?limit=1000`, {
        headers: { "X-API-KEY": "fn7a5EgHI5FOu5pG1+hCDzrSB5G0cEBgm5LC7nPl2WQ=" },
      })
      .then((res) => {
        // Format numbers with commas
        const formattedCurrency = res.data.result.map((coin) => ({
          ...coin,
          marketCap: coin.marketCap.toLocaleString(),
          price: coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 }),
          availableSupply: coin.availableSupply.toLocaleString(),
          volume: coin.volume.toLocaleString(),
        }));
        setCurrency(formattedCurrency);
      })
      .catch((err) => console.log(err));
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currency.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(currency.length / itemsPerPage);

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="CryptoContainer">
      <div className="Crypto">
        <h1 className="crypto-h">Cryptocurrencies</h1>
        <input
          className="crypto-input"
          type="text"
          placeholder="Search cryptocurrency..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market cap</th>
              <th>Price</th>
              <th>Supply</th>
              <th>Volume(24h)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems
              .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))
              .map((val, index) => (
                <tr key={index}>
                  <td className="rank">{val.rank}</td>
                  <td className="icon-crypto">
                    <a href={val.websiteUrl}>
                      <img src={val.icon} alt="" />
                    </a>
                    <p>{val.name}</p>
                  </td>
                  <td className="symbol-crypto">{val.symbol}</td>
                  <td>${val.marketCap}</td>
                  <td>${val.price}</td>
                  <td>{val.availableSupply}</td>
                  <td>{val.volume}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)}>Prev</button>
          )}
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cryptocurrency;
