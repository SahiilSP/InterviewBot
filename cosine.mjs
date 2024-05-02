const natural = require('natural');
const TfIdf = natural.TfIdf;
const tokenizer = new natural.WordTokenizer();

// Function to calculate semantic similarity using TF-IDF and cosine similarity

function calculateSimilarity(string1, string2) {
    // Tokenize input strings
    const tokens1 = tokenizer.tokenize(string1);
    const tokens2 = tokenizer.tokenize(string2);

    // Initialize TF-IDF
    const tfidf = new TfIdf();

    // Add documents to TF-IDF model
    tfidf.addDocument(tokens1.join(' ')); // Join tokens into a single document string
    tfidf.addDocument(tokens2.join(' ')); // Join tokens into a single document string

    // Calculate cosine similarity between the TF-IDF vectors
    const vector1 = tfidf.listTerms(0 /* document index */);
    const vector2 = tfidf.listTerms(1 /* document index */);
    const cosineSimilarity = calculateCosineSimilarity(vector1, vector2);

    return cosineSimilarity;
}

// Function to calculate cosine similarity between two TF-IDF vectors (document term weights)
function calculateCosineSimilarity(vector1, vector2) {
    const terms1 = new Set(vector1.map(term => term.term));
    const terms2 = new Set(vector2.map(term => term.term));

    // Create a combined set of unique terms
    const allTerms = new Set([...terms1, ...terms2]);

    // Calculate dot product and magnitudes
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (const term of allTerms) {
        const weight1 = vector1.find(t => t.term === term)?.tfidf || 0;
        const weight2 = vector2.find(t => t.term === term)?.tfidf || 0;

        dotProduct += weight1 * weight2;
        magnitude1 += weight1 ** 2;
        magnitude2 += weight2 ** 2;
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    // Calculate cosine similarity
    const cosineSimilarity = dotProduct / (magnitude1 * magnitude2);

    return cosineSimilarity;
}

export default calculateSimilarity;

// Example usage
// const string1 = "The cat is on the mat";
// const string2 = "There is a cat sitting on the mat";

// const similarityScore = calculateSimilarity(string1, string2);
// console.log("Cosine Similarity Score:", similarityScore);