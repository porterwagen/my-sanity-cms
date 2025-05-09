/**
 * toNdjson.js
 *
 * Self-contained script and instruction manual for importing CSV → Sanity via NDJSON
 *
 * 0. Prepping your schema:
 *
 * Ensure your Sanity schema defines a 'post' type matching your data.
 * Example schema (put in schemas/post.js):
 *
 * export default {
 *   name: 'post',
 *   type: 'document',
 *   title: 'Blog Post',
 *   fields: [
 *     { name: 'title',        type: 'string' },
 *     { name: 'slug',         type: 'slug',   options: { source: 'title', maxLength: 96 } },
 *     { name: 'publishedAt',  type: 'datetime' },
 *     { name: 'body',         type: 'array', of: [{ type: 'block' }] }
 *   ]
 * };
 *
 * After adding the schema file, restart Sanity Studio (`sanity start`) to apply.
 *
 * 1. Convert your CSV (blogs.csv) to JSON:
 *
 *    - Install csvtojson globally (if not already):
 *        npm install -g csvtojson
 *
 *    - Convert the CSV to JSON:
 *        csvtojson data/blogs.csv > data/blogs.json
 *
 *    - Quick sanity check:
 *        head -n 5 data/blogs.json
 *
 * 2. Run this script to generate NDJSON:
 *        node data/toNdjson.js
 *
 * 3. Import into Sanity:
 *        sanity dataset import data/blogs.ndjson production --replace
 *
 * Notes:
 *  - Adjust file paths (data/) as needed.
 *  - Ensure your Sanity project is initialized and authenticated.
 */

const fs = require('fs'); // Node’s file system module for file I/O

// 1. Load and parse your data
//    "require" will parse the JSON array into a JS array of objects.
const posts = require('./data/blogs.json');

// 2. Transform each row into a Sanity document shape
//    We map over each post and reshape it to match your Sanity schema.
const ndArray = posts.map((row, index) => ({
  _type: 'post',               // Must match your schema’s document type
  title: row.title,            // Map CSV "title" → Sanity title
  slug: { current: row.slug }, // Wrap CSV "slug" → Sanity slug type
  publishedAt: row.date,       // Map CSV "date" → Sanity datetime
  body: [                      // Simplest Portable Text: an array of blocks
    {
      _type: 'block',          // Each block is a paragraph
      children: [
        {
          _type: 'span',       // Each span is a chunk of text
          text: row.bodyText || row.bodyHtml // Use plain text or HTML column
        }
      ]
    }
  ],
  // _id: row.id,             // Uncomment to preserve a custom ID from CSV
}));

// 3. Serialize to NDJSON
//    JSON.stringify each object, then join with "\n" to get one JSON doc per line
const ndjson = ndArray.map(JSON.stringify).join('\n');

// 4. Write the result to disk
//    This will create or overwrite data/blogs.ndjson\ nfs.writeFileSync('data/blogs.ndjson', ndjson, 'utf8');

// 5. Log success
console.log(`✅ Created data/blogs.ndjson with ${ndArray.length} entries`);

/**
 * After running:
 *
 *   node data/toNdjson.js
 *
 * You will have data/blogs.ndjson ready for import:
 *
 *   sanity dataset import data/blogs.ndjson production --replace
 *
 * Happy importing! 🥳
 */