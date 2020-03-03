/* eslint-disable */

// NOTE: alot of this is my previous code from my translator for typing; I wanted to do more with, but oh... oh my god this project did not work with me.
//Skip down to the bottom for the AJAX code

// Huge JSON object containing all of the Japanese Hirgana and Katakana
const jsonAlphabet = '{"vowels":{"vChars":["a:","i:","u:","e:","o:"],"hiraVowels":["あ","い","う","え","お"],"kataVowels":["ア","イ","ウ","エ","オ"]},"k":{"vChars":["ka:","ki:","ku:","ke:","ko:"],"yChars":["kya:","kyu:","kyo:"],"hiraVowels":["か","き","く","け","こ"],"hiraYs":["きゃ","きゅ","きょ"],"kataVowels":["カ","キ","ク","ケ","コ"],"kataYs":["キャ","キュ","キョ"]},"g":{"vChars":["ga:","gi:","gu:","ge:","go:"],"yChars":["gya:","gyu:","gyo:"],"hiraVowels":["が","ぎ","ぐ","げ","ご"],"hiraYs":["ぎゃ","ぎゅ","ぎょ"],"kataVowels":["ガ","ギ","グ","ゲ","ゴ"],"kataYs":["ギャ","ギュ","ギョ"]},"s":{"vChars":["sa:","si, shi:","su:","se:","so:"],"yChars":["sya, sha, shya:","syu, shu, shyu:","syo, sho, shyo:"],"hiraVowels":["さ","し","す","せ","そ"],"hiraYs":["しゃ","しゅ","しょ"],"kataVowels":["サ","シ","ス","セ","ソ"],"kataYs":["シャ","シュ","ショ"]},"z":{"vChars":["za:","zi, ji:","zu:","ze:","zo:"],"yChars":["zya, ja, jya:","zyu, ju, jyu:","zyo, jo, jyo:"],"hiraVowels":["ざ","じ","ず","ぜ","ぞ"],"hiraYs":["じゃ","じゅ","じょ"],"kataVowels":["ザ","ジ","ズ","ゼ","ゾ"],"kataYs":["ジャ","ジュ","ジョ"]},"t":{"vChars":["ta:","ti, chi:","tu, tsu:","te:","to:"],"yChars":["tya, cha, chya:","tyu, chu, chyu:","tyo, cho, chyo:"],"hiraVowels":["た","ち","つ","て","と"],"hiraYs":["ちゃ","ちゅ","ちょ"],"kataVowels":["タ","チ","ツ","テ","ト"],"kataYs":["チャ","チュ","チョ"]},"d":{"vChars":["da:","di:","du:","de:","do:"],"yChars":["dya, dza, ja, jya:","dyu, dzu, ju, jyu:","dyo, dzo, jo, jyo:"],"hiraVowels":["だ","ぢ","づ","で","ど"],"hiraYs":["ぢゃ","ぢゅ","ぢょ"],"kataVowels":["ダ","ヂ","ヅ","デ","ド"],"kataYs":["ヂャ","ヂュ","ヂョ"]},"n":{"vChars":["na:","ni:","nu:","ne:","no:"],"yChars":["nya:","nyu:","nyo:"],"nChar":"n:","hiraVowels":["な","に","ぬ","ね","の"],"hiraYs":["にゃ","にゅ","にょ"],"hiraN":"ん","kataVowels":["ナ","ニ","ヌ","ネ","ノ"],"kataYs":["ニャ","ニュ","ニョ"],"kataN":"ン"},"h":{"vChars":["ha:","hi:","hu, fu:","he:","ho:"],"yChars":["hya:","hyu:","hyo:"],"hiraVowels":["は","ひ","ふ","へ","ほ"],"hiraYs":["ひゃ","ひゅ","ひょ"],"kataVowels":["ハ","ヒ","フ","ヘ","ホ"],"kataYs":["ヒャ","ヒュ","ヒョ"]},"b":{"vChars":["ba:","bi:","bu:","be:","bo:"],"yChars":["bya:","byu:","byo:"],"hiraVowels":["ば","び","ぶ","べ","ぼ"],"hiraYs":["びゃ","びゅ","びょ"],"kataVowels":["バ","ビ","ブ","ベ","ボ"],"kataYs":["ビャ","ビュ","ビョ"]},"p":{"vChars":["pa:","pi:","pu:","pe:","po:"],"yChars":["pya:","pyu:","pyo:"],"hiraVowels":["ぱ","ぴ","ぷ","ぺ","ぽ"],"hiraYs":["ぴゃ","ぴゅ","ぴょ"],"kataVowels":["パ","ピ","プ","ペ","ポ"],"kataYs":["ピャ","ピュ","ピョ"]},"m":{"vChars":["ma:","mi:","mu:","me:","mo:"],"yChars":["mya:","myu:","myo:"],"hiraVowels":["ま","み","む","め","も"],"hiraYs":["みゃ","みゅ","みょ"],"kataVowels":["マ","ミ","ム","メ","モ"],"kataYs":["ミャ","ミュ","ミョ"]},"y":{"vChars":["ya:","yu:","yo:"],"hiraYs":["や","ゆ","よ"],"kataYs":["ヤ","ユ","ヨ"]},"r":{"vChars":["ra:","ri:","ru:","re:","ro:"],"yChars":["rya:","ryu:","ryo:"],"hiraVowels":["ら","り","る","れ","ろ"],"hiraYs":["りゃ","りゅ","りょ"],"kataVowels":["ラ","リ","ル","レ","ロ"],"kataYs":["リャ","リュ","リョ"]},"w":{"vChars":["wa:","wo:"],"hiraVowels":["わ","を"],"kataVowels":["ワ","ヲ"]},"special":{"vChars":["a, A:","i, I:","u, U:","e, E:","o, O:"],"kataVowels":["ァ","ィ","ゥ","ェ","ォ"],"kataV":"ヴ","vChar":"V:"},"tsu":{"hiraTsu":"っ","kataTsu":"ッ"},"punctuation":["。","、","ー","「","」","ゝ","ゞ","ヽ","ヾ","々","〜"]}';
const alphabet = JSON.parse(jsonAlphabet);

