import { apiKey } from "./util";

console.log(apiKey);





let userName = "Test user"
let userMessage = "Hello World!";

userMessage = "New Value";

console.log(userMessage);

console.log(10 + 5);

// const userMessage = "Hello World!";

function greet(userName, message) {
    console.log(userName);
    console.log(message);
}

function createGreeting(userName, message = "Hello!") {
    return "Hi, I am " + userName + "." + message;
}

greet(userName, userMessage);
greet("Max", "Hello!");
createGreeting("Max")

export default (userName, message) => {
    console.log('Hello');
    return userName + message;
}