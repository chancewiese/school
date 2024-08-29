// ? 1. Print your first and last name in double quotes with a line break in the middle.
console.log('"Chance\nWiese"');

// ? 2. Store your first name in a variable in all lower case letters.  Then, use a string function to print the name in all upper case letters
const firstNameLower = "chance";
const firstNameUpper = firstNameLower.toUpperCase();
console.log(firstNameUpper);

// ? 3. Store your your first and last name in separate variables.  Then use string concatenation to put them together (with a space in the middle) and store in a separate variable.
const firstName = "Chance";
const lastName = "Wiese";
const fullName = firstName + " " + lastName;
console.log(fullName);

// ? 4. Use string concatenation to print "Hi, my name is <<Full Name>>" where <<Full Name>> is your full name stored in a variable.
const fullName4 = "Chance Wiese";
console.log(`Hi, my name is ${fullName4}.`);

// ? 5. With your full name stored in a variable, split your first and last name into separate variables.
const fullName5 = "Chance Wiese";
const [firstName5, lastName5] = fullName5.split(" ");
console.log(`First Name: ${firstName5}\nLast Name: ${lastName5}`);

// ? 6. Create a string variable that holds a string with leading/trailing spaces.  Use a string function to trim the spaces and store the result in another variable.
const string6 = " Hello World ";
const string6Trimmed = string6.trim();
console.log(string6Trimmed);

// ? 7. Use a string function to report the number of characters in your full name (not including space).
const fullName7 = "Chance Wiese";
const lettersInName = fullName7.replace(" ", "").length;
console.log(lettersInName);

// ? 8. Use a string function that gives the position of the first letter of your last name in your full name.  For example, in "Jordan Walke" (Creator of React.js), the "W" is in position 7.
const fullName8 = "Chance Wiese";
const spaceIndex = fullName8.indexOf(" ");
const lastNameIndex = spaceIndex + 1;
console.log(lastNameIndex);

// ? 9. Use a string function that reports whether the letter "A" (either upper or lower case) is in a string variable that contains your full name.
const fullName9 = "Chance Wiese";
const hasA = fullName9.toLowerCase().includes("a");
console.log(hasA);

// ? 10. Use a string function that replaces "ASP.NET" with "Node.js" in the following string:  "I am learning ASP.NET"
const aspString = "I am learning ASP.NET";
const nodeString = aspString.replace("ASP.NET", "Node.js");
console.log(nodeString);

// ? 11. Store the value 9.6877 in a variable.  Then use a number function to store the number as a new variable with only two decimal places.
const value11 = 9.6877;
const value11Rounded = parseFloat(value11.toFixed(2));
console.log(value11Rounded);

// ? 12. Write a line of code that shows the remainder of 23 / 7.
console.log(23 % 7);

// ? 13. Use a number function to convert the string "23" into a number and store it in a new variable.
const string23 = "23";
const number23 = parseInt(string23);
console.log(number23);

// ? 14. Use a number function to convert the string "15.23" into a number and store it as a numerical value.
const string1523 = "15.23";
const number1523 = parseFloat(string1523);
console.log(number1523);

// ? 15. Write code that uses one or more a number functions to return a random number between 1 and 10.
console.log(Math.floor(Math.random() * 10) + 1);

// ? 16. Use the Number() function to see if the following values can be converted to numbers:  5, "5", "Test"
console.log(Number(5));
console.log(Number("5"));
console.log(Number("Test"));

// ? 17. Write code that adds 0.1 and 0.2, stores the result in a variable, and prints the variable.  Is the result what you expected?  If not, how can you fix it?
const addition = 0.1 + 0.2;
console.log(addition);
const formattedAddition = addition.toFixed(1);
console.log(parseFloat(formattedAddition));

// ? 18. Create a new variable that stores today's date.  Then, print three lines to the console that reports the month, day, and year separately.
const today = new Date();
console.log(
   `Month: ${today.getMonth()}\nDay: ${today.getDay()}\nYear: ${today.getFullYear()}`
);
// ? 19. Create a new variable that stores your birth date.
const birthDate = new Date("2002-09-25");
console.log(birthDate);

// ? 20. Compute how many days have elapsed since your birth date.
const milisecondsSinceBirthday = today - birthDate;
const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day \\ Had to check this one with ChatGPT
const daysElapsed = Math.floor(milisecondsSinceBirthday / millisecondsPerDay);
console.log(`Days since I was born: ${daysElapsed}`);
