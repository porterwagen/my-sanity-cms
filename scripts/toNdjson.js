/**
 * toNdjson.js
 * 
 * A utility script to convert CSV data to NDJSON (Newline Delimited JSON) format
 * for importing into Sanity Studio.
 * 
 * === INSTRUCTIONS ===
 * 
 * 1. Install required dependencies:
 *    npm install csv-parse uuid
 * 
 * 2. Run the script:
 *    node scripts/toNdjson.js <inputCsvFile> [outputNdjsonFile]
 * 
 * 3. Customize the 'transformRecord' function to map your CSV columns to Sanity fields
 *    - Set the correct document _type to match your schema
 *    - Map CSV columns to appropriate Sanity fields
 * 
 * 4. Import the generated NDJSON file to Sanity:
 *    npx sanity@latest dataset import <outputNdjsonFile> <datasetName> --replace
 *    
 *    Example: 
 *    npx sanity@latest dataset import output.ndjson production
 *
 *    Options:
 *    --replace     Overwrite existing documents with same IDs
 *    --missing     Only import documents that don't already exist
 *    --asset-concurrency=<num>   Number of asset files to upload concurrently
 *    --help        Show all import options
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { v4: uuidv4 } = require('uuid');

// Check if required packages are installed
try {
  require.resolve('csv-parse/sync');
  require.resolve('uuid');
} catch (e) {
  console.error('Required packages are missing. Please install them with:');
  console.error('npm install csv-parse uuid');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node toNdjson.js <inputCsvFile> [outputNdjsonFile]');
  process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1] || inputFile.replace(/\.csv$/, '.ndjson');

// Ensure input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`Input file "${inputFile}" does not exist.`);
  process.exit(1);
}

// Convert CSV to NDJSON
try {
  // Read and parse CSV
  const csvData = fs.readFileSync(inputFile, 'utf8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
  
  console.log(`Found ${records.length} records in ${inputFile}`);
  
  // Transform data to Sanity document format
  const documents = records.map(record => {
    // Generate a unique _id for each document
    const _id = uuidv4();
    
    // Transform CSV record to Sanity document
    // Modify this transformation based on your CSV structure and schema
    return {
      _id,
      _type: 'yourDocumentType', // Change to match your schema type
      ...transformRecord(record)
    };
  });
  
  // Write NDJSON to file
  const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n');
  fs.writeFileSync(outputFile, ndjson);
  
  console.log(`Successfully converted ${records.length} records to NDJSON format`);
  console.log(`Output written to ${outputFile}`);
} catch (error) {
  console.error('Error processing CSV file:', error);
  process.exit(1);
}

/**
 * Transform a CSV record to a Sanity document format
 * Customize this function based on your specific CSV structure and Sanity schema
 * 
 * @param {Object} record - A record from the CSV file
 * @returns {Object} - A transformed object suitable for Sanity
 */
function transformRecord(record) {
  // Example transformation - modify according to your CSV structure
  const transformed = {};
  
  // Map CSV columns to your schema fields
  // For example:
  if (record.title) transformed.title = record.title;
  if (record.description) transformed.description = record.description;
  
  // Handle dates
  if (record.date) {
    // Convert to ISO date format for Sanity
    try {
      const date = new Date(record.date);
      transformed.publishedAt = date.toISOString();
    } catch (e) {
      console.warn(`Invalid date format for record: ${JSON.stringify(record)}`);
    }
  }
  
  // Handle slug field
  if (record.title) {
    transformed.slug = {
      _type: 'slug',
      current: record.title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
    };
  }
  
  // Add more custom field transformations as needed
  
  return transformed;
}