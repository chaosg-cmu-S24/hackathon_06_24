import { Buffer } from 'buffer';
import axios from 'axios';
const AWS = require("aws-sdk");
// import {} from "dotenv"s

// const { URL } = require("url");
// const crypto = require("crypto");
// const fs = require("node:fs/promises");
// const dotenv = require('dotenv');



// Initialize AWS credentials
export const configueAWS = () => {
    // dotenv.config();
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
        region: "us-east-1",
    });
}

export const signRequest = (method, url, body) => {
    console.log("url  sda", url);
    const endpoint = new URL(url);
    console.log("endpoint")
  const request = new AWS.HttpRequest(endpoint, AWS.config.region);
  request.method = method;
  request.path = endpoint.pathname;
  request.body = JSON.stringify(body);
  request.headers["host"] = endpoint.host;
  request.headers["Content-Type"] = "application/json";
  request.headers["X-Amz-Date"] = new Date()
    .toISOString()
    .replace(/[:-]|\.\d{3}/g, "");
  request.headers["Content-Length"] = Buffer.byteLength(request.body);

  // Sign the request
  const signer = new AWS.Signers.V4(request, "bedrock"); // Replace with the appropriate service name
  signer.addAuthorization(AWS.config.credentials, new Date());

  return request.headers;
};

export const postData = async (content) => {
  const agentId = "N2HUJIGZE2";
  const aliasId = "VJXXXTIMUB";
  const sessionId = "abcdk12";

  const url =
    "https://bedrock-agent-runtime.us-east-1.amazonaws.com/agents/" +
    agentId +
    "/agentAliases/" +
    aliasId +
    "/sessions/" +
    sessionId +
    "/text";
  console.log("url", url);

  const body = {
    inputText: content,
    enableTrace: false,
  };

  try {
    const headers = signRequest("POST", url, body);

    const response = await axios.post(url, body, {
      headers,
      responseType: "arraybuffer",
    });
    const responseData = Buffer.from(response.data, "binary").toString("utf8");
    // writeToFile(responseData);
    // const bytes = extractBytes(responseData);
    const text = await readData(responseData);
    console.log('text', text);
    return text;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  }
};

export const extractBytes = (data) => {
  const regex = /"bytes":"([^"]+)"}/;
  const match = data.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};


// export const writeToFile = async (content) =>{
//     try{
//       await fs.writeFile('test1.txt', content);
//     } catch (err) {
//       console.log(err);
//     }
// }

// export const readFromFile = async () => {
//   try{
//     const data =  await fs.readFile('test1.txt');
//     const text = Buffer.from(data).toString()
//     console.log('text', text);
//     return text
//   } catch (err) {
//     console.log("File read error", err);
//   }
// }

export const readData = async (text) => {
  try{
    // const text = await readFromFile();
    const base64String = extractBytes(text);
    const decoded_bytes = atob(base64String);
    return decoded_bytes;
    // console.log(decoded_bytes);
  } catch (err) {
    console.log('read file err', err);
  }
}

// postData();
// writeToFile('hheyf');
// readFromFile();
// readData();
