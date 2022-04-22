const BASE_URL = "https://api.dreman.eu/api";

export async function getBalance(IBAN) {
  try {
    const response = await fetch(`${BASE_URL}/account/balance/${IBAN}`);
    const data = await response.json();
    return data.balance;
  } catch {
    return null;
  }
}

export async function checkIBAN(IBAN) {
  try {
    const response = await fetch(`${BASE_URL}/helper/validate/iban/${IBAN}`);
    const data = await response.json();
    return data.iban;
  } catch {
    return alert("Invalid IBAN");
  }
}
