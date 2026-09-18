/**
 * The Real Estate IQ quiz. Every scenario is one Candace has actually
 * handled, drawn from her eleven case studies, and every explanation is
 * in her voice. Nobody fails: each result lands on the same next step,
 * which is a conversation with her. Modeled on the quizzes at
 * yournextstepteam.com and buddybuck.com (Brett, 2026-09-18), both read
 * from their source: a path choice, scenario questions with a short
 * explanation after each answer, a result tier, and contact capture.
 * Here the capture comes at the end, because Brett wants the quiz to
 * end by collecting details, and it posts to the same /api/contact as
 * the form.
 *
 * Fair housing: no question rates a school or describes who a home is
 * for. The one school question is about verifying zoning by address.
 */
export type Path = 'buying' | 'selling'

export type Question = {
  scenario: string
  choices: { text: string; correct?: boolean }[]
  explanation: string
}

export const sellerQuestions: Question[] = [
  {
    scenario:
      'Your home sat 96 days with another agent, took two price cuts, and expired unsold. You relist with a new agent. What is the smart first move?',
    choices: [
      { text: 'Cut the price hard to shock the market into paying attention.' },
      { text: 'Reprice once to where the closed sales actually are, back it with real exposure, then hold the number.', correct: true },
      { text: 'Relist at the old price. The last agent was the problem.' },
      { text: 'Take the first offer that shows up. Anything is better than silence.' },
    ],
    explanation:
      'A listing that did not sell is usually overpriced by a little, marketed poorly, or unlucky in timing. I repriced a south Charlotte townhome once, to $415,000, held the number when a lower offer came in, and closed at full asking in 20 days. Cutting again teaches buyers to wait you out.',
  },
  {
    scenario:
      'You go under contract at $293,500 with multiple offers. The appraisal comes in at $284,900. You submit your own comparable sales and the appraiser will not move. Now what?',
    choices: [
      { text: 'Pull the listing and relist. A new buyer will bring a new appraisal.' },
      { text: 'Refuse to budge. The buyer agreed to $293,500.' },
      { text: 'Do the math on carrying costs and risk against the $8,600 gap, and usually meet the appraisal and close.', correct: true },
      { text: 'Demand a second appraisal from the same lender.' },
    ],
    explanation:
      'Appraisers rarely move once they have landed on a number. On a downtown Rock Hill bungalow, the sellers had bought for $170,000 six years earlier. Chasing $8,600 meant weeks of carrying costs and no guarantee. They closed at $284,900 with nearly $115,000 in gain. Sometimes the smartest move looks like leaving money behind.',
  },
  {
    scenario:
      'Every room in your house is a different color, the half bath is unfinished, and the backyard pool has a small, tired deck. It sat 39 days at $255,000 with no offers. What works?',
    choices: [
      { text: 'Drop the price so buyers can do the math on the work themselves.' },
      { text: 'Do the work that lets a buyer see the finished picture, then relist higher.', correct: true },
      { text: 'Leave it as-is and wait for a flipper.' },
      { text: 'Add an open house every weekend.' },
    ],
    explanation:
      'Most buyers cannot see past what is in front of them. A discount does not fix that. We repainted neutral, finished the half bath, refreshed the kitchen and built a two tiered deck around that pool. Relisted at $290,000, $35,000 higher, and under contract in two days at full price.',
  },
  {
    scenario:
      'Your mid-century ranch has a newer roof, newer HVAC and a granite kitchen, and two bathrooms with original 1960s pink tile and wood paneling. How do you price it?',
    choices: [
      { text: 'Price for the updates and hope buyers overlook the bathrooms.' },
      { text: 'Price honestly for the weakest rooms, so the updates read as a bonus and the buyers compete.', correct: true },
      { text: 'Gut the bathrooms first, whatever it costs.' },
      { text: 'List high and see what happens.' },
    ],
    explanation:
      'A house priced to account honestly for its weakest features draws a different buyer than one priced to defend its strengths. I priced that ranch at $245,000 because of the bathrooms. Multiple offers, three days, closed at $249,936, above asking.',
  },
  {
    scenario:
      'You have outgrown a small single level townhome that needs updates, and you have no budget or time for repairs before listing. What is the right call?',
    choices: [
      { text: 'Borrow to renovate first. Updated homes always sell for more.' },
      { text: 'Price it honestly as-is and lean on what is scarce about it.', correct: true },
      { text: 'Rent it out instead and buy the next one.' },
      { text: 'List it high and let buyers negotiate down.' },
    ],
    explanation:
      'Single level townhomes rarely come on the market here. Scarcity is worth more than people think. We listed one as-is at $220,000 with no staging and no repairs, and it sold in five days at $210,000. The lesson is knowing what actually makes a property valuable in a specific market.',
  },
  {
    scenario:
      'You are selling under hard circumstances, a divorce or a loss, and your agent recommends repainting a shutter color you love. You say no. What should a good agent do?',
    choices: [
      { text: 'Keep pushing. Maximizing appeal is the job.' },
      { text: 'Let it go. Know which battles are worth having, and get you a strong result anyway.', correct: true },
      { text: 'Refuse the listing.' },
      { text: 'Paint it without telling you.' },
    ],
    explanation:
      'When someone is already giving up so much, the color of their shutters is something they still get to decide. I let it go. We listed at $360,000 and went under contract in 21 days at $359,900. Compassion and a strong outcome are not opposites.',
  },
]

