//During Season 2 Episode 18 of Brooklyn Nine-Nine,
//Captain Holt presents the following riddle:

// “There are 12 men on an island. 11 weigh exactly the same amount, 
// but one of them is slightly lighter or heavier. You must figure out which. 
// The island has no escapes, but there is a see-saw. 
// The exciting catch? You can only use it three times"



export const islanders = Array.from({length: 12}, ()=>({weight:5}));
var timesUsedSeesaw = 0 //reset at end of each test
export function seesaw(left, right){
 // returns wether the left side went up, down, or stayed even
 timesUsedSeesaw++;
 let result = left.reduce((a,b) => a + b.weight, 0) - right.reduce((a,b) => a + b.weight, 0)
 if (result === 0) return "balanced";
 if (result > 0) return "left";
 if (result < 0) return "right";
}

export function CaptainHolts_islanderRiddle(proposedAnswer){
 var scoreTracker = 0 
 
 //test all possible scenarios
 const slightlyHeavier = 1;
 const slightlyLighter = -1;
 [slightlyHeavier, slightlyLighter].forEach((possibleSlightDifferenceInWeight) => {
   islanders.forEach((uniqueIslander) => {
 
   //this test runs 24 times to test each possible distribution of a slightly heavier or lighter islander among the group of 12
 
   uniqueIslander.weight += possibleSlightDifferenceInWeight //make islander unique
 
   let success = timesUsedSeesaw<=3 && proposedAnswer({islanders, seesaw})===uniqueIslander //attempt to find him using the seesaw
 
   if(success)scoreTracker++ // log success/failure
   // console.log(success? 'Test Passed' : 'Test Failed')
 
   //reset these for next test
   uniqueIslander.weight -= possibleSlightDifferenceInWeight
   timesUsedSeesaw = 0
  })
 })
 // console.log("score:",scoreTracker, "out of", 24)
 if (scoreTracker === 24){ 
  console.log('The riddle was solved for all possible scenarios!'); return true
 } else {
  console.log('This answer did not solve the riddle for all possible scenarios'); return false
 }
}
