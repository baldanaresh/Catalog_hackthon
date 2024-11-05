const fs = require('fs');

// Function to convert a number from a given base to decimal
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

// Lagrange interpolation to find the constant term c
function lagrangeInterpolation(points) {
    let c = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0]; // x value
        let yi = points[i][1]; // y value

        let li = 1; // Lagrange basis polynomial
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        c += li * yi;
    }
    return Math.round(c);
}

// Read the JSON input from a file
function readInput(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Main function to process the input and find the constant term for both test cases
function main() {
    const testCases = ['input1.json', 'input2.json']; // Add both input files
    const results = [];

    for (const file of testCases) {
        const input = readInput(file); // Read each input file
        
        const n = input.keys.n;
        const k = input.keys.k;
        const points = [];

        // Iterate over the keys dynamically
        for (let i = 1; i <= n; i++) {
            const key = i.toString(); // Convert to string to match JSON keys
            if (input[key]) { // Check if the key exists
                const base = parseInt(input[key].base);
                const value = input[key].value;
                const decodedValue = convertToDecimal(value, base);
                points.push([i, decodedValue]); // Store as (x, y)
            }
        }

        // Calculate the constant term c using Lagrange interpolation
        const secret = lagrangeInterpolation(points.slice(0, k)); // Use first k points
        results.push(secret);
    }

    // Print the results for both test cases
    console.log(`The constant terms are: ${results.join(', ')}`);
}

// Run the main function
main();