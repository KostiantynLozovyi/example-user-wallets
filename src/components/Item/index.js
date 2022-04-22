import React  from "react";
import Button from "../Button";
import "./index.css";

export default function Item(props) {
  const { IBAN, balance, handleClickDeleteItem, ID } = props;

  return (
    <>
      <div className="item">
        <div className="ID">{ID}</div>
        <div className="IBAN">{IBAN}</div>
        <div className="balance">{balance}</div>
        <div className="action">
          <Button icon onClick={() => handleClickDeleteItem()} />
        </div>
      </div>
    </>
  );
}
