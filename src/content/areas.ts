/**
 * The service area pages. Every sentence here describes a place, its
 * geography, what is there and what it costs. Nothing describes who
 * lives in it or who it would suit; that is the fair housing line and
 * it is held on purpose. School districts are named as a fact with the
 * instruction to verify an address with the district. They are never
 * rated and never given as a reason to buy.
 *
 * Source: the twelve neighborhood guides in the CLT Realty Group Digital
 * Assets Drive (05_Content/Neighborhood_Research), which were built from
 * Candace's own answers in September 2026. Median prices and drive times
 * are as of that research date and are quoted as such. The "candace"
 * field is her own read on the town, in her words.
 */
export type AreaContent = {
  slug: string
  title: string
  metaDescription: string
  intro: string
  paragraphs: string[]
  neighborhoods: string[]
  candace: string
}

export const areaContent: Record<string, AreaContent> = {
  charlotte: {
    slug: 'charlotte',
    title: 'Real estate in Charlotte, North Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes across Charlotte, from Steele Creek and Ballantyne to University City, with a Fort Mill office 28 minutes from Uptown. Call (704) 778-0779.',
    intro:
      'Charlotte is the biggest name in this market and the one where my business spreads the widest. My closed sales here run from Steele Creek in the south to University City in the north, wherever a client decides they want to be. The city is a patchwork of named areas, and some feel so distinct that newcomers assume they are their own towns.',
    paragraphs: [
      'The citywide median home value ran about $397,000 in the September 2026 research, slightly down over the prior year. That surprises buyers who assume the South Carolina suburbs are automatically cheaper: Charlotte proper was priced below Fort Mill and Indian Land at the time, before North Carolina’s flat income tax enters the picture. The outer ring neighborhoods skew toward older, more affordable construction than the new build subdivisions farther out.',
      'Charlotte falls under Charlotte-Mecklenburg Schools, one large district where assignment can vary block to block. There is no shortcut based on a neighborhood name; a specific address has to be run through the district’s own tool. The central business district is Uptown, never downtown, and the economy has diversified well beyond the two bank headquarters into healthcare, logistics, manufacturing and technology. In November 2025 county voters approved a one cent transit sales tax to fund a major expansion of transit and roads.',
      'From my Fort Mill office, Uptown is 19 miles and about 28 minutes off peak. The Steele Creek and Ballantyne corridor, where a lot of south Charlotte’s jobs are, is 8 to 14 miles and 15 to 25 minutes, often faster by Steele Creek Road than by I-77. For many of my buyers that corridor, and not Uptown, is the everyday commute.',
    ],
    neighborhoods: ['Steele Creek', 'Ballantyne', 'University City', 'South End', 'NoDa', 'Plaza Midwood', 'Dilworth', 'Myers Park', 'Elizabeth', 'SouthPark'],
    candace:
      'Charlotte is more than banking, traffic and a skyline. My own favorite stretch runs from Steele Creek to Ballantyne, with Carowinds on one end and the Bowl at Ballantyne on the other, but I have never steered anyone away from any part of this city. When a client sets their heart on a neighborhood they cannot quite afford, I show them what I call the bonus areas nearby, close enough to enjoy the place they wanted without its price tag. Figure out how you want to live first. Charlotte has a corridor for it.',
  },
  'rock-hill': {
    slug: 'rock-hill',
    title: 'Real estate in Rock Hill, South Carolina',
    metaDescription:
      'Candace L. Thompson was born in Rock Hill, lives in Rock Hill and has closed more homes there than anywhere else: Old Town, Riverwalk, Oakland Avenue, India Hook and more. Call (704) 778-0779.',
    intro:
      'Rock Hill is where I do more business than anywhere else, and it is home. It is the largest city in York County, the home of Winthrop University, and the market where a buyer’s dollar still stretches. Homes here went under contract in about 30 days in the September 2026 research, a healthy pace next to the bidding wars in the hottest Charlotte suburbs.',
    paragraphs: [
      'The median home value sat around $322,000 to $327,000 at the research date, roughly 40 percent below Fort Mill. The housing stock is genuinely mixed: 1920s bungalows and mid-century ranches near Old Town, Summit Street and the Chestnut and Jefferson corridor, the kind of in-town homes that do not exist in the newer suburbs, alongside master planned communities like Riverwalk along the Catawba River and subdivisions off I-77.',
      'Rock Hill Schools serves the city, and York Preparatory Academy is a charter option here; verify any address with the district. Rock Hill was a mill town, and the city has spent years reshaping itself, courting healthcare and technology employers rather than trying to become Charlotte. Downtown, the Knowledge Park redevelopment and The Thread greenway near Winthrop are the funded, visible version of that push.',
      'South Carolina assesses an owner occupied home at 4 percent for property tax, which the research put at roughly $1,200 to $2,300 a year saved against an equivalent Charlotte home. The counterweight is South Carolina’s annual vehicle property tax. From my office, Rock Hill is 12 miles and about 19 minutes; plenty of clients treat Fort Mill and Rock Hill as one connected market.',
    ],
    neighborhoods: ['Old Town and Historic Downtown', 'Oakland Avenue Historic District', 'Riverwalk', 'Winthrop Heights', 'India Hook', 'Laurel Creek', 'Newport', 'Meadow Lakes II', 'Stafford Park'],
    candace:
      'The misconception I hear most is that there is nothing to do in Rock Hill. I push back on that hard. This is a real city in its own right, with parks, recreation, dining and culture that stand on their own, from the Come See Me Festival every spring to ChristmasVille in Old Town every winter. You can get fully immersed in the community or keep to yourself, and both are real options here. I grew up in this town, I live in it, and I would never steer someone away from buying in Rock Hill.',
  },
  'fort-mill': {
    slug: 'fort-mill',
    title: 'Real estate in Fort Mill, South Carolina',
    metaDescription:
      'Candace L. Thompson’s office is in Fort Mill, South Carolina: Baxter Village, Springfield, Regent Park, Waterside at the Catawba, Massey and historic downtown. Call (704) 778-0779.',
    intro:
      'Fort Mill is my home base. My Keller Williams Connected office sits on the north side of town, close to the Charlotte line, and Fort Mill is the single biggest relocation destination in this market. It is a historic small town that has been transformed by tremendous suburban growth, and it is working in real time to grow without losing itself.',
    paragraphs: [
      'The median home value ran around $530,000 in the September 2026 research, well above Rock Hill and York and below Waxhaw across the state line. Fort Mill has a steady pipeline of master planned neighborhoods, from the New Urbanist Baxter Village with its walkable town center to Waterside at the Catawba on the river and the Massey communities around an aquatic complex, alongside older homes within walking distance of Main Street and the Anne Springs Close Greenway.',
      'Fort Mill School District, often called York 4, runs three high schools and a network of elementary and middle schools whose zones do not follow subdivision names. Some in-demand campuses have frozen enrollment when they hit capacity, which reassigns new students. The only way to know is to run a specific address through the district’s locator and call to ask. A Fort Mill mailing address also does not mean a property is inside the Town of Fort Mill; some Indian Land addresses carry it as a postal quirk, and taxes, services and zoning can all differ.',
      'The town has deliberately steered away from big box retail in favor of boutique shops, local businesses and breweries, and the road network stayed small by the same design. Growth outpaced it, so crossing town means traffic. In March 2026 the Town Council adopted a Comprehensive Plan, a Downtown Master Plan and a development moratorium to get ahead of congestion. Uptown Charlotte is 15 to 20 miles, 25 to 35 minutes off peak; Rock Hill is about 8 miles.',
    ],
    neighborhoods: ['Baxter Village', 'Springfield', 'Regent Park', 'Waterside at the Catawba', 'Massey and the Enclave at Massey', 'Brayden', 'Historic Downtown Fort Mill', 'The Dobys Bridge Road corridor'],
    candace:
      'Expect to pay more for the same square footage here than in Rock Hill or York, in exchange for proximity to Charlotte and everything the town has built. I am not shy about the trade-offs, the price, the traffic and the mailing address confusion, but I would never steer a client away from Fort Mill. LPL Financial and Coca-Cola Consolidated have planted real roots here, the Strawberry Festival fills Main Street every May, and the Greenway keeps thousands of acres protected right at the edge of town.',
  },
  'tega-cay': {
    slug: 'tega-cay',
    title: 'Real estate in Tega Cay, South Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Tega Cay, South Carolina, the lake and golf peninsula on Lake Wylie twelve minutes from her Fort Mill office. Call (704) 778-0779.',
    intro:
      'Tega Cay is the peninsula on Lake Wylie that buyers ask about by name. It is a mature lake and golf community inside the Fort Mill School District, a combination that is rarer than it sounds, and it sits 4.6 miles and about 12 minutes from my office.',
    paragraphs: [
      'The median home value was around $608,000 in the September 2026 research, essentially flat over the prior year, which reads as a stable, settled market rather than a fast appreciating one. Housing runs from the original lakefront neighborhoods on the peninsula, many with private docks, to golf course frontage at Fairway Point, 2010s communities near the Stonecrest retail corridor, and newer construction at River Falls.',
      'Tega Cay is inside the Fort Mill School District and has its own elementary school within city limits. That is not automatic for every lake community nearby; the South Carolina side of Lake Wylie generally falls under the Clover district. Verify the address either way. The city is protective of its small town feel: a Walmart Supercenter, a handful of local eateries, and otherwise no big commercial corridor. Taxes run higher here and fund the parks, lake access and golf oriented amenities residents want.',
      'The older parts of the community sit under tall mature trees; the newer sections sit alongside them. A buyer gets a meaningfully different setting depending on exactly where they land, golf frontage against lakefront, established canopy against new construction. It is a sub-market, not a single price point with a lake view attached.',
    ],
    neighborhoods: ['Anchorage, Windjammer, Holiday Cove and Seven Coves', 'Fairway Point', 'The Manors at Lake Ridge', 'Harpers Pointe and the Rosapenny peninsula', 'Cadence, Cameron Creek and Watertrace', 'River Falls', 'Stonecrest', 'Courtyards at Tega Cay'],
    candace:
      'Drive into the older part of Tega Cay under those trees and it genuinely feels like being in a treehouse. Lake lifestyle plus an established, mature community: that is the actual reason people choose it, and it is not a marketing line. Whether it is the right fit comes down to price and lifestyle, never to a reason to look elsewhere. I would never steer anyone away from Tega Cay.',
  },
  'lake-wylie': {
    slug: 'lake-wylie',
    title: 'Real estate in Lake Wylie, South Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes on the South Carolina side of Lake Wylie in York County: River Hills, Handsmill, Autumn Cove, Lake Crest and the inland subdivisions. Call (704) 778-0779.',
    intro:
      'Lake Wylie is neither a town nor a city. It is an unincorporated place in York County with no mayor and no council, and it is a much larger community than its shoreline. A Lake Wylie address describes an area, not a guarantee of a dock. This page covers the South Carolina side.',
    paragraphs: [
      'The median sale price sat around $595,000 in the September 2026 research, up about 3.5 percent over the prior year, comparable to Tega Cay and far above inland Clover a few minutes away. That gap is one story told two ways: proximity to water commands a real premium here. Lakefront and near-lakefront homes sit alongside subdivisions, townhomes and apartments with no water access at all.',
      'The South Carolina side generally falls under the Clover School District, not the Fort Mill district, and the district has been building new schools to keep up, including a high school in Lake Wylie itself. Verify any address rather than assuming from the lake it sits on. Most access runs through Highway 49, which becomes South Tryon Street once it crosses into south Charlotte; the road is fine, the volume on it is the issue.',
      'From my office, Lake Wylie is 7.3 miles and about 21 minutes, crossing the Buster Boyd Bridge to the Highway 49 retail cluster. Bridge traffic can push that longer at peak hours. Residents are actively pushing back on the pace of apartments and cookie cutter development while asking for more greenways and public lake access.',
    ],
    neighborhoods: ['River Hills', 'Gentry at Handsmill', 'Somerset and Autumn Cove', 'Lake Crest', 'Village at Ivy Ridge', 'Harpers Mill', 'Forest Oaks'],
    candace:
      'People still picture Lake Wylie as a quiet lake community, and that is increasingly out of date. It has grown fast into a real mix of rural, suburban and lake living, and with growth comes change, which we are all watching happen right now. Knowing which part of Lake Wylie you are buying into, waterfront, near the water or an inland subdivision, is the difference between getting what you expected and being surprised later.',
  },
  york: {
    slug: 'york',
    title: 'Real estate in York, South Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in York, South Carolina, the historic county seat with a National Register downtown, acreage at its edges and Handsmill on Lake Wylie. Call (704) 778-0779.',
    intro:
      'York is the small historic town, not just the county that borrowed its name, and it is my second busiest market. It offers what the planned communities up the road do not: an actual old town, with a 170 acre National Register historic district of Classical and Greek Revival homes centered where SC 5 meets US 321.',
    paragraphs: [
      'The median home value ran about $327,000 to $350,000 in the September 2026 research, close to Rock Hill and well under Fort Mill. One thing worth knowing: York’s median list price has been running notably higher than what homes actually close for, which means there is often more negotiating room here than a listing price suggests. The surrounding area has more acreage and rural adjacent property than the denser subdivisions to the east.',
      'York the town, York County and "York 4" are three different things. The town falls under York School District One, a separate district from the Fort Mill schools. Confirm the district for any specific address. New residential communities, commercial space and restaurants are landing here, the town is widening roads ahead of the growth it expects, and at the same time it is working to protect its farmland and agricultural side. Both things are true at once.',
      'From my office, York is 21 miles and about 36 minutes. From the town itself it is roughly 27 miles to Charlotte and 13 to Rock Hill, with an average commute around thirty minutes. York is not as far from where you want to go as its reputation suggests.',
    ],
    neighborhoods: ['York Historic District', 'Handsmill on Lake Wylie', 'Monterey Park', 'McFarland Estates', 'Montclaire', 'Austen Lakes'],
    candace:
      'The biggest misconception is that York is out of the way. It is closer than the middle of nowhere reputation suggests, and there is far more development happening here than outsiders realize. The other one is that York is simply the cheaper Fort Mill. York can hit the same high end price points Fort Mill commands, and it also has more affordable options across the board. It is more range at every price point, not a discount. Decide on lifestyle fit, not an assumed price break.',
  },
  clover: {
    slug: 'clover',
    title: 'Real estate in Clover, South Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Clover, South Carolina, the incorporated mill town just inland from Lake Wylie with its own historic downtown and a five year revitalization plan. Call (704) 778-0779.',
    intro:
      'Clover sits just inland from Lake Wylie, and its whole value proposition is in the price gap between the two. Unlike Lake Wylie, Clover is an actual incorporated town, with a real downtown, its own park, and an identity that goes back generations to its railroad and textile mill roots.',
    paragraphs: [
      'The median home value ran around $420,000 in the September 2026 research, well below Lake Wylie despite the two sitting a few minutes apart. Homes here took about 48 days to reach pending, against roughly 30 in Rock Hill and 29 in Fort Mill, which reads as a quieter market with more room to negotiate. The surrounding area has more acreage than the subdivisions closer to Fort Mill.',
      'Clover has its own school district, York County School District 2, with Clover High and its own attendance zones, entirely separate from the Fort Mill district. Confirm the district for any address. The town has a formal five year downtown revitalization plan, an active Main Street program, and a Comprehensive Plan through 2034 that ties new growth back into the historic corridor.',
      'The official plan points growth toward Highway 55 and US 321, but much of Clover’s recent growth has landed on the Lake Wylie side of town instead, driven by Charlotte and the pull of the lake even for people who will never own a boat. From my office Clover is 19 miles and about 45 minutes on mostly two lane roads, with Lake Wylie at the halfway point.',
    ],
    neighborhoods: ['River Hills', 'Clover Meadows', 'Sanders Landing', 'Harpers Green', 'Mill Creek Falls', 'Paddlers Cove', 'Eagle Creek'],
    candace:
      'The biggest misconception is that Clover is just an extension of Lake Wylie or Fort Mill. It is not, and the distinction matters. This is a traditional small town that is growing while trying to hold onto what makes Clover feel like Clover, from the downtown revitalization work to the way development keeps drifting toward the lake. It is a town in the middle of figuring out how to grow without losing itself, and that is exactly why it is worth watching closely right now.',
  },
  'indian-land': {
    slug: 'indian-land',
    title: 'Real estate in Indian Land, South Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Indian Land, South Carolina, the unincorporated Lancaster County corridor on the state line south of Ballantyne: Sun City Carolina Lakes, BridgeMill, Covington and the Highway 521 communities. Call (704) 778-0779.',
    intro:
      'Indian Land sits directly on the state line south of Ballantyne, and it has grown fast enough that many buyers assume it is part of Fort Mill. It is not. It is an unincorporated community in Lancaster County, with no mayor, no council and no municipal government, and it grew like a city without becoming one.',
    paragraphs: [
      'The median home value ran around $539,000 in the September 2026 research, down about 3 percent over the prior year and essentially Fort Mill’s price tier. Typical pricing runs in the high $400,000s and up with a growing luxury segment. Indian Land is not cheap, and I would not use that word for it. Sun City Carolina Lakes, the large Del Webb 55 and over community, is one of the most searched names in this part of the market; BridgeMill, Covington, Sugar Creek and Barber Rock are the other communities buyers hear about first.',
      'Indian Land is served by the Lancaster County School District, including Indian Land High School, and not by the Fort Mill district at all, even though some Indian Land addresses carry a Fort Mill mailing address and the 29707 zip code. Voters considered incorporating around 2017 and 2018 and rejected it by a wide margin; residents were comfortable relying on county services rather than raising taxes on an area where bills already run high.',
      'Growth along the Highway 521 corridor has been dramatic: subdivisions, apartments, medical offices, restaurants, and big box retail including a Costco that opened October 31, 2025 and a Target. There is no central downtown. Residents have pushed back on the pace of new housing specifically. From my office Indian Land is 8.9 miles and about 21 minutes.',
    ],
    neighborhoods: ['Sun City Carolina Lakes', 'BridgeMill', 'Covington, The Villas and The Traditions', 'Sugar Creek', 'Barber Rock, the Preserve and the Overlook', 'Carolina Reserve', 'Wakefield', 'Highland Creek'],
    candace:
      'Indian Land may be the clearest example of the cross-border math in this whole market, because it sits right on the line and draws so heavily from people actively comparing the two states. South Carolina wins on the house. North Carolina often wins in the driveway, because of the vehicle property tax. For an Indian Land buyer that comparison is not theoretical. It is usually the exact decision they are in the middle of making, and I run the actual numbers with them.',
  },
  waxhaw: {
    slug: 'waxhaw',
    title: 'Real estate in Waxhaw, North Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Waxhaw, North Carolina: Millbridge, Cureton, Lawson, the Club at Longview, Providence Downs South and the historic downtown. Call (704) 778-0779.',
    intro:
      'Waxhaw flips the usual assumption on its head. It is the North Carolina suburb that costs more than its South Carolina counterpart, not less. It is also genuinely old, dating to the late 1800s and tied to the railroad, with a historic foot bridge over the tracks downtown. Waxhaw was already here. Charlotte’s growth eventually reached it.',
    paragraphs: [
      'The median home value ran around $717,000 in the September 2026 research, essentially flat over the prior year and well above Fort Mill. Waxhaw does not have much inexpensive housing. It has attracted a great deal of higher end residential development, from large swim and tennis communities like Millbridge with roughly 2,000 homes and a lazy river, to gated enclaves like the Club at Longview and Providence Downs South, to established half acre neighborhoods like Hunter Oaks under mature canopy.',
      'Waxhaw is served by Union County Public Schools, with Marvin Ridge and Cuthbertson the high schools most often named in searches here. Verify any specific address with the district. The historic downtown keeps its small, rural feeling charm on purpose, but the surrounding lifestyle has become suburban: large subdivisions, newer homes, shopping centers and restaurants.',
      'Waxhaw does not sit near an interstate, so commuters lean on Providence Road and Rea Road, both of which see real congestion as the area grows. From my office it is 19 miles and about 40 minutes, longer than the map suggests, on a route that stays south of Charlotte through the Indian Land corridor.',
    ],
    neighborhoods: ['Millbridge', 'Cureton', 'Lawson', 'The Club at Longview', 'Providence Downs South', 'Skyecroft', 'Marvin Creek', 'Hunter Oaks', 'Hollister'],
    candace:
      'The assumption I correct constantly is that Waxhaw must be more affordable because it is farther from Charlotte. That general pattern, farther out means more house for less money, just does not hold here. You will likely get more space in Waxhaw, but do not assume farther from Charlotte means cheaper. And test the actual commute on a Tuesday, not a Sunday, before deciding it is a non-issue. It may look like a small town, but it does not always live like one.',
  },
  matthews: {
    slug: 'matthews',
    title: 'Real estate in Matthews, North Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Matthews, North Carolina, the established close-in suburb with a historic Trade Street downtown: Sardis Plantation, Sardis Forest, Callonwood and more. Call (704) 778-0779.',
    intro:
      'Matthews is one of the most stable markets I work in: an established, close-in Charlotte suburb with a genuine historic downtown along Trade Street, rather than a fast growth corridor still finding its identity. Charlotte grew out to Matthews. Matthews did not get built by Charlotte.',
    paragraphs: [
      'The median home value ran around $515,000 in the September 2026 research, up a modest half percent over the prior year, steady rather than boom or bust. That puts Matthews well above Charlotte’s citywide median and well below Waxhaw, though both towns trade on a similar small town character. There are real historical layers here: the downtown, older established neighborhoods, mid-century development, traditional subdivisions, and newer infill on top.',
      'Matthews falls under Charlotte-Mecklenburg Schools; verify a specific address rather than assuming from the town name. A Matthews mailing address does not automatically mean a property is inside the incorporated Town of Matthews. Several of the Providence named neighborhoods near the Providence Road corridor actually sit in Charlotte or Weddington, which matters for taxes and services.',
      'Matthews sits about 11 miles southeast of Uptown by US 74 and I-485. From my office it is 25 miles and about 32 minutes around the outer loop. Downtown continues to invest in walkability, mobility and parking to protect its character as growth pushes in.',
    ],
    neighborhoods: ['Historic Downtown Matthews and Trade Street', 'Sardis Plantation', 'Sardis Forest', 'Deerfield Creek', 'Callonwood', 'Matthews Commons', 'Polo Club of Matthews'],
    candace:
      'People assume Matthews is just subdivisions and shopping centers, and some of that is fair. But downtown Matthews is a completely different experience: historic buildings, local businesses, the farmers market, Stumptown Park and the old train depot, all wrapped around real community events. And people assume it is cheaper because it is outside Charlotte proper. That is not a safe bet. Matthews is a small town root surrounded by big city growth, and its pricing looks more like an in-town Charlotte neighborhood than an exurb.',
  },
  pineville: {
    slug: 'pineville',
    title: 'Real estate in Pineville, North Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Pineville, North Carolina, the small incorporated town off I-485 near Carolina Place Mall, twenty minutes from her Fort Mill office. Call (704) 778-0779.',
    intro:
      'Pineville is small, barely a few square miles, and it is a real, self governing town tucked so neatly inside the Charlotte metro that plenty of people drive past without realizing it is there. Its location off I-485 near Carolina Place Mall keeps it in steady demand for south Charlotte convenience without a south Charlotte price.',
    paragraphs: [
      'The median sale price ran around $430,000 in the September 2026 research, down roughly 7.4 percent over the prior year, one of the more notable softenings in this market and worth saying plainly to a buyer as a possible window. Beyond the historic core, Pineville is in a wave of new construction, townhomes and single family homes alike, for buyers who want a newer home without leaving the area.',
      'Pineville falls under Charlotte-Mecklenburg Schools; verify a specific address. Main Street Pineville is a genuine historic downtown with the railroad tracks still running through it, and both the commercial district and the mill village are listed on the National Register. Before I-485 opened in the 1990s the town had well under 2,000 residents; the highway is what carried it past 10,000.',
      'Pineville is the closest of my North Carolina markets to the office: 9.3 miles and about 20 minutes by the US 21 and SC 160 truck route, about 8 miles north of Fort Mill and 11 miles south of Uptown.',
    ],
    neighborhoods: ['Main Street Pineville', 'Pineville Commercial Historic District', 'Pineville Mill Village Historic District', 'The newer townhome and single family communities around town'],
    candace:
      'People think of Pineville as Carolina Place Mall and not much else. There is a lot more to it. Pineville Lake Park is a hidden gem, a real park around a small lake where Saturday mornings bring out tiny sailboats for informal races, and the organizers keep a boat or two on hand so a newcomer can join in. It connects into the greenway system too. Pineville is not Charlotte with a different name on the sign, and it does not want to be.',
  },
  monroe: {
    slug: 'monroe',
    title: 'Real estate in Monroe, North Carolina',
    metaDescription:
      'Candace L. Thompson buys and sells homes in Monroe, North Carolina, the Union County seat: the historic downtown, Weddington Pointe, Braemar Village and the western growth corridor. Call (704) 778-0779.',
    intro:
      'Monroe is the Union County seat and one of the stronger growth markets I work in, a real contrast to the flatter appreciation in the pricier suburbs closer to Charlotte. It is an old city finding a new place within the Charlotte region, and it should never be judged by Highway 74.',
    paragraphs: [
      'The median sale price ran around $400,000 in the September 2026 research, up 5.7 percent over the prior year, notably faster than Waxhaw despite sharing a county. Monroe and Waxhaw sit at opposite ends of Union County’s price spectrum. The housing spans a National Register historic district of nearly 400 late 1800s to 1940 homes downtown, established ranch neighborhoods to the south, and master planned and new construction communities along the western growth corridor toward Weddington.',
      'Monroe is served by Union County Public Schools; verify any address with the district. Downtown, anchored by the old Union County Courthouse, has put sustained effort into revitalization built around economic development and historic preservation. Monroe has jobs of its own, with manufacturing and aerospace employers and the Charlotte-Monroe Executive Airport anchoring a business park.',
      'From my office Monroe is 28 miles and about 55 minutes, on a route that runs east through the Indian Land and Waxhaw roads rather than through Charlotte. Whether Monroe feels close or far depends on where you are headed: it is a quick trip to south Charlotte, Matthews and Indian Trail.',
    ],
    neighborhoods: ['Monroe Residential Historic District', 'Weddington Pointe', 'Braemar Village', 'The Trails', 'Cedar Meadows', "St. John's Forest", 'Wesley Chapel Village District'],
    candace:
      'Yes, I sometimes widen a search into Monroe because it is more affordable than Waxhaw or south Charlotte, and buyers ask me about that directly. But I do not want anyone to think of it as the discount option. Monroe is a genuinely different lifestyle, with historic homes, established communities, new construction, larger lots and rural property all in the mix. My process always starts with what lifestyle you actually want, and then finding where that fits. Often it fits in Monroe.',
  },
}
