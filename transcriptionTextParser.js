let str = `Patient presents today with several issues. Number one BMI has increased by 10% since their
last visit. Number next patient reports experiencing dizziness several times in the last two
weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks.`

function transcriptionTextParser(str) {
  // Input: Transcription text
  // Output: Transformed text

  // edge case: if input is not a string return 'Input is not a string'
  if (typeof str !== 'string') return 'Input is not a string!';

  // edge case: if string is empty return empty string
  if (!str.length) return '';

  // create an obj to store all possible numbers
  const numberObj = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  };
  
  // initialize a variable to store the count
  let count = 0;
  
  // split the string by each sentence
  let strArr = str.split('. ');
  
  // iterate through the new array
  for (let i = 0; i < strArr.length; i += 1) {
    // check if current sentence starts with the word 'Number'
    if (strArr[i].startsWith('Number')) {
      
      	// split the current sentence
        let splitSentence = strArr[i].split(' ');
      
      	// remove 'Number' from the sentence
      	splitSentence.shift();
	
      	// if word next to 'Number' is a number parse and change it to a number
      	if (numberObj[splitSentence[0]]) {
          // grab the corresponding number from the numberObj
          let number = numberObj[splitSentence[0]];
          // change the word to Number
          splitSentence[0] = `${number}.`
          
          // set count to be current number
          count = number;
        // if the word next to 'Number' is next; increment count and change next to number
        } else {
          // increment count
          count += 1;
          // set the word 'next' to be current count 
          splitSentence[0] = `${count}.`;
        }
      // capitalize first letter of next word
      splitSentence[1] = capitalizeFirstLetter(splitSentence[1]);
      
      // set current sentence in original arr to be updated sentence
      strArr[i] = splitSentence.join(' ');
    } 
  }
  
  // join all the sentences together with a period and a line break
  return strArr.join(". \n");
}

// capitalize first letter in a word
function capitalizeFirstLetter(word) {
  // Input: string
  // Output: string with first character capitalized
  
  // grab the first letter, and set to uppercase; concat with rest of word
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Original text
console.log(transcriptionTextParser(str))

// Other test cases:
// Solution should work if number starts off from 9 and increments
console.log(transcriptionTextParser(`Patient presents today with several issues. Number nine BMI has increased by 10% since their
last visit. Number next patient reports experiencing dizziness several times in the last two
weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks.`));

// Solution should work if number starts off from one, next, next, and then four, next
console.log(transcriptionTextParser(`Patient presents today with several issues. Number one BMI has increased by 10% since their
last visit. Number next patient reports experiencing dizziness several times in the last two
weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks. Number four hello. Number next hi`));

// Should check if input is a string
console.log(transcriptionTextParser(5));

// Should return empty string if input is empty
console.log(transcriptionTextParser(''));

