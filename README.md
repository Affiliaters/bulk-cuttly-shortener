
# Bulk Cuttly Shortener

**Note:** This is an unofficial package and is not affiliated with Cuttly Inc.

A Node.js package to shorten multiple links using multiple Cuttly tokens concurrently.

## Installation

To install the package, use npm:

```bash
npm install bulk-cuttly-shortener
```

## Usage


### Importing the Package

First, import the package into your Node.js application:

```javascript
const { bulkCuttlyShortener } = require('bulk-cuttly-shortener');
```

### Shortening Links

Here is a complete example showing how to use the package:

```javascript
const { bulkCuttlyShortener } = require('bulk-cuttly-shortener');

// Replace with your CUTTLY tokens
const tokens = [
  'YOUR_CUTTLY_TOKEN_1', 
  'YOUR_CUTTLY_TOKEN_2'
];

// Replace with the long URLs you want to shorten
const links = [
  'https://example.com',
  'https://another-example.com'
];

(async () => {
  try {
    const results = await bulkCuttlyShortener(tokens, links);

    // Filter out results with errors
    const successful = results.filter(result => !result.error);
    const failedTokens = results
      .filter(result => result.error)
      .map(result => result.token);

    console.log('Shortened links:', successful);
    console.log('Failed tokens:', [...new Set(failedTokens)]);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

## Function Details

### `bulkCuttlyShortener(tokens, links)`

#### Parameters:
- **tokens** (Array of Strings): An array of CUTTLY API tokens. Ensure tokens are valid and have permissions to shorten URLs.
- **links** (Array of Strings): An array of long URLs that you want to shorten.

#### Returns:
A promise that resolves with an array of results. Each result object includes:
- **token**: The CUTTLY token used.
- **link**: The original long URL.
- **short_url**: The shortened URL if successful.
- **error**: An error message if there was a failure.

#### Error Handling
The package will return results with errors if:
- A CUTTLY token is invalid or exceeds its rate limit.
- There are issues with the CUTTLY API request.

The example above demonstrates how to filter results and identify tokens that failed.

## Contributing

If you find any issues or have suggestions for improvements, feel free to contribute by creating an issue or submitting a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
