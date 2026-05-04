
```javascript
const Anthropic = require("@anthropic-ai/sdk");
const readline = require("readline");

const client = new Anthropic();

// Define tools for unit and currency conversion
const tools = [
  {
    name: "convert_length",
    description: "Convert between length units (meters, feet, kilometers, miles, etc)",
    input_schema: {
      type: "object",
      properties: {
        value: {
          type: "number",
          description: "The value to convert",
        },
        from_unit: {
          type: "string",
          description:
            "The source unit (meters, feet, kilometers, miles, inches, yards, centimeters)",
        },
        to_unit: {
          type: "string",
          description: "The target unit to convert to",
        },
      },
      required: ["value", "from_unit", "to_unit"],
    },
  },
  {
    name: "convert_weight",
    description: "Convert between weight units (kilograms, pounds, grams, ounces, etc)",
    input_schema: {
      type: "object",
      properties: {
        value: {
          type: "number",
          description: "The value to convert",
        },
        from_unit: {
          type: "string",
          description:
            "The source unit (kilograms, pounds, grams, ounces, tons, milligrams)",
        },
        to_unit: {
          type: "string",
          description: "The target unit to convert to",
        },
      },
      required: ["value", "from_unit", "to_unit"],
    },
  },
  {
    name: "convert_temperature",
    description: "Convert between temperature scales (Celsius, Fahrenheit, Kelvin)",
    input_schema: {
      type: "object",
      properties: {
        value: {
          type: "number",
          description: "The temperature value",
        },
        from_unit: {
          type: "string",
          description: "The source temperature scale (Celsius, Fahrenheit, Kelvin)",
        },
        to_unit: {
          type: "string",
          description: "The target temperature scale",
        },
      },
      required: ["value", "from_unit", "to_unit"],
    },
  },
  {
    name: "convert_currency",
    description: "Convert between different currencies using current exchange rates",
    input_schema: {
      type: "object",
      properties: {
        amount: {
          type: "number",
          description: "The amount of money to convert",
        },
        from_currency: {
          type: "string",
          description: "The source currency code (USD, EUR, GBP, JPY, MXN, etc)",
        },
        to_currency: {
          type: "string",
          description: "The target currency code",
        },
      },
      required: ["amount", "from_currency", "to_currency"],
    },
  },
  {
    name: "convert_volume",
    description: "Convert between volume units (liters, gallons, milliliters, cups, etc)",
    input_schema: {
      type: "object",
      properties: {
        value: {
          type: "number",
          description: "The value to convert",
        },
        from_unit: {
          type: "string",
          description:
            "The source unit (liters, milliliters, gallons, cups, pints, quarts, fluid ounces)",
        },
        to_unit: {
          type: "string",
          description: "The target unit to convert to",
        },
      },
      required: ["value", "from_unit", "to_unit"],
    },
  },
];

// Conversion functions
function convertLength(value, fromUnit, toUnit) {
  // Convert to meters first
  const toMeters = {
    meter: 1,
    meters: 1,
    m: 1,
    foot: 0.3048,
    feet: 0.3048,
    ft: 0.3048,
    kilometer: 1000,
    kilometers: 1000,
    km: 1000,
    mile: 1609.34,
    miles: 1609.34,
    mi: 1609.34,
    inch: 0.0254,
    inches: 0.0254,
    in: 0.0254,
    yard: 0.9144,
    yards: 0.9144,
    yd: 0.9144,
    centimeter: 0.01,
    centimeters: 0.01,
    cm: 0.01,
    millimeter: 0.001,
    millimeters: 0.001,
    mm: 0.001,
  };

  const fromKey = fromUnit.toLowerCase();
  const toKey = toUnit.toLowerCase();

  if (!toMeters[fromKey] || !toMeters[toKey]) {
    return `Error: Unknown unit. Supported units: ${Object.keys(toMeters).join(", ")}`;
  }

  const meters = value * toMeters[fromKey];
  const result = meters / toMeters[toKey];
  return `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

function convertWeight(value, fromUnit, toUnit) {
  const toKilograms = {
    kilogram: 1,
    kilograms: 1,
    kg: 1,
    pound: 0.453592,
    pounds: 0.453592,
    lb: 0.453592,
    lbs: 0.453592,
    gram: 0.001,
    grams: 0.001,
    g: 0.001,
    ounce: 0.0283495,
    ounces: 0.0283495,
    oz: 0.0283495,
    ton: 1000,
    tons: 1000,
    milligram