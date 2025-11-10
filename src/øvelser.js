// Test med forskellige inputtyper
export function processInput(value) {
  if (value === null) {
    return "NULL_VALUE";
  }

  if (typeof value === "number") {
    if (isNaN(value)) return "INVALID_NUMBER";
    if (!isFinite(value)) return "INFINITE_NUMBER";
    return value;
  }

  if (typeof value === "string") {
    if (value.trim() === "") return "EMPTY_STRING";
    return value.toUpperCase();
  }

  return "UNSUPPORTED_TYPE";
}

// Strukturér dine tests med describe, beforeEach og afterEach
export function simpleSum(a, b){
    return a + b
}

// Test af asynkrone funktioner
export function fetchData(success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve('Data fetched');
      } else {
        reject(new Error('Error with fetching'));
      }
    }, 100);
  });
}

// Test af fejl og undtagelser
export function validateInput(value) {
  if (typeof value !== 'string') {
    throw new Error('Input should be a string');
  }
  if (value.trim() === '') {
    throw new Error('Input cant be empty');
  }
  return true;
}


// Mocking af afhængigheder
import { get } from './extern.js';

export async function getUserName(userId) {
  const data = await get(`https://api.example.com/users/${userId}`);
  return data.name;
}


