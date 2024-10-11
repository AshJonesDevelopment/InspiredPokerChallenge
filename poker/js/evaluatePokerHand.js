
/**
 * @typedef {Object} Card
 * @property {string} suit - Suit of the card - Either "club", "spade", "diamond" or "heart"
 * @property {number} rank - Number rank of the card - So 1 for Ace, 2 for Two, 3 for Three, and so on, until 10 for Ten, then 11 for Jack, 12 for Queen and 13 for King
 */

/**
 * Given a poker hand of 5 cards, examines the cards and returns a string describing the type of win.
 *
 * @param {Array.<Card>} hand - Array of the card objects that make up the poker hand.
 * @returns {string} - Returns a string for the type of the win detected:
 *		"highcard" - Five cards which do not form any of the combinations below
 *		"pair" - A hand with two cards of equal rank and three cards which are different from these and from each other
 *		"twopair" - A hand with two pairs of different ranks
 *		"threeofakind" - Three cards of the same rank plus two unequal cards
 *		"straight" - Five cards of mixed suits in sequence
 *		"flush" - Five cards of the same suit
 *		"fullhouse" - Three cards of one rank and two cards of another rank
 *		"fourofakind" - Four cards of the same rank and the fifth card can be anything
 *		"straightflush" - Five cards of the same suit in sequence
 *		"royalflush" - A 10, Jack, Queen, King and Ace ranked cards of the same suit
 */
function evaluatePokerHand( hand ) {
	
	const instancesOfRank = [0,0,0,0,0,0,0,0,0,0,0,0,0];	//13 indexes representing rank from A to K. (indexs 0, 10, 11 and 12 are Aces, Jacks, Queens and Kings respectively.)
	let largestSet = 0;	//'Set' referring to a group of cards with the same rank.
	let longestRun = 0;	//'Run' referring to a sequence of cards in ascending order.
	let numberOfSets = 0;
	let isFlush;
	let isStraight;
	let isBroadway;
	let outcome = "";

	//Tallying how often each rank appears.
	for ( let i=0; i<hand.length; ++i ) {
		instancesOfRank[hand[i].rank-1] += 1;
	}

	for ( let j=0; j<instancesOfRank.length; ++j ) {
		if(instancesOfRank[j] > largestSet) {
			largestSet = instancesOfRank[j];
		}

		if(instancesOfRank[j] > 0) {
			numberOfSets++;
		}
	}

	//Evaluating hand based on how often a given rank appears.
	if(largestSet === 4) { //'Four of a Kind'
		outcome = "fourofakind";
	}
	else if(largestSet === 3) { //'Full House' or 'Three of a Kind'
		if(numberOfSets === 2){
			outcome = "fullhouse";
		} else if(numberOfSets === 3) {
			outcome = "threeofakind";
		}
	}
	else if(largestSet === 2) { //'Two Pairs' or 'Pair'
		if(numberOfSets === 3){
			outcome = "twopair";
		} else if(numberOfSets === 4) {
			outcome = "pair";
		}
	}
	
	//Checking for flush
	let firstCardSuit = hand[0].suit;
	isFlush = true;
	for ( let k=1; k<hand.length; ++k ) {
		if(hand[k].suit != firstCardSuit){
			isFlush = false;
			break;
		}
	}

	//Checking for straight
	for ( let l=0; l<instancesOfRank.length; ++l ) {
		if(instancesOfRank[l] > 0) {
			longestRun++;
		}
		else if(longestRun != 5){
			longestRun = 0;
		}
	}

	//if 'broadway' straight
	isBroadway = false;
	if(longestRun === 4 && instancesOfRank[0] > 0) {
		longestRun++;
		isBroadway = true;
	}

	isStraight = (longestRun === 5);

	//set outcome after evaluating flush and straight.
	if(isFlush || isStraight){
		if(isFlush && isStraight){	//Straightflush or royalflush check.
			if(isBroadway){
				outcome = "royalflush"
			}
			else {
				outcome = "straightflush"
			}
		}
		else if (isFlush) {	//Straight or flush check.
			outcome = "flush"
		}
		else {
			outcome = "straight"
		}
	}
	
	return (outcome != "") ? outcome:"highcard";
}

module.exports = evaluatePokerHand;
