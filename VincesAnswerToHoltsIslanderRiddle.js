// this document contains spoilers
































































export function answerToHoltsIslanderRiddle({islanders, seesaw}){

 let a = islanders.slice(0, 4)
 let b = islanders.slice(4, 8)
 let firstRemnant = islanders.slice(8, 12)
 // 4,4,4
 // 4 is the maximum remnant size that can be thoroughly analyzed with 2 remaining seesaw uses

 let firstMeasurement = seesaw(a, b)

 if(firstMeasurement === "balanced"){
  // first seesaw was even, the unique islander must be in the remnant
  let [onlyUnmeasuredIslander,...c ] = firstRemnant
  let known = [...a,...b]

  let secondMeasurement = seesaw(c, known.slice(-3))

  if(secondMeasurement === "balanced"){
   return onlyUnmeasuredIslander
   // all 11 other islanders weight the same, third measurement is unnecesary, it's the remnant
  }else{
   return measure2Islanders_wKnownWeightDifference_return3rdIfEven(c, secondMeasurement)
   // we know wether the unique islander is heavier or lighter, because he was on the left side of the seesaw during the second measurement
  }
 }else{
   let known = firstRemnant
   let [a1,...a2s] = a
   let b1s = b.slice(0,2)
   let b2s = b.slice(2,4)
   let remnant2 = a2s

   // given eight remaining suspects and the possibilty to determine the heaviest/lightest of any group of 3 with one measurement, 
   // (if the weight difference is known to be +or-)
   // we can guarantee the unique islander by making sure all 3 possible seesaw outcomes (lean left,lean right,balance ) leave 3 or less suspects unelimated
   // this can be done since 8 can be split into groups 2, 3, 3
   // this can be achieved by splitting the group like so:

   let secondMeasurement = seesaw([known.shift(),...b1s], [...b2s, a1]) //using 1 islander known to be standard weight, to even the scale


   if(secondMeasurement === "balanced"){ // if the wieght is even, the unique islander must be in the remnant
    // we look for the lightest or heaviest islander, based on wether group a went up or down in the first measuremnt
    return measure2Islanders_wKnownWeightDifference_return3rdIfEven(remnant2, firstMeasurement) 
   }
   if(secondMeasurement === firstMeasurement){
    // if the second measurement is the same as the first, the unique islander must be in the group that did not change sides
    return measure2Islanders_wKnownWeightDifference_return3rdIfEven([...b2s], opposite(firstMeasurement)) 
   }
   if(secondMeasurement === opposite(firstMeasurement)){ 
    // if the second measurement is the opposite of the first, the unique islander must be in the group that changed sides
    // if the a1 is unique has the opposite weight difference to if b1, but a1 will not be measured here, only returned by process of elimination if b1s are even
    return measure2Islanders_wKnownWeightDifference_return3rdIfEven([...b1s, a1], opposite(firstMeasurement)) 
   }
 }


 function measure2Islanders_wKnownWeightDifference_return3rdIfEven(arrayOf3, weightdifference){
  // a single seesaw measurement can determine the heaviest or lightest of 3 suspects if we know 1 of them is unique
  let [dude,man,guy] = arrayOf3
  let thirdMeasurement = seesaw([dude], [man])
  if(thirdMeasurement === weightdifference)           return dude
  if(thirdMeasurement === opposite(weightdifference)) return man
  if(thirdMeasurement === "balanced")                 return guy
 }

}


function opposite (direction){
 if(direction === 'left') return 'right'
 if(direction === 'right') return 'left'
 return 'balance'
}



