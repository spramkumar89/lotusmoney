/*incomecategoryValues : [{},{},{"Solo App Development":5},{},{}]
expensecategoryValues : [{"Grocery":501},{"Shopping":403},{"Miscellaneous":2},{}]
categoryValues : [{"Grocery":501},{"Shopping":403},{"Miscellaneous":2},{}]*/

let incomecategoryValues = [{},{},{"Solo App Development":5},{},{}];
let expensecategoryValues = [{"Grocery":501},{"Shopping":403},{"Miscellaneous":2},{}];
let categoryValues = [];
incomecategoryValues.forEach((item,index)=>{
	console.log(`Item length ${item.size} and the item value is ${JSON.stringify(item)}`);
	if(Object.keys(item).length !== 0){
		categoryValues.push(item);
	}
});
expensecategoryValues.forEach((item,index)=>{
	if(Object.keys(item).length !== 0){
		categoryValues.push(item);
	}
});
console.log("CategoryValues : " + JSON.stringify(categoryValues));