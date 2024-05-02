const natural = require('natural');
const request = require('request');
const TfIdf = natural.TfIdf;
const tokenizer = new natural.WordTokenizer();
const fs = require('fs');
const path = require('path');
const os = require('os');
const express = require('express');
const axios = require('axios');
// const path = require('path');
const app = express();
var bp = require('body-parser');
app.use(bp.json());
const cors = require('cors');
app.use(cors());
// app.use(bp.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + '/css'));
const resultSet = [];
var obj = {
    issim: "false",
    semscore: 0,
    qwpm: 0
}
const { google } = require('googleapis');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const BToken = 'Yc3BPuq2MIgn6BgNpxdnTg1xgeDwwCtplU8fhaEPMic.2hGQ2MBubDXzXaeCY3RhjSQneiwrvfGVjKaZ6okCj6g';

const SEntAPI = '7lz1rAAb5gy1pvRjHEa1WA==SRkPqBnLFRlGQyHC';

const TG_API = 'v5wssTGczRyiDMiF';

const GEM_API = 'AIzaSyCkfg36nltrDDGgqcRQtoF0QxEei4mD0Ns';

const TF_API = 'fc99331051msh27f039c54cbacfep10c953jsn8e9aab6216ba'
const TF_HOST = 'thefluentme.p.rapidapi.com'

const CLIENT_ID = '70682255061-0qkjhknk1sdgqjktkluhbsvbn5cfq2t1.apps.googleusercontent.com'
const C_SECRET = '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'
const RED_URI = 'https://developers.google.com/oauthplayground'
const REF_TOKEN = '1//04klxPHcsQWyOCgYIARAAGAQSNwF-L9IrT2v5Q1UsV7tDE7x6ho5AORNfn557jtreaGCZLRN9qWYz5A0mpf_IXp4AV0t5c2zOwOk'

const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    C_SECRET,
    RED_URI,
);
oauth2client.setCredentials({ refresh_token: REF_TOKEN })
const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})
const download_dir = path.join(os.homedir(), '/downloads');
console.log(download_dir);
async function drupload(fp) {
    try {
        const dresp = await drive.files.create({
            requestBody: {
                name: 'ad.mp3',
                mimeType: 'audio/mp3'
            },
            media: {
                mimeType: 'audio/mp3',
                body: fs.createReadStream(fp)
            }
        })
        console.log(dresp.data);
        return dresp.data.id;
    } catch (err) {
        console.log(`Error! ${err}`);
    }
}
// drupload();

async function getlink(fid) {
    try {
        await drive.permissions.create({
            fileId: fid,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            }
        })

        const dres = await drive.files.get({
            fileId: fid,
            fields: 'webViewLink, webContentLink'
        })
        console.log(dres.data);
        return dres.data.webViewLink;
    } catch (error) {
        console.log(error.message);
    }
}
// getlink();
async function postans() {
    const url = 'https://thefluentme.p.rapidapi.com/post';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'fc99331051msh27f039c54cbacfep10c953jsn8e9aab6216ba',
            'X-RapidAPI-Host': 'thefluentme.p.rapidapi.com',
        },
        body: {
            post_language_id: '21',
            post_title: 'firstpost',
            post_content: 'text of the first post',
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        // return result.post_id;
    } catch (error) {
        console.error(error);
    }
}
// postans();

async function getscore(postid, wvl) {
    const url = `https://thefluentme.p.rapidapi.com/score/${postid}?scale=100`;
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': TF_API,
            'X-RapidAPI-Host': TF_HOST
        },
        body: {
            audio_provided: wvl
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}




const answers = ["Computer networks are interconnected systems that enable communication and resource sharing between multiple devices. They facilitate data exchange through various mediums like cables, wireless signals, or optical fibers, allowing users to access remote resources and services.",
    "DBMS is software that manages databases, organizing data into structured formats for efficient storage, retrieval, and manipulation. It provides mechanisms for data integrity, security, and concurrency control, enabling multiple users to access and modify data concurrently while maintaining consistency.",
    "Operating systems serve as the intermediary between hardware and software, managing resources and providing a user-friendly interface. They enable efficient utilization of hardware resources, facilitate program execution, ensure system security, and provide features like multitasking, memory management, and file management.",
    "AI refers to the simulation of human intelligence in machines, enabling them to perform tasks that typically require human intelligence, such as reasoning, learning, and problem-solving. Machine Learning is a subset of AI that focuses on developing algorithms that enable machines to learn from data and improve their performance over time without explicit programming."]

