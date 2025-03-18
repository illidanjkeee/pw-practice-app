import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Retrieves an environment variable with validation
 * @throws Error if the variable is required but not defined
 */
export const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Required environment variable ${key} is not defined`);
  }
  return value || "";
};

// Export environment variables without exposing default values
export const env = {
  baseUrl: getEnv("BASE_URL"),
  apiKey: getEnv("API_KEY"),
  testUser: {
    email: getEnv("TEST_USER_EMAIL"),
    password: getEnv("TEST_USER_PASSWORD"),
  },
  testEmails: {
    deleteTarget: getEnv("TEST_DELETE_EMAIL"),
    editTarget: getEnv("TEST_EDIT_EMAIL"),
  },
  testAgeFilters: (getEnv("TEST_AGE_FILTERS") || "").split(",").filter(Boolean),
};
