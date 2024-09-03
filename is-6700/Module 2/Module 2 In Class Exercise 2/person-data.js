// 4. Create a const called me that stores a JavaScript object with information about you
const me = {
   myFirstName: "Chance",
   myLastName: "Wiese",
   myBirthdate: new Date(2002, 9, 25),
   myMajor: "Information Systems",
};

// 5. Create a const called friends that stores a JavaScript array of three objects
const friends = [
   {
      firstName: "Andrew",
      lastName: "McDivitt",
      birthDate: new Date(2001, 7, 6),
      major: "Information Systems",
   },
   {
      firstName: "Noah",
      lastName: "Perkins",
      birthDate: new Date(2003, 1, 30),
      major: "Computer Science",
   },
   {
      firstName: "Jacob",
      lastName: "Nuttall",
      birthDate: new Date(1996, 9, 11),
      major: "Finance",
   },
];

// 6. Create a function called printFriends that prints information about each friend
// Prettier extension made this look funky
function printFriends(friends) {
   friends.forEach((friend) => {
      console.log(
         `${friend.firstName} ${
            friend.lastName
         } was born on ${friend.birthDate.toString()} and is majoring in ${
            friend.major
         }.`
      );
   });
}

// 4. Set the default export of this file to be the me constant
export default me;
// 5 & 6. Export friends and printFriends as non-default exports
export { friends, printFriends };
