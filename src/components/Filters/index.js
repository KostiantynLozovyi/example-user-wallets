import React, { useEffect, useState } from "react";
import Input from "../Input";

import "./index.css";

function getMaxBalance(items) {
  return items.reduce((acc, curr) => Math.max(acc, curr.balance), 0);
}

export default function Filters(props) {
  const { setItems, originalItems, items, setSearch, search } = props;


  const [filterBalanceFrom, setFilterBalanceFrom] = useState(0);
  const [filterBalanceTo, setFilterBalanceTo] = useState(
    getMaxBalance(originalItems)
  );

  useEffect(() => {
    const balanceFrom = filterBalanceFrom || 0;
    const balanceTo = filterBalanceTo || getMaxBalance(originalItems);

    const filteredItems = search.filter(
      (item) => balanceFrom <= item.balance && item.balance <= balanceTo
    );

    setItems(filteredItems);
    console.log(search);
  }, [filterBalanceFrom, filterBalanceTo, originalItems,setItems, search]);

  useEffect(() => {
    setFilterBalanceTo(getMaxBalance(originalItems));
  }, [originalItems]);

  function handleIBANSearch(e) {
    if (e.currentTarget.value) {
      const filteredItems = items.filter((item) =>
        item.IBAN.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      );
      setSearch(filteredItems);
    } else {
      setSearch(originalItems);
    }
  }

  return (
    <div className="filters">
      <h2 className="filters-label">Filters</h2>

      <div className="filters-content">
        <div className="filter">
          <Input placeholder={"Search IBAN"} onChange={handleIBANSearch} />
        </div>
        <div className="filter">
          Balance From
          <Input
            placeholder={"Filter Balance From"}
            value={filterBalanceFrom}
            onChange={(e) => setFilterBalanceFrom(e.currentTarget.value)}
          />
        </div>
        <div className="filter">
          Balance To
          <Input
            placeholder={"Filter Balance To"}
            value={filterBalanceTo}
            onChange={(e) => setFilterBalanceTo(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
}
