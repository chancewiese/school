// import { apiKey } from "./util";

// console.log(apiKey);

// let userName = "Test user"
// let userMessage = "Hello World!";

// userMessage = "New Value";

// console.log(userMessage);

// console.log(10 + 5);

// const userMessage = "Hello World!";

// function greet(userName, message) {
//     console.log(userName);
//     console.log(message);
// }

// function createGreeting(userName, message = "Hello!") {
//     return "Hi, I am " + userName + "." + message;
// }

// greet(userName, userMessage);
// greet("Max", "Hello!");
// createGreeting("Max")

// export default (userName, message) => {
//     console.log('Hello');
//     return userName + message;
// };

// const userName = 'Max';
// const userAge = 34;

// const user = {
//    name: "Max",
//    age: 34,
//    greet() {
//       console.log("Hello");
//       console.log(this.age);
//    },
// };

// console.log(user);
// console.log(user.name);
// console.log(user.age);
// user.greet();

// class User {
//    constructor(name, age) {
//       this.name = name;
//       this.age = age;
//    }
//    greet() {
//       console.log("Hi!");
//    }
// }

// const user1 = new User("Manuel", 35);

// console.log(user1);
// user1.greet();

// const hobbies = ["Sports", "cooking", "Reading"];
// console.log(hobbies[0]);

// hobbies.push("Working");
// console.log(hobbies);

// // const index = hobbies.findIndex((item) => {
// //    return item === "Sports";
// // });

// const index = hobbies.findIndex((item) => item === "Sports");

// console.log(index);

// // const editedHobbies = hobbies.map((item) => item + "!");
// const editedHobbies = hobbies.map((item) => ({ text: item }));
// console.log(editedHobbies);

// const userNameData = ["Max", "Schwarzmuller"];
// const firstName = userNameData[0];
// const lastName = userNameData[1];

// const [firstName, lastName] = ["Max", "Scwarzmuller"];

// console.log(firstName);
// console.log(lastName);

// const user = {
//    name: "Max",
//    age: 34,
// };

// const { name: userName, age } = {
//    name: "Max",
//    age: 34,
// };

// console.log(userName);
// console.log(age);

// const hobbies = ["Sports", "Cooking"];
// const user = {
//    name: "Max",
//    age: 34,
// };

// const newHobbies = ["Reading"];
// const mergedHobbies = [...hobbies, ...newHobbies];
// console.log(mergedHobbies);

// const extendedUser = {
//    isAdmin: true,
//    ...user,
// };

// console.log(extendedUser);

// const password = prompt("Your password");

// if (password === "Hello") {
//    console.log("Hello works");
// } else if (password === "hello") {
//    console.log("hello works");
// } else {
//    console.log("Access not granted.");
// }

// const hobbies = ["Sports", "Cooking"];

// for (const hobby of hobbies) {
//    console.log(hobby);
// }

// const list = document.querySelector("ul");
// list.remove();

// function handleTimeout() {
//    console.log("Timed out!");
// }

// const handleTimeout2 = () => {
//    console.log("Timed out... again!");
// };

// setTimeout(handleTimeout, 2000);
// setTimeout(handleTimeout2, 3000);
// setTimeout(() => {
//    console.log("More timing out...");
// }, 4000);

// function greeter(greetFn) {
//    greetFn();
// }

// greeter(() => console.log("Hi"));

// function init() {
//    function greet() {
//       console.log("Hi!");
//    }
//    greet();
// }

// init();

// let userMessage = "Hello!";
// userMessage = userMessage.concat("!!!");

// const message = "Hello";
// // hobbies = []
// const hobbies = ["Sports", "cooking"];
// hobbies.push("Working");
// console.log(hobbies);