function calculateJaccardSimilarity(str1, str2) {
    // Convert strings to sets of characters
    const set1 = new Set(str1);
    const set2 = new Set(str2);

    // Calculate intersection
    const intersection = new Set([...set1].filter(x => set2.has(x)));

    // Calculate union
    const union = new Set([...set1, ...set2]);

    // Calculate Jaccard similarity coefficient
    const similarity = intersection.size / union.size;

    return similarity;
}

function checkStringSimilarity(str1, str2) {
    const similarityThreshold = 0.5; // Set your threshold as desired
    const similarity = calculateJaccardSimilarity(str1, str2);

    // Check if similarity meets the threshold
    // if (similarity >= similarityThreshold) {
    //     console.log(similarity);
    //     return ["True", similarity]; // Strings are similar
    // } else {
    //     return ["False", similarity]; // Strings are dissimilar
    // }
    return [similarity >= similarityThreshold, similarity]
}

// Example usage

function calculateSimilarity(string1, string2) {
    const thresh = 0.3;
    // Tokenize input strings
    const tokens1 = tokenizer.tokenize(string1);
    const tokens2 = tokenizer.tokenize(string2);
    console.log(tokens1.length);

    // Initialize TF-IDF
    const tfidf = new TfIdf();

    // Add documents to TF-IDF model
    tfidf.addDocument(tokens1.join(' ')); // Join tokens into a single document string
    tfidf.addDocument(tokens2.join(' ')); // Join tokens into a single document string

    // Calculate cosine similarity between the TF-IDF vectors
    const vector1 = tfidf.listTerms(0 /* document index */);
    const vector2 = tfidf.listTerms(1 /* document index */);
    const cosineSimilarity = calculateCosineSimilarity(vector1, vector2).toPrecision(5) * 1.8;


    return [cosineSimilarity < thresh ? "False" : "True", cosineSimilarity, tokens1.length];
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

    return cosineSimilarity || 0;
}

