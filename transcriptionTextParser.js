let str = `Patient presents today with several issues. Number nine BMI has increased by 10% since their
last visit. Number next patient reports experiencing dizziness several times in the last two
weeks. Number next patient has a persistent cough that hasn’t improved for last 4 weeks.`

function transcriptionTextParser(string) {
  // Input: Transcription text
  // Output: Transformed text
  
  // create an obj to store all possible numbers
  let numberObj = {
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
  let strArr = string.split('. ');
  
  // iterate through the new array
  for (let i = 0; i < strArr.length; i += 1) {
    // check if current sentence starts with the word 'Number'
    if (strArr[i].startsWith('Number')) {
      
      	// split the current sentence
        let splitStr = strArr[i].split(' ');
      
      	// remove 'Number' from the sentence
      	splitStr.shift();
	
      	// if word next to 'Number' is a number parse and change it to a number
      	if (numberObj[splitStr[0]]) {
          // grab the corresponding number from the numberObj
          let number = numberObj[splitStr[0]];
          // change the word to Number
          splitStr[0] = `${number}.`
          
          // set count to be current number
          count = number;
        // if the word next to 'Number' is next; increment count and change next to number
        } else {
          // increment count
          count += 1;
          // set the word 'next' to be current count 
          splitStr[0] = `${count}.`;
        }
      // capitalize first letter of next word
      splitStr[1] = capitalizeFirstLetter(splitStr[1]);
      
      // set current sentence in original arr to be updated sentence
      strArr[i] = splitStr.join(' ');
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

console.log(transcriptionTextParser(str))