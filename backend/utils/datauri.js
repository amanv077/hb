import DataUriParser from "datauri/parser.js";
import path from "path";

/**
 * Converts a file buffer to a Data URI format
 * @param {Object} file - The file object with `originalname` and `buffer`
 * @returns {Object} - The parsed Data URI object
 * @throws {Error} - Throws an error if the file is invalid
 */
const getDataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error(
      "Invalid file input. Ensure the file is provided with a valid name and buffer."
    );
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export default getDataUri;
