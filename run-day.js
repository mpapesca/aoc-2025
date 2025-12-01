#!/usr/bin/env bun

const day = process.argv[2];

if (!day) {
  console.error("Please provide a day number. Usage: npm run day -- <day>");
  process.exit(1);
}

const dayNumber = parseInt(day, 10);

if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 12) {
  console.error("Day must be a number between 1 and 12");
  process.exit(1);
}

const dayPath = `./days/day${dayNumber}/solution.js`;

try {
  await import(dayPath);
} catch (error) {
  if (error.code === "ERR_MODULE_NOT_FOUND" || error.message.includes("Cannot find module")) {
    console.error(`Solution for day ${dayNumber} not found at ${dayPath}`);
  } else {
    console.error(`Error running day ${dayNumber}:`, error.message);
  }
  process.exit(1);
}
