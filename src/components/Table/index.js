import React, { useEffect, useState } from "react";
import { checkIBAN, getBalance } from "../../API";
import Button from "../Button";
import Filters from "../Filters";
import Input from "../Input";
import Item from "../Item";
import Sorting from "../Sorting";
import "./index.css";

function itemsIncludeIBAN(items, IBAN) {
  return items.some((item) => item.IBAN === IBAN);
}

export default function Table() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState([]);
  const [IBAN, setIBAN] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilteredItems(items);
    setSearch(items);
  }, [items]);

  function handleChange(e) {
    setIBAN(e.currentTarget.value);
  }

  async function handleAdd() {
    setIBAN("");

    if (!itemsIncludeIBAN(items, IBAN)) {
      const ibanIsValid = await checkIBAN(IBAN);
      setIsLoading(true);
      if (ibanIsValid) {
        const balance = await getBalance(IBAN);
        if (balance) {
          setItems((prevState) => [
            ...prevState,
            {
              IBAN,
              balance,
            },
          ]);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }

  function handleClickDeleteItem(param) {
    return function () {
      const newArray = items.filter((item, index) => item.IBAN !== param);
      setItems(newArray);
    };
  }

  return (
    <div className="table">
      <div className="header">
        <div className="iban-wrapper">
          <Input placeholder={"IBAN"} onChange={handleChange} value={IBAN} />
          <Button disabled={isLoading} onClick={handleAdd}>
            {isLoading ? "Loading..." : "Add"}
          </Button>
        </div>
        <div>
          {!!items.length && (
            <Filters
              search={search}
              setSearch={setSearch}
              items={filteredItems}
              setItems={setFilteredItems}
              originalItems={items}
            />
          )}
        </div>
      </div>
      <div className="content">
        <Sorting
          items={items}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
        />
        {filteredItems.map((item, index) => (
          <Item
            key={index}
            handleClickDeleteItem={handleClickDeleteItem(item.IBAN)}
            ID={index + 1}
            IBAN={item.IBAN}
            balance={item.balance}
          />
        ))}
      </div>
    </div>
  );
}
