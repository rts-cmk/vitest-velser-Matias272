import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  processInput,
  simpleSum,
  fetchData,
  validateInput,
  getUserName,
} from "./øvelser.js";
import { multiply } from "./extern.js";

// Test med forskellige inputtyper
describe("processInput", () => {
  // Testing for null input
  it("should handle null value", () => {
    expect(processInput(null)).toBe("NULL_VALUE");
  });

  // Testing for numbers input
  it("should handle numbers", () => {
    expect(processInput(67)).toBe(67);
    expect(processInput(NaN)).toBe("INVALID_NUMBER");
    expect(processInput(Infinity)).toBe("INFINITE_NUMBER");
  });

  // Testing for strings input
  it("should handle strings", () => {
    expect(processInput("LALALA")).toBe("LALALA");
    expect(processInput("LA LA LA")).toBe("LA LA LA");
    expect(processInput("")).toBe("EMPTY_STRING");
  });

  // Testing for unsupported input
  it("should hanlde unsupported types", () => {
    expect(processInput([])).toBe("UNSUPPORTED_TYPE");
  });
});

// Strukturér dine tests med describe, beforeEach og afterEach
describe("Math Utils", () => {
  let a;
  let b;
  beforeEach(() => {
    a = 60;
    b = 7;
  });
  afterEach(() => {
    a = null;
    b = null;
  });
  describe("SimpleSum", () => {
    it("Should plus two numbers together", () => {
      expect(simpleSum(a, b)).toBe(67);
    });
  });
});

// Test af asynkrone funktioner
describe("fetchData()", () => {
  it("should return data with succes", async () => {
    const result = await fetchData(true);
    expect(result).toBe("Data fetched");
  });

  it("skal kaste fejl ved fejltilfælde", async () => {
    await expect(fetchData(false)).rejects.toThrow("Error with fetching");
  });
});

// Test af fejl og undtagelser
describe("validateInput()", () => {
  it("should true when it is valid", () => {
    expect(validateInput("tekst")).toBe(true);
  });

  it("should make an error when it isnt a string", () => {
    expect(() => validateInput(123)).toThrow("Input should be a string");
  });

  it("should make an error when it is empty", () => {
    expect(() => validateInput("   ")).toThrow("Input cant be empty");
  });
});

// Mock den interne afhængighed
// apiClient.js
export async function get(url) {
  const response = await fetch(url);
  return response.json();
}

// userService.js

export async function getUserName(userId) {
  const data = await get(`https://api.example.com/users/${userId}`);
  return data.name;
}

// userService.test.js
import * as apiClient from './extern.js';

describe('getUserName', () => {
  it('returnerer brugernavn fra API', async () => {
    // Brug vi.spyOn til named exports
    vi.spyOn(apiClient, 'get').mockResolvedValue({ name: 'Alice' });

    const name = await getUserName(1);

    expect(name).toBe('Alice');
    expect(apiClient.get).toHaveBeenCalledWith('https://api.example.com/users/1');
  });
});