async function gettextsimi(idx, recans) {

    const resp = await fetch("https://api.app.labelf.ai/v2/similarity", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${BToken}`,
            "Content-Type": "application/json",
        },
        // Replace texts with your own texts, max 8 text items in the texts array
        body: JSON.stringify({
            top_n: 2,
            base_texts: { example_id1: QAset[idx].answer1, example_id2: QAset[idx].answer2 },
            compare_to_texts: { example_compare_id1: recans },
        }),
    });
    const data = await resp.json()
    console.log(data);
}
// gettextsimi()

async function getsentiment(recans) {

    // var text = "I'm loving it";
    request.get({
        url: 'https://api.api-ninjas.com/v1/sentiment?text=' + recans,
        headers: {
            'X-Api-Key': SEntAPI
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else console.log(body)
    });
}
// getsentiment();

async function checkGrammarWithTextGears(text) {
    try {
        //   const apiKey = 'v5wssTGczRyiDMiF'; // Replace with your TextGears API key 


        const response = await axios.get('https://api.textgears.com/check.php', {
            params: {
                text,
                key: TG_API,
                // botId: 'YOUR_BOT_ID',  Optional: Specify your bot ID (if applicable)
            },
        });

        const grammarIssues = response.data.errors || [];

        return grammarIssues;
    } catch (error) {
        console.error('Error occurred during grammar check:', error);
        return [];
    }
}
// const textToCheck = "Grammar to check is ok.";
// checkGrammarWithTextGears(textToCheck)
// .then(grammarIssues => {
//     if (grammarIssues.length > 0) {
//         console.log('Grammar issues found:');
//         grammarIssues.forEach(issue => console.log('-', issue));
//     } else {
//         console.log('No grammar issues found.');
//     }
// })
// .catch(error => console.error('Grammar check failed:', error));


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEM_API);
var questions = [];
var QAset = [];

async function getques() {

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const exm = 'this  is an example output: [{"question":"In Operating Systems, what is the role of a page table?","answer1":"A page table is used to translate virtual memory addresses into physical memory addresses.","answer2":"A page table is used to manage the allocation of physical memory to processes."}], give the output in this strict format for all next prompts';
    const exresult = await model.generateContent(exm);
    const prompt = 'give me exactly 10 intermediate level interview questions based on these theory topics [Computer Networks,AI/ML,Operating Systems,DBMS,DSA]. Each question should have 2 different answers of at least 40 words. The output should only contain an array of objects like this [{"question":"answer1":"answer2"}] so I can parse the text into json';

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    const Jobject = JSON.parse(text);
    // console.log(Jobject);
    QAset = Jobject;
    Jobject.map((qset) => {
        questions.push(qset.question);
    })
    
}
getques();

app.get('/getQA',(req, res) => {
    console.log(questions);
    // res.send({ data: questions });
    console.log(QAset);
    res.send(QAset)
    console.log("Questions sent")
    // return questions
})


app.post('/getR', (req, res) => {
    // const fd = req.body;
    // console.log(req.body);
    const receivedString = req.body.string;
    const anstime = req.body.time;
    const aidx = req.body.qidx;
    const user = req.body.user;

    console.log(anstime);
    console.log('Received string from client:', receivedString);
    // res.sendFile(__dirname + '/index.html');
    var string1 = receivedString;
    var string2 = answers[aidx];
    // const jcs = checkStringSimilarity(string1, string2);
    // const areSimilar = calculateSimilarity(string1, string2);
    res.send({ success: true });
    // console.log("Jac Sim:", jcs);
    // console.log("Are the strings similar CosSim?", areSimilar);
    gettextsimi(aidx, string1);
    getsentiment(string1);
    checkGrammarWithTextGears(string1)
        .then(grammarIssues => {
            if (grammarIssues.length > 0) {
                console.log('Grammar issues found:');
                grammarIssues.forEach(issue => console.log('-', issue));
            } else {
                console.log('No grammar issues found.');
            }
        })
        .catch(error => console.error('Grammar check failed:', error));

    const wpm = Math.floor(areSimilar[2] * 60 / (anstime / 1000));
    console.log(wpm, ": words per minute");


    resultSet.push({
        issim: areSimilar[0],
        semscore: areSimilar[1],
        qwpm: wpm
    })
    // res.send({ issame: "output", score: areSimilar[1] });
    // You can process the string here

    // res.send('String received successfully');
});

app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/index.html'); 
    res.send("Hello Server");

})

app.get('/result', (req, res) => {
    res.send(resultSet);
})

app.listen(5000, function () {
    console.log("app listening on port 5000 h");
});






// app.post('/getR', (req, res)=> {
//     console.log("enters the post function.");
//     var a = req.body.data;
//     // var b = req.body.solutionb;
//     console.log(a);
//     // res.sendFile(__dirname + '/index.html');
//     // console.log(b);
//     var string1 = a;
//     var string2 = "my name is Sahil Patil";
//     const areSimilar = checkStringSimilarity(string1, string2);
//     console.log("Are the strings similar?", areSimilar);
//     res.send({result:areSimilar[0],score:similarity[1]});
// })

// TqOXZvnWneNVH9oEHYMiMCHCWyiQITWanOYDJxV3Lew apikey
// 99r1faHR4bCPdtBsLQGhoo0N5Ocla9gGNzX5dpOIYIjHshMM9cbuf5hCkSI3iKxDHiuQGhzP1SaOFC5WkyeREQ apisecret
// cURL
// curl -k -X POST -H "Content-Type: application/x-www-form-urlencoded" -u 'TqOXZvnWneNVH9oEHYMiMCHCWyiQITWanOYDJxV3Lew:99r1faHR4bCPdtBsLQGhoo0N5Ocla9gGNzX5dpOIYIjHshMM9cbuf5hCkSI3iKxDHiuQGhzP1SaOFC5WkyeREQ' -d grant_type=client_credentials https://auth.app.labelf.ai/oauth2/token
// workspace_1205_4750b3e946@apiuser.labelf.ai workspace client