export const buyerQuestions: Question[] = [
  {
    scenario:
      'You are ready to start looking. What comes first?',
    choices: [
      { text: 'Touring homes this weekend so you know what you like.' },
      { text: 'A pre-approval from a lender you trust, and an honest number for what the payment lets you sleep with.', correct: true },
      { text: 'An online estimate of what you can afford.' },
      { text: 'Finding the neighborhood first and figuring out the money later.' },
    ],
    explanation:
      'A pre-approval tells us what is realistic and makes your offer credible. I sold homes through the recession and sat with people who lost them when a job went away. You can stretch a little. You do not get too wild.',
  },
  {
    scenario:
      'You are relocating from out of state. The house you love comes on the market while you are back home and you cannot get inside it. What do you do?',
    choices: [
      { text: 'Wait for the next one. No showing, no deal.' },
      { text: 'Have your agent film a walkthrough, answer every question on video, and order a full set of inspections to stand in for the visit.', correct: true },
      { text: 'Make an offer sight unseen with no inspections so you win.' },
      { text: 'Ask the listing agent to represent you too, to speed things up.' },
    ],
    explanation:
      'A family from upstate New York bought a Waxhaw home they never walked through. I filmed the walkthrough myself, went back for more footage, and we ordered every inspection. Then I checked on the empty house every two weeks until they arrived.',
  },
  {
    scenario:
      'You already negotiated $15,000 off for the original roof and HVAC before the inspection. The inspection report turns up more. What now?',
    choices: [
      { text: 'Nothing. You already negotiated once.' },
      { text: 'Go back to the table a second time. The report is real leverage.', correct: true },
      { text: 'Walk away. Any surprise is a red flag.' },
      { text: 'Ask the seller to throw in the furniture.' },
    ],
    explanation:
      'A lot of buyers treat "we already negotiated once" as the finish line. The inspection gave us real leverage and we used it. That Waxhaw purchase closed at $625,000, $25,000 under the original list.',
  },
  {
    scenario:
      'You are buying from a large corporate seller and the closing deadline is tight. They strongly suggest you use their attorney to streamline things. Do you?',
    choices: [
      { text: 'Yes. It is faster and they do this all the time.' },
      { text: 'No. Use your own attorney, every time.', correct: true },
      { text: 'Only if they discount the closing costs.' },
      { text: 'Skip the attorney and use a notary.' },
    ],
    explanation:
      'On a Mooresville duplex, my buyer’s own attorney is the one who caught a chain-of-title problem on the seller’s side. It pushed closing into January, and it closed clean with every signature accounted for. Independent representation is the only path that protects the client when a deal grows extra legs.',
  },
  {
    scenario:
      'You are comparing a house in Fort Mill with one in south Charlotte. Someone tells you South Carolina is always cheaper. Is it?',
    choices: [
      { text: 'Yes. Lower property tax settles it.' },
      { text: 'No. Run the property tax, the income tax and the vehicle tax for your actual household.', correct: true },
      { text: 'No. North Carolina is always cheaper.' },
      { text: 'It does not matter. Pick the house you like.' },
    ],
    explanation:
      'South Carolina assesses an owner occupied home at 4 percent, which often saves real money against an equivalent Charlotte home. South Carolina also charges an annual property tax on vehicles that North Carolina does not. South Carolina tends to win on the house and North Carolina in the driveway. The answer depends on you.',
  },
  {
    scenario:
      'A listing says Fort Mill in the address. How do you know which school district the house is actually in?',
    choices: [
      { text: 'The mailing address tells you.' },
      { text: 'Run the exact address through the district’s own locator and, in a fast growing district, call to ask.', correct: true },
      { text: 'Ask the seller.' },
      { text: 'Check the subdivision name.' },
    ],
    explanation:
      'A mailing address does not tell you. Some Indian Land addresses say Fort Mill and sit in the Lancaster County district, and the South Carolina side of Lake Wylie is generally in the Clover district. Some campuses have frozen enrollment when full. Verify before you write an offer, never after.',
  },
]

export type Tier = { min: number; title: string; body: string }

export const tiers: Tier[] = [
  {
    min: 0,
    title: 'You are early, and that is the best time to talk.',
    body: 'Most of these are the moments that cost people money because nobody warned them. Every one is a story I have already lived with a client. Let me walk you through yours before you are in it.',
  },
  {
    min: 3,
    title: 'Solid instincts. The ones you missed are the expensive ones.',
    body: 'You would handle the ordinary parts fine. The appraisal gap, the second negotiation and the corporate seller are where a transaction turns, and those are the parts I am for.',
  },
  {
    min: 5,
    title: 'You know this market. Now imagine the other side is just as sharp.',
    body: 'You would do well on your own, right up until the other agent is as prepared as you are. The stories on this site are what it looks like to have that preparation in your corner.',
  },
]
