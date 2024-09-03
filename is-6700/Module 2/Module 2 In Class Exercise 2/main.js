// a. Import the default me object from the person-data.js file
import myself from "./person-data.js";

// b. Import the friends array and the printFriends function from the person-data.js file
import { friends, printFriends } from "./person-data.js";

// c. Print the myself const to the console
console.log(myself);

// d. Call the printFriends function to print the friends to the console
console.log("Friends:");
printFriends(friends);

// e. Use object destructuring to create two new variables called myFirstName and myLastName
const { myFirstName, myLastName } = myself;
console.log(`My full name is ${myFirstName} ${myLastName}.`);

// f. Create a new variable called oldFriends using array.filter
const oldFriends = friends.filter(
   (friend) => friend.birthDate < myself.myBirthdate
);
console.log("Older friends:", oldFriends);

// g. Use the spread operator to create a new object called myselfWithId
const myselfWithId = { id: Math.random(), ...myself };
console.log("Myself with ID:", myselfWithId);

// h. Use array.map to create a new array called friendsWithIds
const friendsWithIds = friends.map((friend) => ({
   id: Math.random(),
   ...friend,
}));
console.log("Friends with IDs:", friendsWithIds);

// i. Use the spread operator to create a new array called newFriendsWithIds
const newFriendsWithIds = [
   {
      id: Math.random(),
      firstName: "Logan",
      lastName: "Lundell",
      birthDate: new Date(2001, 7, 10),
      major: "Information Systems",
   },
   ...friendsWithIds,
];
console.log("New friends with IDs:", newFriendsWithIds);