// Dictionary used for printing vowel characters
const vowelDictionary = {
  a: 0,
  i: 1,
  u: 2,
  e: 3,
  o: 4,
};

// Dictionary used for printing y characters
const yDictionary = {
  a: 0,
  u: 1,
  o: 2,
};

// Dictionary used directing the special characters to the desired alphabet
const specialDictionary = {
  j: 'z',
  c: 't',
  f: 'h',
  w: 'w',
  y: 'y',
  l: 'r',
  _: 'special',
};

// Dictionary used for printing punctuation characters
const punctuationDictionary = {
  '.': 0,
  ',': 1,
  '-': 2,
  '<': 3,
  '[': 3,
  '{': 3,
  '>': 4,
  ']': 4,
  '}': 4,
  "'": 5,
  '"': 6,
  ';': 7,
  ':': 8,
  '`': 9,
  '~': 10,
};

// Array used for checking if a character should be made into a tsu
// For example, the word kka would be 'small-tsu' 'ka'
const tsuList = ['k', 's', 't', 'p'];

const handler = new Vue(
  {
    el: '#page',
    data:
{
// ########### NEW SERVER VARIABLES ###########
  username: '', //Variables for password and username
  password: '',
  timeX: '', //Variables for getting the schedule's times
  timeY: '',
  loggedIn: false, // variable used for seeing if the user is logged in or nor.
  status: "Here's a default schedule!", // Variable used for displaying the current state of the app
  numInput: '', //Get the number searched
  numOutput: '', //Output it's translations
  dateOutput: '', //Output for date translations
  loginStatus: "Please Log-in to use my API!", //Used for showing the status of the login
  schedule: [{startTime: 1400, endTime: 1515, time: "2:00 PM - 3:15 PM", entry: "ウェブ・デブ"},
  {startTime: 1700, endTime: 1800, time: "5:00 PM - 6:00 PM", entry: "たべます"}], // Array for holding the current schedule

  // ########### TYPING VARIABLERS ###########
  placeholder: 'Type here to translate!', // Placeholder text for the textbox
  message: '', // Variable used for the vue-model
  characterArray: '', // Variable used for holding the current character array (Either hiragana or Katakana)
  arrayName: '', // Variable used for holding the current alpahbet array's name (EX: k, s, g, z)
  textbox: '', // Variable used for holding the direct HTML reference of the textbox being used; Crucial for when typing at a point before the end of the string
  state: 1, // Variable used for controlling the case checking state
  stateIndex: 0, // Index used for getting specific character array in the
  // overall alphabet array; EX: if index == 1, the character array is K
  pos: 0, // Value containing input field position
  tmpPos: 0, // Temp value used for comparing position
  defaultCase: '',
},

    methods:
        {
          // Called whenever the select's option is changed.
          // The alphabet being typed in is altered whenver the select's option is changed, so this is crucial
          clearText() {
            this.message = '';
          },

          // Handles the textbox's input; Checks where the input is in the textbox, and sets the alphabet, then begins the translation chain
          inputHandler(e) {
            this.pos = e.target.selectionStart; // Gets the current position of the input field

            if (this.tmpPos == this.pos || this.tmpPos > this.pos || this.tmpPos + 1 < this.pos) // Checks to see if the position has moved too far from where they last typed
            {
              this.state = 1; // If they have, reset the state back to 1
            }
            this.tmpPos = this.pos; // Sets reference value of where they last typed

            // If the input was not at the end of the string...
            if (this.pos != this.message.length) {
              // Check the farthest case away (four characters), and check to see if the character correlates any valid Japanese characters
              for (let i = 4; i >= 1; i--) {
                const tmp = this.message.charAt(this.pos - i); // Finds the character last typed in the text field
                if (alphabet[tmp] !== undefined || specialDictionary[tmp] !== undefined) // Checks to see if the character exists in either dictionary
                {
                  // It does, so check which dictionary it's in
                  (alphabet[tmp] !== undefined ? this.characterArray = tmp : this.characterArray = specialDictionary[tmp]);
                  // Set the state to the current loop's number. The state-check will handle the rest now.
                  this.state = i;
                  break;
                }
              }
            }

            // Reads in the complete string from the text field
            let char = this.message.charAt(this.pos - 1); // Finds the character last typed in the text field
            // Sets the alphabet to be typed in; Caps for Kunyomi, lower for Onyumi. Kunyomi is for hiragana, and Onyumi is for katakana.
            (char == char.toLowerCase() ? this.arrayName = 'hiraVowels' : this.arrayName = 'kataVowels');
            char = char.toLowerCase(); // Set the character back to lowercase
            this.stateCheck(char); // Check which state we are in.
          },


          // Handles the state variable. The state is essentially the length of the input the user is typing.
          // EX: For the character "ka", it would go from case one for 'k', then to case 2 for 'a', and then print the character for 'ka'
          // So for the character 'kya', it would need to go to state 3 to be printed.
          // Two special characters, 'chi' and 'shi' could be spelt "chya" or "shya" for their y values, so the most amount of cases would be 4
          // Parameters: user keystroke input
          stateCheck(input) {
            switch (this.state) {
              case 1:
              {
                this.firstCase(input);
                break;
              }
              case 2:
              {
                this.secondCase(input);
                break;
              }
              case 3:
              {
                this.thirdCase(input);
                break;
              }
              case 4:
              {
                this.fourthCase(input);
                break;
              }
            }
          },


          // Handles base inputs. At the start of every valid input chain, checks to see if the character has any japanese characters related to it.
          // Parameters: user keystroke input
          firstCase(input) {
            if (vowelDictionary[input] !== undefined) // If the user tpyed a vowel, check to see which vowel
            {
              this.characterArray = 'vowels';
              this.printCharacter(this.setCharacter(vowelDictionary[input]), 1);
            }
            if (input == 'v') {
              this.printCharacter(alphabet.special.kataV, this.state);
            } else if (alphabet[input] !== undefined) // If the user typed a letter, check which letter to set the stateIndex to it's array position
            {
              if (input == 'n') // n is a special case; it has both a single character, a vowel array, and a y array.
              {
                this.setArray('hiraN', 'kataN');
                this.printCharacter(alphabet[input][this.arrayName], this.state);
              }

              this.characterArray = input; // Set the array's pointer to be to the input just entered
              this.state = 2; // and set the state to 2 so we move onto the second case
            } else if (specialDictionary[input] !== undefined) {
              this.characterArray = specialDictionary[input]; // Set the array's pointer to be to the input just entered
              this.state = 2;
            } else if (punctuationDictionary[input] !== undefined) {
              this.printCharacter(alphabet.punctuation[punctuationDictionary[input]], this.state);
            } else {
              this.state = 1;
            }
          },

          // Handles second case inputs (IE, If the input will be 2 characters long).
          // Parameters: user keystroke input
          secondCase(input) {
            const preChar = this.message.charAt(this.pos - 2).toLowerCase(); // Gets the character right before the current position

            // If the character is a tsu, (so for example, kk was entered)...
            if (tsuList.includes(preChar) && preChar == input) {
              this.setArray('hiraTsu', 'kataTsu'); // Set the array to tsu
              if (this.arrayName == 'kataTsu') input = input.toUpperCase(); // set the character after the tsu to the appropriate typing.
              this.printCharacter(input, 1, true); // print the character
            }

            // Check the previous character behind the input
            else if (specialDictionary[preChar] !== undefined && preChar != 'l') {
              switch (preChar) {
                // These c, f, and j are special characters, so they need to be handled uniquely.
                case 'c':
                {
                  // If the next input after the c is h, go onto the next step. if not, reset.
                  (input == 'h' ? this.state = 3 : this.resetState(1, input));
                  break;
                }

                case 'f':
                {
                  // Check if the input is u
                  this.uCheck(input, 2);
                  break;
                }

                case 'j':
                {
                  // Checks if the input is i, then go and check if the input is a y-vowel
                  this.iCheck(input, 2);
                  break;
                }

                case 'w':
                {
                  if (input == 'a' || input == 'o') // If the user typed a y-character vowel, check to see which vowel
                  {
                    let num;
                    (input == 'a' ? num = 0 : num = 1);
                    this.printCharacter(this.setCharacter(num), 1);
                  } else // The user entered no valid inputs; return to the first case.
                  {
                    this.resetState(1, input);
                  }
                  break;
                }

                case 'y':
                {
                  // Check if the input is a y-vowel
                  this.yCheck(input, 1);
                  break;
                }

                case '_':
                {
                  if (vowelDictionary[input] !== undefined) // If the user tpyed a vowel, check to see which vowel
                  {
                    this.arrayName = 'kataVowels';
                    this.printCharacter(this.setCharacter(vowelDictionary[input]), 1);
                  } else // The user entered no valid inputs; return to the first case.
                  {
                    this.resetState(1, input);
                  }

                  break;
                }
              }
            } else if (vowelDictionary[input] !== undefined) // If the user typed a vowel, check to see which vowel
            {
              this.printCharacter(this.setCharacter(vowelDictionary[input]), 1);
            } else if (this.lastChar('s') || this.lastChar('t') || input == 'y') {
              this.state = 3;
            } else {
              this.resetState(1, input); // Reset the state
            }
          },

          // Handles third case inputs (IE, If the input will be 3 characters long).
          // Mainly handles y-character checks
          // Parameters: user keystroke input
          thirdCase(input) {
            const preChar = this.message.substring(this.pos - 3, this.pos - 1).toLowerCase(); // Gets the last 2 letters inputted
            if (preChar == 'sh' || preChar == 'ch') // Used for the character 'shi' or 'chi'. If last two inputs were 'sh' or 'ch'...
            {
              this.iCheck(input, 2);
            } else if (preChar == 'ts') // Used for character 'tsu'.  If last two inputs were 'ts'
            {
              this.uCheck(input, 2);
            } else {
              this.yCheck(input, 2);
            }
          },


          // Final case; handles only for 'shy_' and 'chy_'. (IE, the input length is 4)
          // Parameters: user keystroke input
          fourthCase(input) {
            this.yCheck(input, 1);
          },


          // Used to 'print' characters to the textfield
          // Parameter: japanese character, the next state num, position buffer (adds to the current textfield position)
          printCharacter(char, posBuffer, tsuCheck = false) {
            const val = this.message; // Reads in textfield value

            if (this.pos == val.length) // If we are at the end of the text field...
            {
              let stringField = val.substring(0, val.length - this.state); // Cut off the last few character inputs
              (!tsuCheck ? stringField += char : stringField += alphabet.tsu[this.arrayName] + char); // Set the current string to the new character
              this.message = stringField; // set the textfield value to the new string
            } else // We are not at the end of the text field
            {
              const stringStart = val.substring(0, this.pos - this.state); // Get the string prior to the current text field position
              let stringField = val.substring(this.pos - this.state, this.pos); // Get the current string at the current text field position
              const stringEnd = val.substring(this.pos, val.length); // Get the string after the current text field position
              if (!tsuCheck) // If the character inputted was not a tsu...
              {
                stringField = char; // just set the stringField to the character being typed
              } else {
                stringField = alphabet.tsu[this.arrayName] + char; // Set the current string to a tsu character
                posBuffer += 1;
              }
              this.message = stringStart + stringField + stringEnd; // Set the textfield to the combination of the strings
              this.textbox.textBox.value = this.message;
              const tmp = this.state; // temp variable for state; state gets modified in the next call
              this.textbox.textBox.setSelectionRange((this.pos - tmp) + posBuffer, (this.pos - tmp) + posBuffer); // Sets the new position to be right after where the new character was added
            }
          },

          // Function used for reverting back to the first case or the second case/
          // Parameters: next-state number, user keystroke input
          resetState(num, input) {
            const preChar = this.message.charAt(this.pos - 2).toLowerCase(); // Gets the character right before the current position

            if (alphabet[preChar] !== undefined) {
              this.characterArray = preChar;
            } else if (vowelDictionary[input] !== undefined) {
              this.characterArray = 'vowels';
            }

            this.state = num; // sets the next case state.
            if (this.state == 1) // If first, go directly to the first case.
            {
              this.firstCase(input);
            } else // If second...
            {
              this.secondCase(input); // go to second case.
            }
          },

          // Used for checking the last characters inputted.
          // returns true or false.
          // Parameters: Last user keystroke input
          lastChar(char) {
            const val = this.message.substring(0, this.pos - 1).toLowerCase(); // Reads in value up to last input and lowercases both the value and the character inputted
            char = char.toLowerCase(); // Character is the last character inputted

            if (val.charAt(val.length - 1) == char) // if the last character of the value string is the same as the last character inputted...
            {
              return true; // return true
            }
            return false; // if not, return false.
          },

          // Checks if the new array should be in hiragana or katakana
          setArray(hiraArray, kataArray) {
            (this.arrayName == 'hiraVowels' ? this.arrayName = hiraArray : this.arrayName = kataArray);
          },

          // Sets the new character to be printed
          setCharacter(charNum) {
            return alphabet[this.characterArray][this.arrayName][charNum];
          },

          // Checks if the character inputted was a 'u'
          uCheck(input, stateIndex) {
            if (input == 'u') {
              this.printCharacter(this.setCharacter(2), 1);
            } else // The user entered no valid inputs; return to the first case.
            {
              this.resetState(stateIndex, input);
            }
          },

          // Checks to see if the character inputted is a valid y-vowel
          yCheck(input, stateIndex) {
            if (yDictionary[input] !== undefined) {
              this.setArray('hiraYs', 'kataYs');
              this.printCharacter(this.setCharacter(yDictionary[input]), 2);
            } else if (input == 'y' && this.state <= 3) {
              this.state++;
            } else {
              this.resetState(stateIndex, input);
            }
          },

          // Checks to see if the character inputted was 'i'. If not, go onto seeing if it was a y-vowel
          iCheck(input, stateIndex) {
            if (input == 'i') {
              this.printCharacter(this.setCharacter(1), 1);
            } else {
              this.yCheck(input, stateIndex);
            }
          },

          //&&&&&&&&&&&&&&&&&&&&&&&&&&& CLIENT SIDE CODE: &&&&&&&&&&&&&&&&&&&&&&&&&&& 
          //SendAjax handls the get methods
          sendAjax(url, destination, flagCheck = false) {
              //Start a new request
            const xhr = new XMLHttpRequest();
            //Open a new get form
            xhr.open('GET', url);
            xhr.setRequestHeader('Accept', 'application/json');
            //Check if the user has logged in
            if (flagCheck) {
              xhr.onload = () => this.handleLogin(xhr, destination);
            } else {
                //Check normal get requests
              xhr.onload = () => this.handleResponse(xhr, destination);
            }
            xhr.send();
          },
        
          //Used for handling the user's log-in
          handleLogin(xhr, destination) {
              //The user has successfully logged in
            if (xhr.status === 200 || xhr.status === 201) {
                //Remove the login section, and set the login flag to true
              document.getElementById(destination).innerHTML = "";
              this.loginStatus = `Logged in as user ${this.username}!`;
              this.loggedIn = true;
              document.body.querySelector("#loginContainer").style.visibility = "visible";
              document.body.querySelector("#loginNav").style.visibility = "visible";
            }
            else
            {
                //They've failed to login
                this.loginStatus = "That is an invalid log-in! Try a new password or username!"
            }
          },
        
          //Handles the responses
          handleResponse(xhr, destination) {
            //Get the response and parse it
            if(xhr.response)
            {
                const response = JSON.parse(xhr.response);
                //The response was for the schedule, so...
                if (destination === 0) {
                    //Clear it
                  this.schedule = [];
                  //Read in the JSON for the schedule
                  const tmp = response.schedule;
                  //Parse it, and set the schedule to it
                  this.schedule = JSON.parse(tmp);
                  this.status = "Updated your Schedule!"
                } else {
                    //The search was either for date or number
                  const results = [];
            
                  //Loop through and push the entries
                  for (const reply of Object.keys(response)) {
                    results.push(`${response[reply]}`);
                  }
            
                  ///Update the models; 1 is for numbers, 2 is for dates
                  if (destination === 1) {
                    this.numOutput = results;
                  } else if (destination === 2) {
                    this.dateOutput = results;
                  }  
              }
            }
            else
            {
              this.status = "You haven't updated anything!"
            }
          },
        
          //Send the posts to the server
          sendPost(pathName, formData, destination, flagCheck = false) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', pathName);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Accept', 'application/json');
        
            //If the flag is true, the user is logging in
            if (flagCheck) {
                //Handle the login
              xhr.onload = () => this.handleLogin(xhr, destination);
            } else {
                //This is a schedule post, so handle it regularly
              xhr.onload = () => this.handleResponse(xhr, destination);
            }
        
            xhr.send(formData);
          },

          //Add users posts a new user; Used for signing up
          addUser() {
            const formData = `username=${this.username}&password=${this.password}`;
            this.sendPost('/addUser', formData, 'LogIn', true);
            this.loginStatus = "Logging in..."
          },
        
          //Get users searches through the current existing users to see if there was a valid login
          getUser() {
            const formData = `/getUsers?username=${this.username}&password=${this.password}`;
            this.sendAjax(formData, 'LogIn', true);
            this.loginStatus = "Logging in..."
          },
        
          //Add schedule does not post the schedule, but rather creates a entry in the schedule
          addSchedule() {
            // Check if the time fields have input
            if (this.timeX && this.timeY && this.message) {
                //They do, so grab them, and get their values
              const timeA = this.getTime(this.timeX);
              const timeB = this.getTime(this.timeY);
        
              //timeA is the starting time, and timeB is the ending
              const startTime = timeA[5];
              const endTime = timeB[5];
              //Flag to see if the new schedule's time was valid
              let valid = true;
        
              //Check to see if the schedule exists (For safety)
              if (this.schedule) {
                  //Check to see if the times actually are coherent; you can't have a schedule that starts at a later time than when it ends
                if (startTime >= endTime) {
                  this.status = 'Invalid time entererd!';
                  valid = false;
                }
        
                //Loop through the schedule and check the times; if one overlaps, it's invalid. Can't do 2 things at once.
                for (let i = 0; i < this.schedule.length; i++) {
                  if (this.schedule[i].startTime <= startTime && this.schedule[i].endTime >= endTime) {
                    this.status = 'That time slot is already taken!';
                    valid = false;
                  } else {
                    this.status = '';
                  }
                }
        
                //There's no invalid entries; create a new entry
                if (valid) {
                  const entry = {
                    startTime,
                    endTime,
                    time: `${timeA[0]}:${timeA[4]} ${timeA[2]} - ${timeB[0]}:${timeB[4]} ${timeB[2]}`,
                    entry: this.message,
                  };
        
                  //Push it onto the schedule, and sort it
                  this.schedule.push(entry);
                  this.schedule.sort((a, b) => a.startTime - b.startTime);
                }
              }
            }
          },
        
          //Get the user's previous schedule
          getSchedule() {
            const formData = `/getSchedule?username=${this.username}`;
            this.sendAjax(formData, 0, false);
            this.status = "Finding your Schedule..."
          },
        
          //Post your current schedule to the server and save it.
          postSchedule() {
            if(this.schedule.length > 0)
            {
              const jsonSchedule = JSON.stringify(this.schedule);
            const formData = `username=${this.username}&schedule=${jsonSchedule}`;
            this.sendPost('/addSchedule', formData, 0, false);
            this.status = "Saving your Schedule..."
            }
            else
            {
              this.status = "Please fill out your schedule before posting it!"
            }
          },
        
          //Takes the time inputs and finds if they are AM or PM
          //Also turns the times from strings into numbers                  
          getTime(time) {
            const [strHour, strMin] = time.split(':');
            hour = parseInt(strHour, 10);
            min = parseInt(strMin, 10);
            const midday = this.getMidday(hour);
            if (hour == 0) hour = 12;
            const scheduleTime = (hour * 100) + min;
            if (hour >= 13) hour -= 12;

            return [hour, min, midday, strHour, strMin, scheduleTime];
          },
        
          //Used for getting the number translations
          getNumber() {
            const formData = `/getNumber?number=${this.numInput}`;
            this.sendAjax(formData, 1, false);
          },
        
          //Used for getting the date
          getDate() {
            const formData = '/getDate';
            this.sendAjax(formData, 2, false);
          },

          //Used for checking if the time is past or before midday
          getMidday(hour) {
            if (hour >= 12) {
              return 'PM';
            }

            return 'AM';
          },

          //Updates 2nd time input after the first is adjusted
          adjustTime() {
            this.timeY = this.timeX;
          },

        //used for sorting the schedule
        sortSchedule(startTime) {
            return function (x, y) {
                return ((x[startTime] === y[startTime]) ? 0 : ((x[startTime] > y[startTime]) ? 1 : -1));
            };
        },

        //Clear the schedule
        deleteSchedule()
        {
            this.schedule = [];
            this.status = "Cleared your Schedule..."
        }
    },
  },
);
