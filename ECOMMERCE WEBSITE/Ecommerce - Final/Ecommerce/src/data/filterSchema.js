export const filterSchema = {
  Cars: {
    common: [
      { key: "fuel", label: "Fuel", type: "select", options: ["Petrol", "Diesel"] },
      { key: "kmDriven", label: "KM Driven", type: "number" },
      { key: "price", label: "Price", type: "range" },
    ],
  },
};
