import React, { useState } from "react";

const ASCENDING = 0;
const DESCENDING = 1;

const FIELDS = {
  ID: "ID",
  IBAN: "IBAN",
  balance: "balance",
};

const FIELDS_TYPES = {
  ID: "number",
  IBAN: "string",
  balance: "number",
};

const SVGDownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="arrowDown"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
    />
  </svg>
);

const SVGUpICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="arrowUp"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 11l7-7 7 7M5 19l7-7 7 7"
    />
  </svg>
);

export default function Sorting(props) {
  const { items, filteredItems, setFilteredItems } = props;

  const [sortDirection, setSortDirection] = useState(ASCENDING);
  const [sortField, setSortField] = useState(FIELDS.ID);

  const icon = sortDirection === ASCENDING ? SVGUpICON : SVGDownIcon;

  const sorts = {
    number: sortNumbers,
    string: sortStrings,
  };

  function renderFieldHead(title, field) {
    return (
      <div
        className="table-header-item"
        onClick={(e) => sortItems(FIELDS[field], e)}
      >
        {title}
        {sortField === FIELDS[field] && icon}
      </div>
    );
  }

  function sortNumbers(field, isAsc) {
    return [...filteredItems].sort((a, b) =>
      isAsc ? a[field] - b[field] : b[field] - a[field]
    );
  }

  function sortStrings(field, isAsc) {
    return [...filteredItems].sort((a, b) =>
      isAsc
        ? ("" + a[field]).localeCompare(b[field])
        : ("" + b[field]).localeCompare(a[field])
    );
  }

  function sortItems(field, e) {
    e.stopPropagation();
    if (sortDirection === ASCENDING) {
      setSortDirection(DESCENDING);
    } else {
      setSortDirection(ASCENDING);
    }
    setSortField(field);
    const isAsc = sortDirection === ASCENDING;
    const sorted = sorts[FIELDS_TYPES[field]](field, isAsc);

    setFilteredItems(sorted);
  }

  return (
    <>
      {!!items.length && (
        <div className="table-header">
          <div className="table-header-ID">
            {renderFieldHead("ID", FIELDS.ID)}
          </div>
          <div className="table-header-IBAN">
            {renderFieldHead("IBAN", FIELDS.IBAN)}
          </div>
          <div className="table-header-Balance">
            {renderFieldHead("Balance", FIELDS.balance)}
          </div>
          <div className="action">Action</div>
        </div>
      )}
    </>
  );
}
