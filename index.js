const data  = require("./data.json")

var text = Object.keys(data)
var lengths = Object.values(data)

module.exports = function solve(svg) {
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