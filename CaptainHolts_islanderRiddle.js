//During Season 2 Episode 18 of Brooklyn Nine-Nine,
//Captain Holt presents the following riddle:

// “There are 12 men on an island. 11 weigh exactly the same amount, 
// but one of them is slightly lighter or heavier. You must figure out which. 
// The island has no escapes, but there is a see-saw. 
// The exciting catch? You can only use it three times"

export function CaptainHolts_islanderRiddle(proposedAnswer){
 var succesfulltests = 0 
 const totaltests = forEveryPossibleCombination([[slightlyHeavier,slightlyLighter],islanders],
  (weightDifference, uniqueIslander) => {  timesUsedSeesaw = 0;
  resetIslanderWeights()[uniqueIslander] += weightDifference ;
  if(proposedAnswer({islanders, seesaw})===uniqueIslander ) succesfulltests++
 })

 console.log(succesfulltests === totaltests?
 'The riddle was solved for all possible scenarios!':
 'This answer did not solve the riddle for all possible scenarios')

 return succesfulltests === totaltests
}


//Islanders
export const islanders = Array.from(Array(12).keys());
const islanderWeights = {}
let standardWeight = 5
let slightlyHeavier = 1;
let slightlyLighter = -1;
function resetIslanderWeights(){
 islanders.forEach((islander) => islanderWeights[islander] = standardWeight)
 return islanderWeights
}


//Seesaw
var timesUsedSeesaw = 0 //reset at start of each test
export function seesaw(left, right){
 if (timesUsedSeesaw === 3) throw new Error("You used the seesaw too many times")
 // returns wether the left side went up, down, or stayed even
 timesUsedSeesaw++;
 let result = left.reduce((a,b) => a + islanderWeights[b], 0) - right.reduce((a,b) => a + islanderWeights[b], 0)
 if (result === 0) return "balanced";
 if (result > 0) return "left";
 if (result < 0) return "right";
}


// overly fancy function I felt like writing
function forEveryPossibleCombination(arrays, cb){
 let timesRun = 0
 let runCB = (...args) => {  timesRun++ ;  cb(...args) }

 function nestedForEach(arrays,args=[]){
  let arr = arrays.pop()
  arr.forEach((arg) => {
   arrays.length === 0? runCB(...args, arg): 
   nestedForEach([...arrays], [...args, arg])
  })
 }
 nestedForEach(arrays.reverse())
 return timesRun
}

