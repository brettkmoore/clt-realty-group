import type { QuestionnaireConfig } from '@/components/Questionnaire'
import { areaNames } from '@/lib/site'

/**
 * The two long questionnaires, built from Candace's own requirements
 * (2026-09-18) and from what Becca Pitts's and Buddy Buck's JotForms
 * ask, read on 2026-09-18. What was left out on purpose: anything about
 * school districts, children or who lives in the household (fair
 * housing), the coffee-order questions, and any question a first
 * conversation answers better than a form.
 */
const TIMELINE_BUY = ['As soon as possible', '30 to 60 days', '3 to 6 months', '7 to 12 months', 'More than a year', 'Just exploring']
const TIMELINE_SELL = ['As soon as possible', 'Within 3 months', '3 to 6 months', '6 to 12 months', 'Just exploring for now']
const PRICE = ['Under $250K', '$250K to $350K', '$350K to $450K', '$450K to $600K', '$600K to $800K', 'Over $800K', 'Not sure yet']
const BEDS = ['1', '2', '3', '4', '5+']
const BATHS = ['1', '1.5', '2', '2.5', '3+']
const SQFT = ['Under 1,000', '1,000 to 1,500', '1,500 to 2,000', '2,000 to 3,000', 'Over 3,000', 'Flexible']
const LOT = ['Under a quarter acre', 'Quarter to half acre', 'Half acre to an acre', 'One to five acres', 'More than five acres', 'No preference']

