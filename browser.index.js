var data = {
	"0": 246,
	"1": 104,
	"2": 264,
	"3": 401,
	"4": 221,
	"5": 269,
	"6": 273,
	"7": 210,
	"8": 352,
	"9": 290,
	"h": 196,
	"R": 217,
	"O": 225,
	"F": 182,
	"g": 326,
	"L": 133,
	"X": 166,
	"y": 132,
	"T": 154,
	"o": 234,
	"m": 379,
	"v": 112,
	"Q": 335,
	"r": 153,
	"u": 190,
	"S": 315,
	"H": 200,
	"E": 233,
	"x": 167,
	"U": 239,
	"I": 103,
	"V": 135,
	"Z": 192,
	"q": 261,
	"t": 175,
	"d": 236,
	"j": 214,
	"w": 208,
	"n": 229,
	"K": 176,
	"i": 140,
	"s": 244,
	"G": 338,
	"P": 203,
	"z": 176,
	"D": 207,
	"c": 259,
	"N": 166,
	"k": 170,
	"l": 103,
	"p": 253,
	"M": 237,
	"e": 258,
	"W": 240,
	"B": 315,
	"b": 247,
	"Y": 117,
	"f": 228,
	"A": 190,
	"C": 229,
	"a": 241,
	"J": 167
}

var text = Object.keys(data)
var lengths = Object.values(data)

function solve(svg) {
	if(typeof svg != "string") throw new Error("SVG must be type `string`")
	svg = svg.replace(/\\"/g, "\"")
		
	var texts = svg.match(/(?<=d=").*?(?=")/g)
	
	texts = texts.sort(function(x, y){
		return parseInt(x.split(" ")[0].replace("M", "")) - parseInt(y.split(" ")[0].replace("M", ""))
	})
	.map(x => x.split(" ").length)
	.filter(x => x > 10)
	
	var answers = []
	
	for(let i of texts){
		var options = []
		var currentIndex = 0
		while(options.length != lengths.filter(x => x == i).length){
			var index = lengths.indexOf(i, currentIndex)
			options.push(text[index])
			currentIndex = index + 1;
		}
		answers.push(options)
	}
	
	var finalAnswers = []
	
	var totalAnswers = generateCombinations(answers).map(x => x.join(""))
	
	return totalAnswers
}

window.solve = solve

//New stuff learnt from chatGPT
function generateCombinations(arr) {
  let result = [];
  
  function recurse(index, current) {
    if (index === arr.length) {
      result.push(current);
      return;
    }
    
    for (let i = 0; i < arr[index].length; i++) {
      recurse(index + 1, current.concat(arr[index][i]));
    }
  }
  
  recurse(0, []);
  
  return result;
}