// src/data/cities.js

export const CITIES = [
  { value: "BOG", label: "Bogotá" },
  { value: "MED", label: "Medellín" },
  { value: "CAL", label: "Cali" },
  { value: "CAR", label: "Cartagena" },
  { value: "BAQ", label: "Barranquilla" },
  { value: "SMR", label: "Santa Marta" }
];

export const getCityName = (code) => {
  const city = CITIES.find(c => c.value === code);
  return city ? city.label : code;
};