export const buyersQuestionnaire: QuestionnaireConfig = {
  source: 'buyer-questionnaire',
  role: 'buying',
  eyebrow: 'Buyer questionnaire',
  title: 'Tell me what you are looking for, and I will set up your search.',
  intro: 'About four minutes, mostly taps. I read every answer myself before we talk, so the first conversation starts where it should.',
  thanks: {
    title: 'Got it. I will set up your search and reach out.',
    body: 'Expect a call or a text from me, at a time I know I am free. If you would rather not wait, my cell is below.',
  },
  steps: [
    {
      id: 'move',
      title: 'About the move',
      fields: [
        { kind: 'chips', name: 'role', label: 'Are you buying, or buying and selling?', options: ['Buying', 'Buying and selling'], required: true },
        { kind: 'chips', name: 'timeline', label: 'When would you like to move?', options: TIMELINE_BUY, required: true },
        { kind: 'chips', name: 'purpose', label: 'Will this be your home, or an investment?', options: ['My home', 'An investment', 'Both, house hacking'], required: true },
        { kind: 'chips', name: 'firstPurchase', label: 'Have you bought a home before?', options: ['Yes', 'No, this is my first'], required: true },
        { kind: 'chips', name: 'otherAgent', label: 'Are you working with another agent?', options: ['No', 'Yes, under an agreement', 'Yes, but exploring'], required: true },
      ],
    },
    {
      id: 'financing',
      title: 'Financing',
      intro: 'A pre-approval tells us what is realistic and makes your offer credible. "Started the process" counts.',
      fields: [
        { kind: 'chips', name: 'preapproval', label: 'Where are you with financing?', options: ['Pre-approved', 'Started the process', 'Not yet', 'Paying cash'], required: true },
        { kind: 'chips', name: 'priceBand', label: 'The most you would be comfortable spending', options: PRICE, required: true },
        { kind: 'chips', name: 'loanType', label: 'Loan type, if you know it', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Not sure'] },
        { kind: 'chips', name: 'lenderIntro', label: 'Would you like an introduction to a lender I trust?', options: ['Yes, please', 'No, I am set', 'Paying cash'] },
        { kind: 'chips', name: 'earnestMoney', label: 'Do you have funds set aside for earnest money and closing costs?', options: ['Yes', 'Not yet', 'Not sure, let us talk'] },
      ],
    },
    {
      id: 'home',
      title: 'The home',
      fields: [
        { kind: 'chips', name: 'areas', label: 'Where are you looking?', hint: 'Pick every town you would consider.', options: [...areaNames, 'Gastonia', 'Mooresville', 'Anywhere in the Charlotte area'], multi: true, required: true },
        { kind: 'chips', name: 'beds', label: 'Bedrooms, at least', options: BEDS, required: true },
        { kind: 'chips', name: 'baths', label: 'Bathrooms, at least', options: BATHS, required: true },
        { kind: 'chips', name: 'sqft', label: 'Square footage', options: SQFT, multi: true },
        { kind: 'chips', name: 'lot', label: 'Lot size', options: LOT, multi: true },
        { kind: 'chips', name: 'condition', label: 'Condition you would consider', options: ['Move-in ready', 'Cosmetic work, paint and floors', 'Needs real updating', 'Full renovation', 'New construction'], multi: true },
        { kind: 'chips', name: 'mustHaves', label: 'Must-haves', options: ['Single level', 'Garage', 'Home office', 'Pool', 'Acreage', 'No HOA', 'Fenced yard', 'Basement'], multi: true },
        { kind: 'text', name: 'topFeature', label: 'The one feature you will not compromise on', placeholder: 'A workshop, a view, a specific street', autoComplete: 'off' },
      ],
    },
    {
      id: 'selling',
      title: 'The home you are selling',
      intro: 'Selling one to buy the next is one project with two closings. I plan it that way from the start.',
      show: (a) => a.role === 'Buying and selling',
      fields: [
        { kind: 'text', name: 'address', label: 'Address of the home you are selling', autoComplete: 'street-address', placeholder: 'Street, city, state', required: true },
        { kind: 'chips', name: 'needProceeds', label: 'Do you need the proceeds from the sale to buy?', options: ['Yes', 'No', 'Let us find out'], required: true },
        { kind: 'chips', name: 'sellTimeline', label: 'When would you like to list it?', options: TIMELINE_SELL },
      ],
    },
    {
      id: 'more',
      title: 'One more thing',
      fields: [{ kind: 'textarea', name: 'message', label: 'What will this move accomplish for you?', hint: 'This is the answer that helps me most. Anything else you want me to know goes here too.' }],
    },
  ],
}

export const sellersQuestionnaire: QuestionnaireConfig = {
  source: 'seller-questionnaire',
  role: 'selling',
  eyebrow: 'Seller questionnaire',
  title: 'Tell me about the home, and I will put together your market snapshot.',
  intro: 'About five minutes, mostly taps. You get an honest read on what the home would likely bring this month, from the closed sales around it, and what I would do before listing. No obligation.',
  thanks: {
    title: 'Got it. Your market snapshot is next.',
    body: 'I will pull the closed sales around you and reach out with a number and a plan. If you would rather talk first, my cell is below.',
  },
  steps: [
    {
      id: 'home',
      title: 'The home',
      fields: [
        { kind: 'text', name: 'address', label: 'Property address', autoComplete: 'street-address', placeholder: 'Street, city, state', required: true },
        { kind: 'chips', name: 'propertyType', label: 'Type', options: ['Single family', 'Townhome', 'Condo', 'Multi-family', 'Land'], required: true },
        { kind: 'chips', name: 'beds', label: 'Bedrooms', options: BEDS, required: true },
        { kind: 'chips', name: 'baths', label: 'Bathrooms', options: BATHS, required: true },
        { kind: 'chips', name: 'stories', label: 'Stories', options: ['1', '1.5', '2', '3'] },
        { kind: 'chips', name: 'sqft', label: 'Square footage', options: SQFT },
        { kind: 'chips', name: 'yearBuilt', label: 'Year built', options: ['Before 1970', '1970s or 1980s', '1990s', '2000s', '2010 or newer', 'Not sure'] },
        { kind: 'chips', name: 'lot', label: 'Lot size', options: LOT },
        { kind: 'chips', name: 'parking', label: 'Parking', options: ['Attached garage', 'Detached garage or shop', 'Carport', 'Driveway only'], multi: true },
      ],
    },
    {
      id: 'condition',
      title: 'Condition and updates',
      intro: 'Roof, HVAC, kitchen, floors, a finished space. It changes the number, so it goes in the snapshot.',
      fields: [
        { kind: 'chips', name: 'condition', label: 'How would you describe the condition?', options: ['Like new', 'Very good', 'Good', 'Needs some work', 'Needs a lot of work'], required: true },
        { kind: 'chips', name: 'updates', label: 'What have you updated since you bought it?', options: ['Roof', 'HVAC', 'Kitchen', 'Bathrooms', 'Flooring', 'Windows', 'Paint', 'Deck or outdoor space', 'Nothing major'], multi: true },
        { kind: 'chips', name: 'roof', label: 'Has the roof been replaced?', options: ['Yes', 'No, original', 'Not sure'] },
        { kind: 'chips', name: 'occupancy', label: 'Who lives there now?', options: ['I do', 'A tenant', 'Vacant'], required: true },
        { kind: 'text', name: 'knownIssues', label: 'Anything you know needs attention', placeholder: 'A leak, an older water heater, a fence', autoComplete: 'off' },
      ],
    },
    {
      id: 'goals',
      title: 'Goals and timeline',
      fields: [
        { kind: 'chips', name: 'reason', label: 'What is behind the move?', options: ['More space', 'Less space', 'Relocating for work', 'Cashing out an investment', 'A different neighborhood', 'A change of pace', 'Other'], multi: true },
        { kind: 'chips', name: 'timeline', label: 'When would you like to list?', options: TIMELINE_SELL, required: true },
        { kind: 'chips', name: 'priority', label: 'What matters most?', options: ['Top dollar, I can wait for the right buyer', 'Speed, a fast clean close', 'Certainty that it closes', 'The least hassle'], required: true },
        { kind: 'chips', name: 'listedBefore', label: 'Has it been on the market in the last year?', options: ['Yes', 'No'], required: true },
        { kind: 'chips', name: 'otherAgent', label: 'Are you working with another agent or under an agreement?', options: ['No', 'Yes'], required: true },
        { kind: 'chips', name: 'buyingNext', label: 'Are you buying another home?', options: ['Yes', 'No', 'Undecided'], required: true },
      ],
    },
    {
      id: 'next',
      title: 'The next home',
      show: (a) => a.buyingNext === 'Yes' || a.buyingNext === 'Undecided',
      fields: [
        { kind: 'chips', name: 'movingAway', label: 'Staying in the area?', options: ['Staying nearby', 'Moving out of the area', 'Undecided'] },
        { kind: 'chips', name: 'needProceeds', label: 'Do you need the proceeds from this sale to buy the next one?', options: ['Yes', 'No', 'Let us find out'] },
        { kind: 'chips', name: 'nextPriceBand', label: 'Price range for the next home', options: PRICE },
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing',
      intro: 'We will look at the current closed sales together. These two answers just tell me where you are starting from.',
      fields: [
        { kind: 'text', name: 'ownerEstimate', label: 'What do you think the home is worth?', inputMode: 'numeric', placeholder: 'Your best guess is fine', autoComplete: 'off' },
        { kind: 'chips', name: 'compsResearch', label: 'Have you looked at recent sales nearby?', options: ['Yes, some research', 'A little', 'No, that is why I am here'] },
        { kind: 'text', name: 'mortgageBalance', label: 'Approximate mortgage balance, if any', inputMode: 'numeric', placeholder: 'Optional, and it stays between us', autoComplete: 'off' },
      ],
    },
    {
      id: 'more',
      title: 'One more thing',
      fields: [{ kind: 'textarea', name: 'message', label: 'Anything else I should know about you or the home?', hint: 'Special circumstances, who signs, what would make this feel like a success.' }],
    },
  ],
}
