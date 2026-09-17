// The Emergency Food Playbook — recipe dataset
// All recipes: shelf-stable ingredients only unless a step explicitly says
// "use first" for fresh items. Nutrition is intentionally not fabricated:
// the renderer adds "Check the nutrition label for your chosen brand."
// Water amounts are approximate and follow typical package directions.

export const RECIPES = [
  // ─────────────────────────── NO-COOK MEALS (22) ───────────────────────────
  {
    id: "nc01", name: "Tuna Salad on Crackers", cat: "nocook",
    tags: ["protein", "evac", "lowwater", "kid"],
    serves: 2, time: "5 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["2 pouches or cans tuna, drained", "1/3 cup mayonnaise (shelf-stable jar)", "1 tbsp relish (optional)", "2 sleeves crackers"],
    prep: ["Mix tuna, mayonnaise and relish in the pouch or one bowl.", "Spoon onto crackers just before eating so they stay crisp."],
    subs: "Canned chicken or salmon instead of tuna; mustard instead of mayonnaise.",
    note: "Single-serve pouches avoid leftovers. If using a large can without refrigeration, eat the whole portion the same meal. Fish allergy: use chicken."
  },
  {
    id: "nc02", name: "Chickpea Smash Sandwiches", cat: "nocook",
    tags: ["protein", "budget", "kid"],
    serves: 2, time: "8 min", water: "None (draining only)", fuel: "No-cook", dishes: 1,
    ing: ["1 can (15 oz) chickpeas, drained and rinsed", "2 tbsp mayonnaise or olive oil", "1/2 tsp garlic powder", "4 slices bread or 4 soft tortillas"],
    prep: ["Mash chickpeas in a bowl with a sturdy spoon or cup bottom.", "Stir in mayonnaise and garlic powder; season with salt and pepper.", "Pile onto bread or roll into tortillas."],
    subs: "Canned white beans work the same; add relish or hot sauce for adults.",
    note: "Rinsing cuts sodium but uses about 1 cup of water — skip the rinse if water is short and plan extra drinking water. Eat all filling the same meal if refrigeration is unavailable."
  },
  {
    id: "nc03", name: "Peanut Butter and Raisin Crackers", cat: "nocook",
    tags: ["kid", "evac", "lowwater", "budget", "breakfast"],
    serves: 2, time: "3 min", water: "None", fuel: "No-cook", dishes: 0,
    ing: ["24 crackers", "6 tbsp peanut butter", "4 tbsp raisins", "Honey (optional)"],
    prep: ["Spread peanut butter on crackers.", "Top with raisins and a drizzle of honey."],
    subs: "Any seed butter for peanut-free households; dried cranberries for raisins.",
    note: "Peanut allergy: substitute sunflower seed butter and check all labels. Keeps indefinitely as a go-bag meal."
  },
  {
    id: "nc04", name: "Mediterranean Chickpea Salad", cat: "nocook",
    tags: ["protein", "budget"],
    serves: 2, time: "8 min", water: "None (draining only)", fuel: "No-cook", dishes: 1,
    ing: ["1 can (15 oz) chickpeas, drained", "1/2 cup canned olives, drained and halved", "1/2 cup sun-dried or canned tomatoes, drained", "2 tbsp olive oil", "1 tsp Italian seasoning"],
    prep: ["Combine everything in one bowl.", "Season with salt and pepper; toss gently."],
    subs: "Canned white beans or cannellini beans replace chickpeas; add canned artichokes if stocked.",
    note: "High-sodium combo — pair with extra drinking water. No leftovers without refrigeration."
  },
  {
    id: "nc05", name: "Salmon Salad on Crispbread", cat: "nocook",
    tags: ["protein", "evac"],
    serves: 2, time: "5 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["1 can (14.75 oz) salmon, drained", "1/4 cup mayonnaise", "1 tbsp lemon juice (bottled) or relish", "12 crispbread or cracker rounds", "Black pepper"],
    prep: ["Flake salmon, removing large bones if desired (they are edible).", "Mix with mayonnaise and lemon juice.", "Serve on crispbread with pepper."],
    subs: "Tuna or sardines; mustard instead of mayonnaise.",
    note: "Fish allergy: swap for canned chicken. Choose single-serve cans to avoid leftovers."
  },
  {
    id: "nc06", name: "Granola Breakfast Bowl", cat: "nocook",
    tags: ["breakfast", "kid", "evac", "lowwater"],
    serves: 1, time: "2 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["3/4 cup granola", "1 cup shelf-stable milk (carton)", "1/2 cup canned fruit, drained, or dried fruit"],
    prep: ["Pour granola into a bowl or the empty carton.", "Add milk and fruit; stir."],
    subs: "Cereal instead of granola; powdered milk mixed with safe water.",
    note: "Single-serve milk cartons remove the open-container problem entirely."
  },
  {
    id: "nc07", name: "White Bean and Olive Salad", cat: "nocook",
    tags: ["protein", "budget"],
    serves: 2, time: "6 min", water: "None (draining only)", fuel: "No-cook", dishes: 1,
    ing: ["2 cans (15 oz each) white beans, drained", "1/3 cup canned olives, drained", "2 tbsp olive oil", "1 tsp Italian seasoning", "Crackers or bread to serve"],
    prep: ["Stir beans, olives, oil and seasoning together.", "Serve alongside crackers."],
    subs: "Chickpeas or kidney beans; red wine vinegar if stocked.",
    note: "Rinse beans only if water budget allows. No leftovers without refrigeration."
  },
  {
    id: "nc08", name: "Ham and Cheese Cracker Stack", cat: "nocook",
    tags: ["kid", "evac", "lowwater", "protein"],
    serves: 2, time: "5 min", water: "None", fuel: "No-cook", dishes: 0,
    ing: ["1 can (5 oz) ham or luncheon meat, sliced", "Shelf-stable cheese slices or cheese spread", "24 crackers", "Mustard (optional)"],
    prep: ["Layer meat and cheese on crackers.", "Add mustard if desired."],
    subs: "Canned chicken with cheese spread; peanut butter replaces cheese for dairy-free.",
    note: "Use single-can portions. High in sodium — plan extra water."
  },
  {
    id: "nc09", name: "Black Bean and Corn Salsa Salad", cat: "nocook",
    tags: ["budget", "protein"],
    serves: 3, time: "7 min", water: "None (draining only)", fuel: "No-cook", dishes: 1,
    ing: ["1 can (15 oz) black beans, drained", "1 can (15 oz) corn, drained", "1/2 cup salsa", "1 tsp taco seasoning (optional)", "Tortilla chips or crackers"],
    prep: ["Mix beans, corn and salsa in one bowl.", "Season to taste; serve with chips."],
    subs: "Kidney beans or pinto beans; canned tomatoes with green chiles instead of salsa.",
    note: "Filling and shelf-driven; sodium varies widely by salsa brand — check labels."
  },
  {
    id: "nc10", name: "Peanut Butter Tortilla Roll-Ups", cat: "nocook",
    tags: ["kid", "breakfast", "evac", "lowwater", "budget"],
    serves: 2, time: "4 min", water: "None", fuel: "No-cook", dishes: 0,
    ing: ["4 flour tortillas", "6 tbsp peanut butter", "4 tbsp honey or jam", "1/2 cup raisins or trail mix (optional)"],
    prep: ["Spread tortillas with peanut butter, then honey or jam.", "Sprinkle with raisins, roll tightly and slice if desired."],
    subs: "Seed butter for nut-free; crackers instead of tortillas.",
    note: "Excellent car-kit meal — survives heat better than most bars. Peanut allergy: seed butter."
  },
  {
    id: "nc11", name: "Sardine Toast with Mustard", cat: "nocook",
    tags: ["protein", "evac", "lowwater"],
    serves: 1, time: "3 min", water: "None", fuel: "No-cook", dishes: 0,
    ing: ["1 tin sardines (in water or olive oil)", "6 crackers or 2 slices crispbread", "Mustard or hot sauce", "Crushed red pepper (optional)"],
    prep: ["Open tin, drain lightly if preferred.", "Place sardines on crackers; finish with mustard."],
    subs: "Mackerel, tuna or smoked oysters; lemon juice instead of mustard.",
    note: "Single-serve tins mean zero leftovers. Fish allergy: use canned chicken."
  },
  {
    id: "nc12", name: "Pantry Antipasto Plate", cat: "nocook",
    tags: ["evac", "protein"],
    serves: 2, time: "6 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["1 cup crackers", "1/2 cup canned olives, drained", "2 oz jerky", "Shelf-stable cheese or cheese spread", "Canned pepperoncini or roasted red peppers, drained"],
    prep: ["Arrange everything on one plate or board.", "Serve crackers alongside."],
    subs: "Swap any element for what you stock: canned artichokes, dried fruit, nuts.",
    note: "A build-your-own plate children accept easily. Sodium is high across the plate — budget water."
  },
  {
    id: "nc13", name: "Applesauce Granola Cups", cat: "nocook",
    tags: ["kid", "breakfast", "budget"],
    serves: 2, time: "3 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["2 single-serve cups applesauce", "1/2 cup granola", "2 tbsp peanut butter or seed butter", "Cinnamon"],
    prep: ["Spoon applesauce into bowls.", "Top with granola, a spoonful of peanut butter and cinnamon."],
    subs: "Canned fruit cups instead of applesauce; crushed cereal instead of granola.",
    note: "Single-serve cups keep portions and leftovers under control."
  },
  {
    id: "nc14", name: "Chicken Salad Wraps", cat: "nocook",
    tags: ["protein", "evac"],
    serves: 2, time: "6 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["1 can (12.5 oz) chicken, drained", "1/4 cup mayonnaise", "1 tbsp relish", "1/4 tsp garlic powder", "4 flour tortillas"],
    prep: ["Mix chicken, mayonnaise, relish and garlic powder.", "Spoon down the center of each tortilla and roll."],
    subs: "Tuna or salmon; mustard-based dressing if preferred.",
    note: "Eat all filling the same meal without refrigeration. Use single-serve mayo packets when available."
  },
  {
    id: "nc15", name: "Fruit Parfait Cups", cat: "nocook",
    tags: ["kid", "lowwater", "budget"],
    serves: 2, time: "3 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["2 cups canned fruit (peaches, pears or mixed), drained", "1/2 cup granola or crushed cereal", "1/2 cup shelf-stable milk or yogurt-style pudding (shelf-stable)", "Cinnamon"],
    prep: ["Layer fruit, granola and milk or pudding in cups.", "Dust with cinnamon."],
    subs: "Dried fruit rehydrated in a splash of fruit juice; trail mix instead of granola.",
    note: "Drain fruit into a cup and drink the juice — do not waste the water."
  },
  {
    id: "nc16", name: "Overnight-Style Oats with Peanut Butter", cat: "nocook",
    tags: ["breakfast", "budget"],
    serves: 1, time: "5 min + soak", water: "3/4 cup per serving (safe, cold)", fuel: "No-cook", dishes: 1,
    ing: ["1/2 cup quick oats", "3/4 cup safe water or shelf-stable milk", "1 tbsp peanut butter", "1 tbsp raisins or dried fruit", "Pinch of cinnamon"],
    prep: ["Stir oats and water in a jar or bowl; cover.", "Soak at least 30 minutes (overnight if cool enough per your judgment of conditions).", "Top with peanut butter, raisins and cinnamon."],
    subs: "Granola eaten dry if soaking water is a concern; honey instead of fruit.",
    note: "Soaked grains without refrigeration should be eaten the same day and discarded if left more than 2 hours in warm conditions — when in doubt, throw it out."
  },
  {
    id: "nc17", name: "Pantry Snack Board for Kids", cat: "nocook",
    tags: ["kid", "evac", "lowwater"],
    serves: 2, time: "4 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["1 cup crackers", "1/2 cup cereal", "1/4 cup trail mix or dried fruit", "Peanut butter or seed butter for dipping", "1 single-serve applesauce"],
    prep: ["Arrange everything on one plate in sections.", "Let children assemble their own bites."],
    subs: "Any combination of shelf snacks; cheese spread replaces peanut butter if needed.",
    note: "Grazing boards help children eat when routines are disrupted. Check allergens on shared boards."
  },
  {
    id: "nc18", name: "Bean Dip and Chips", cat: "nocook",
    tags: ["budget", "protein", "kid"],
    serves: 3, time: "6 min", water: "None (draining only)", fuel: "No-cook", dishes: 1,
    ing: ["1 can (15 oz) refried beans or seasoned beans", "1/4 cup salsa", "Tortilla chips", "Hot sauce (optional)"],
    prep: ["Mash beans with salsa until dip-like.", "Serve with chips."],
    subs: "Mashed canned black beans with taco seasoning; crackers instead of chips.",
    note: "Open cans transfer to a clean covered container if refrigeration exists; without it, eat the full portion the same meal."
  },
  {
    id: "nc19", name: "Trail Mix Energy Bowls", cat: "nocook",
    tags: ["evac", "lowwater", "budget"],
    serves: 1, time: "2 min", water: "None", fuel: "No-cook", dishes: 0,
    ing: ["1/2 cup trail mix", "1/4 cup granola", "2 tbsp peanut butter", "1 single-serve fruit cup or dried fruit"],
    prep: ["Combine trail mix and granola.", "Eat with spoonfuls of peanut butter and fruit on the side."],
    subs: "Any nuts, seeds, cereal and dried fruit you stock.",
    note: "Dense calories with zero prep — a strong evacuation meal. Nut allergies: seeds only."
  },
  {
    id: "nc20", name: "Cinnamon Cereal Cups", cat: "nocook",
    tags: ["kid", "breakfast", "evac", "lowwater"],
    serves: 1, time: "2 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["1 1/2 cups shelf-stable cereal", "1 cup shelf-stable milk", "Cinnamon and sugar (optional)"],
    prep: ["Pour cereal into a bowl or cup.", "Add milk; dust with cinnamon."],
    subs: "Granola, oats eaten as cold-soak (see Overnight-Style Oats), or dry cereal as a snack.",
    note: "Single-serve milk cartons are the cleanest format when dishes and water are limited."
  },
  {
    id: "nc21", name: "Jerky, Nuts and Dried Fruit Plate", cat: "nocook",
    tags: ["protein", "evac", "lowwater"],
    serves: 2, time: "2 min", water: "None", fuel: "No-cook", dishes: 1,
    ing: ["2 oz beef or turkey jerky", "1/2 cup nuts or seeds", "1/3 cup dried fruit", "Crackers (optional)"],
    prep: ["Arrange on a plate; no preparation."],
    subs: "Any shelf protein: meat sticks, canned fish, roasted chickpeas.",
    note: "Jerky is sodium-heavy; pair each serving with drinking water. Vegetarian: use roasted chickpeas and seeds."
  },
  {
    id: "nc22", name: "Sardine and White Bean Mash", cat: "nocook",
    tags: ["protein", "budget"],
    serves: 2, time: "5 min", water: "None (draining only)", fuel: "No-cook", dishes: 1,
    ing: ["1 tin sardines", "1 can (15 oz) white beans, drained", "1 tbsp olive oil", "Black pepper and lemon juice (bottled, optional)"],
    prep: ["Mash beans and sardines together with oil.", "Season; serve on crackers or bread."],
    subs: "Tuna or salmon instead of sardines; canned chicken for fish-free.",
    note: "Very high protein per dollar. Fish allergy: use chicken and beans."
  },

  // ─────────────────────────── HOT-WATER MEALS (22) ─────────────────────────
  {
    id: "hw01", name: "Peanut Butter Oatmeal", cat: "hotwater",
    tags: ["breakfast", "kid", "budget"],
    serves: 1, time: "5 min", water: "About 1 cup per serving (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1/2 cup quick oats", "3/4–1 cup boiling water", "1 tbsp peanut butter", "1 tbsp brown sugar or honey", "Pinch of salt"],
    prep: ["Pour boiling water over oats; cover 3 minutes.", "Stir in peanut butter, sweetener and salt."],
    subs: "Powdered milk stirred in for creaminess; raisins or dried fruit instead of sugar.",
    note: "Follow your oat package's ratio — brands vary. Absorbed water means no dirty dishwater."
  },
  {
    id: "hw02", name: "Couscous with Chicken and Peas", cat: "hotwater",
    tags: ["protein", "lowwater"],
    serves: 2, time: "10 min", water: "About 1 1/4 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 cup couscous", "1 1/4 cups boiling water or broth (bouillon + water)", "1 can (12.5 oz) chicken, drained", "1/2 cup canned peas, drained", "1 tbsp olive oil", "Italian seasoning"],
    prep: ["Stir couscous into boiling water or broth; cover 5 minutes.", "Fluff, then fold in chicken, peas and oil.", "Season with Italian seasoning, salt and pepper."],
    subs: "Canned tuna or beans instead of chicken; dehydrated vegetables rehydrated in the same water.",
    note: "Couscous is one of the most fuel-efficient grains — it steeps rather than boils."
  },
  {
    id: "hw03", name: "Upgraded Ramen Bowl", cat: "hotwater",
    tags: ["budget", "kid"],
    serves: 1, time: "8 min", water: "About 2 cups (partly absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 packet ramen", "1 tbsp powdered egg (rehydrated per label) or shelf-stable egg", "2 tbsp dehydrated mixed vegetables", "Half the seasoning packet, to taste"],
    prep: ["Pour boiling water over noodles and dehydrated vegetables in a heat-safe bowl; cover 4 minutes.", "Stir in rehydrated egg and half the seasoning packet."],
    subs: "Add canned chicken for protein; use only part of the seasoning packet to cut sodium.",
    note: "Ramen seasoning packets are very high in sodium — using half keeps flavor while cutting salt."
  },
  {
    id: "hw04", name: "Instant Mash and Gravy Chicken Bowl", cat: "hotwater",
    tags: ["kid", "protein", "comfort"],
    serves: 2, time: "8 min", water: "About 1 3/4 cups total (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["2 cups instant mashed potato flakes", "1 1/2 cups hot water or milk (shelf-stable)", "1 jar or packet gravy mix (prepared per label)", "1 can (12.5 oz) chicken, drained", "Black pepper"],
    prep: ["Stir potato flakes into hot water until smooth.", "Heat or mix gravy per package; fold in chicken.", "Spoon gravy and chicken over the mash."],
    subs: "Canned ham or turkey instead of chicken; cream-style canned soup as gravy.",
    note: "A high-acceptance comfort meal for kids and older adults with lower chewing needs."
  },
  {
    id: "hw05", name: "Thermos Tomato Pasta", cat: "hotwater",
    tags: ["evac", "kid"],
    serves: 1, time: "15 min", water: "About 2 cups (mostly absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1/2 cup small pasta (orzo, stars or broken spaghetti)", "1 1/2 cups boiling water", "1/3 cup tomato sauce (from a jar or single-serve pouch)", "Italian seasoning, salt"],
    prep: ["Preheat thermos with boiling water; empty.", "Add pasta and fresh boiling water; seal 10–12 minutes.", "Stir in tomato sauce and seasonings."],
    subs: "Couscous or instant rice if pasta won't soften in your thermos; add tuna or chicken.",
    note: "Test your thermos once at home — cook times vary by brand. Eat within 2 hours of cooking if it cools below 140 degrees F."
  },
  {
    id: "hw06", name: "Instant Rice and Black Beans", cat: "hotwater",
    tags: ["budget", "protein"],
    serves: 2, time: "10 min", water: "About 1 1/2 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 cup instant rice", "1 1/2 cups boiling water or broth", "1 can (15 oz) black beans, drained", "1/2 cup salsa", "Taco seasoning"],
    prep: ["Combine rice and boiling water; cover 5 minutes.", "Stir in beans and salsa; cover 2–3 minutes more to warm through.", "Season with taco seasoning."],
    subs: "Canned pinto beans or chickpeas; add shelf-stable cheese if stocked.",
    note: "Instant rice instead of regular rice cuts fuel use by about two thirds."
  },
  {
    id: "hw07", name: "Creamy Tomato Soup with Pasta", cat: "hotwater",
    tags: ["kid", "comfort", "budget"],
    serves: 2, time: "12 min", water: "About 3 cups total", fuel: "Hot water only", dishes: 1,
    ing: ["1 can (10.75 oz) condensed tomato soup", "1 soup can of hot water", "1/2 cup small pasta", "1/2 cup shelf-stable milk", "Crackers to serve"],
    prep: ["Heat soup and water together to a simmer in one pot.", "Add pasta; cook per package (about 8–9 minutes) until tender.", "Stir in milk off the heat; serve with crackers."],
    subs: "Any condensed soup; rice instead of pasta.",
    note: "Condensed soups pull double duty as sauce and broth — stock several varieties."
  },
  {
    id: "hw08", name: "Breakfast Couscous with Cinnamon", cat: "hotwater",
    tags: ["breakfast", "lowwater"],
    serves: 2, time: "7 min", water: "About 1 1/4 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 cup couscous", "1 1/4 cups boiling water or shelf-stable milk", "2 tbsp brown sugar or honey", "1/2 tsp cinnamon", "2 tbsp dried fruit", "2 tbsp nuts or seeds"],
    prep: ["Stir couscous into boiling liquid; cover 5 minutes.", "Fluff; stir in sweetener, cinnamon and fruit; top with nuts."],
    subs: "Instant oats instead of couscous; maple syrup instead of honey.",
    note: "Honey should not be given to children under 1 year — see pediatric guidance."
  },
  {
    id: "hw09", name: "Miso-Style Noodle Cup", cat: "hotwater",
    tags: ["evac", "budget"],
    serves: 1, time: "7 min", water: "About 1 3/4 cups", fuel: "Hot water only", dishes: 1,
    ing: ["1 packet ramen or rice noodles", "1 tsp bouillon (chicken, vegetable or beef)", "2 tbsp dehydrated vegetables", "1 tsp soy sauce", "1 tsp peanut butter (optional, for richness)"],
    prep: ["Combine noodles, bouillon and vegetables in a bowl or cup.", "Pour boiling water over; cover 4–5 minutes.", "Finish with soy sauce and peanut butter."],
    subs: "Any instant noodle; skip peanut butter for nut-free households.",
    note: "Only one container to eat from — a strong evacuation meal when paired with bottled water."
  },
  {
    id: "hw10", name: "Red Lentil Stew", cat: "hotwater",
    tags: ["protein", "budget"],
    serves: 2, time: "20 min", water: "About 2 1/2 cups (mostly absorbed)", fuel: "Low", dishes: 1,
    ing: ["1/2 cup red lentils, rinsed", "2 cups water or broth", "1/2 tsp bouillon", "1/4 cup canned diced tomatoes", "1/2 tsp curry powder", "Salt"],
    prep: ["Combine lentils, water, bouillon, tomatoes and curry in one pot.", "Simmer covered 15–18 minutes, stirring once, until lentils are soft.", "Season with salt."],
    subs: "Split peas (longer cook time); add instant rice to stretch.",
    note: "Red lentils cook far faster than beans — the best legume for low-fuel kitchens."
  },
  {
    id: "hw11", name: "Chicken Congee with Instant Rice", cat: "hotwater",
    tags: ["protein", "comfort"],
    serves: 2, time: "12 min", water: "About 3 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1/2 cup instant rice", "3 cups hot water or broth", "1 can (12.5 oz) chicken, drained", "1 tsp bouillon", "1 tsp soy sauce", "Sliced jerky or crushed crackers to top"],
    prep: ["Simmer rice in water with bouillon 8–10 minutes until porridge-thick.", "Stir in chicken and soy sauce.", "Top as desired."],
    subs: "Canned fish instead of chicken; ginger powder if stocked.",
    note: "Gentle on digestion — useful for households with older adults or anyone feeling unwell."
  },
  {
    id: "hw12", name: "Tabbouleh-Style Couscous Salad", cat: "hotwater",
    tags: ["lowwater"],
    serves: 2, time: "12 min", water: "About 1 1/4 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 cup couscous", "1 1/4 cups boiling water", "1/2 cup canned tomatoes, drained and chopped", "1/4 cup canned olives, drained", "2 tbsp olive oil", "1 tbsp lemon juice (bottled)", "Dried parsley or mint"],
    prep: ["Steep couscous in boiling water 5 minutes; fluff and let cool slightly.", "Toss with tomatoes, olives, oil, lemon juice and herbs.", "Serve warm or at room temperature."],
    subs: "Cucumber-style flavor from pickle relish; chickpeas for extra protein.",
    note: "Tastes good without refrigeration-level chilling, which makes it practical on day two or three of an outage."
  },
  {
    id: "hw13", name: "Mac and Cheese Cup", cat: "hotwater",
    tags: ["kid", "comfort", "budget"],
    serves: 1, time: "12 min", water: "About 2 cups (pasta absorbed)", fuel: "Low", dishes: 1,
    ing: ["1/2 cup elbow macaroni", "2 tbsp cheese powder (from a mac-and-cheese box or bulk)", "2 tbsp shelf-stable milk", "1 tsp butter powder or oil"],
    prep: ["Boil macaroni in one pot per package directions; drain carefully, reserving a splash of water.", "Off heat, stir in cheese powder, milk and butter powder."],
    subs: "Tuna or canned chicken stirred in; hot sauce for adults.",
    note: "Save the cheese powder from boxed mac-and-cheese purchases — it keeps well and works in soups too."
  },
  {
    id: "hw14", name: "Chili Over Instant Potatoes", cat: "hotwater",
    tags: ["protein", "comfort", "kid"],
    serves: 2, time: "10 min", water: "About 1 1/2 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 1/2 cups instant potato flakes", "1 1/4 cups hot water", "1 can (15 oz) chili with beans", "Shelf-stable cheese or crackers to top"],
    prep: ["Heat chili in a pot or can-safe water bath until hot.", "Stir potato flakes into hot water.", "Spoon chili over the mash; top as desired."],
    subs: "Canned stew over mash; black beans with salsa instead of chili.",
    note: "Chili cans vary widely in sodium — compare labels before stocking several."
  },
  {
    id: "hw15", name: "Thai-Style Peanut Noodles", cat: "hotwater",
    tags: ["kid", "protein"],
    serves: 2, time: "10 min", water: "About 3 cups (mostly absorbed)", fuel: "Low", dishes: 1,
    ing: ["2 packets ramen (discard or halve seasoning)", "2 tbsp peanut butter", "1 tbsp soy sauce", "1 tsp honey", "1/4 tsp garlic powder", "2 tbsp dehydrated vegetables"],
    prep: ["Cook noodles per package; drain, reserving 2–3 tablespoons of water.", "Whisk peanut butter, soy sauce, honey, garlic powder and reserved water into a sauce.", "Toss noodles with sauce and vegetables."],
    subs: "Sunflower seed butter for nut-free; hot sauce for adults.",
    note: "Peanut allergy: seed butter version only. Very high kid-acceptance."
  },
  {
    id: "hw16", name: "Cheddar Potato Soup", cat: "hotwater",
    tags: ["comfort", "kid"],
    serves: 2, time: "10 min", water: "About 2 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 1/2 cups instant potato flakes", "2 cups hot water or shelf-stable milk", "Shelf-stable cheese sauce (single-serve) or cheese powder", "1/2 cup canned corn", "Crushed crackers to top"],
    prep: ["Whisk potato flakes into hot liquid.", "Stir in cheese and corn; warm through.", "Top with crushed crackers."],
    subs: "Broccoli pieces (dehydrated) instead of corn; ham bits from a canned ham.",
    note: "Smooth texture suits older adults; adjust thickness with extra hot water."
  },
  {
    id: "hw17", name: "Cinnamon Raisin Oatmeal", cat: "hotwater",
    tags: ["breakfast", "kid", "budget"],
    serves: 2, time: "6 min", water: "About 1 3/4 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1 cup quick oats", "1 3/4 cups boiling water", "3 tbsp powdered milk (dry-stirred)", "1/4 cup raisins", "1 tbsp brown sugar", "1/2 tsp cinnamon"],
    prep: ["Combine oats and boiling water; cover 3 minutes.", "Stir in powdered milk, raisins, sugar and cinnamon."],
    subs: "Dried cranberries or chopped dried apples; honey instead of sugar.",
    note: "Powdered milk stirred in dry prevents clumps. Check your oats' package ratio."
  },
  {
    id: "hw18", name: "Savory Oats with Egg and Bouillon", cat: "hotwater",
    tags: ["breakfast", "protein"],
    serves: 1, time: "8 min", water: "About 1 1/4 cups (absorbed)", fuel: "Hot water only", dishes: 1,
    ing: ["1/2 cup quick oats", "1 1/4 cups hot water", "1 tsp bouillon", "2 tbsp powdered egg (rehydrated per label)", "Hot sauce or black pepper"],
    prep: ["Cook oats in water with bouillon 3 minutes.", "Stir in rehydrated egg; cook 1–2 minutes more.", "Finish with hot sauce or pepper."],
    subs: "Jerky bits or canned chicken stirred in; soy sauce instead of bouillon.",
    note: "Egg allergy: omit egg and add canned chicken instead."
  },
  {
    id: "hw19", name: "Ham and Potato Soup", cat: "hotwater",
    tags: ["protein", "comfort"],
    serves: 2, time: "12 min", water: "About 2 cups (absorbed)", fuel: "Low", dishes: 1,
    ing: ["1 1/2 cups instant potato flakes", "2 cups hot water", "1/2 cup canned ham, diced", "1/2 cup shelf-stable milk", "Black pepper, dried chives (optional)"],
    prep: ["Warm ham in the pot 1–2 minutes.", "Add water and bring to a simmer; whisk in potato flakes.", "Stir in milk; season."],
    subs: "Canned chicken instead of ham; dehydrated vegetables added with the water.",
    note: "Canned ham is already cooked — you are warming it, not cooking it, which saves fuel."
  },
  {
    id: "hw20", name: "Dehydrated Vegetable Soup", cat: "hotwater",
    tags: ["budget", "lowwater"],
    serves: 2, time: "15 min", water: "About 3 cups", fuel: "Low", dishes: 1,
    ing: ["1/2 cup dehydrated mixed vegetables", "3 cups water", "1 tbsp bouillon", "1/2 cup instant rice", "Italian seasoning"],
    prep: ["Combine vegetables, water and bouillon; simmer 8 minutes.", "Stir in rice; simmer 5 minutes more.", "Season to taste."],
    subs: "Any dehydrated or freeze-dried vegetables; add canned beans for protein.",
    note: "A good use for garden surplus or bulk dehydrated vegetables bought on sale."
  },
  {
    id: "hw21", name: "Instant Polenta with Tomato Sauce", cat: "hotwater",
    tags: ["comfort", "budget"],
    serves: 2, time: "10 min", water: "About 2 cups (absorbed)", fuel: "Low", dishes: 1,
    ing: ["1/2 cup instant polenta", "2 cups water", "1 cup tomato sauce", "Italian seasoning", "Shelf-stable cheese (optional)"],
    prep: ["Whisk polenta into simmering water; stir 3–5 minutes until thick.", "Warm tomato sauce in the same pot alongside or after.", "Sauce over polenta; top with cheese if stocked."],
    subs: "Instant mashed potatoes instead of polenta; canned chili instead of tomato sauce.",
    note: "Stir constantly to avoid scorching on a camp stove."
  },
  {
    id: "hw22", name: "Bulgur Pilaf with Chickpeas", cat: "hotwater",
    tags: ["protein", "budget"],
    serves: 2, time: "18 min", water: "About 1 3/4 cups (absorbed)", fuel: "Low", dishes: 1,
    ing: ["3/4 cup bulgur", "1 3/4 cups boiling water or broth", "1 can (15 oz) chickpeas, drained", "1 tbsp olive oil", "1 tsp bouillon", "Onion powder, black pepper"],
    prep: ["Pour boiling broth over bulgur; cover 10–12 minutes.", "Fluff; fold in chickpeas, oil and seasonings.", "Rest 2 minutes before serving."],
    subs: "Couscous (5-minute version) when fuel is tight; lentils instead of chickpeas.",
    note: "Bulgur is a whole grain with more fiber than white rice — vary your grains to vary your fiber."
  },

  // ─────────────────────────── ONE-POT MEALS (26) ───────────────────────────
  {
    id: "op01", name: "Chili Mac", cat: "onepot",
    tags: ["kid", "comfort", "protein"],
    serves: 4, time: "25 min", water: "About 3 cups", fuel: "Moderate", dishes: 1,
    ing: ["8 oz elbow macaroni", "1 can (15 oz) chili with beans", "1 cup tomato sauce", "1/2 cup water", "Shelf-stable cheese to top"],
    prep: ["Boil macaroni in one pot per package; drain, reserving 1/2 cup water.", "Return pasta to pot; stir in chili, tomato sauce and splashes of reserved water.", "Warm through; top with cheese."],
    subs: "Any short pasta; vegetarian chili; add canned corn.",
    note: "Family favorite — taste-test it once before an emergency to confirm your household's rating."
  },
  {
    id: "op02", name: "Pantry Three-Bean Chili", cat: "onepot",
    tags: ["protein", "budget", "comfort"],
    serves: 4, time: "25 min", water: "About 1 cup", fuel: "Moderate", dishes: 1,
    ing: ["2 cans (15 oz each) beans, any mix, drained", "1 can (14.5 oz) diced tomatoes", "1 can (8 oz) tomato sauce", "1 packet chili or taco seasoning", "1/2 cup water"],
    prep: ["Combine everything in one pot.", "Simmer 15–20 minutes, stirring occasionally.", "Season to taste."],
    subs: "Add canned corn, canned chicken or jerky pieces; hot sauce for adults.",
    note: "Rinsing beans reduces sodium about 40 percent per USDA-style label math but costs water — your call."
  },
  {
    id: "op03", name: "Red Beans and Rice", cat: "onepot",
    tags: ["budget", "protein"],
    serves: 4, time: "30 min", water: "About 2 1/2 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 1/2 cups instant rice", "1 can (15 oz) red or kidney beans, drained", "1 can (14.5 oz) diced tomatoes", "1 tsp bouillon", "1 tsp Cajun or chili seasoning", "1 1/2 cups water"],
    prep: ["Combine tomatoes, beans, bouillon, seasoning and water; simmer 10 minutes.", "Stir in rice; cover and remove from heat 5–10 minutes.", "Fluff and serve."],
    subs: "Canned ham or sausage-style shelf meat stirred in; black beans instead of red.",
    note: "Using instant rice here keeps a classic within low-fuel reach."
  },
  {
    id: "op04", name: "Chicken Noodle Soup from Cans", cat: "onepot",
    tags: ["kid", "comfort", "protein"],
    serves: 4, time: "25 min", water: "About 6 cups", fuel: "Moderate", dishes: 1,
    ing: ["2 cans (12.5 oz each) chicken, drained", "4 cups water plus 2 cups broth (bouillon)", "2 cups egg noodles", "1 cup canned mixed vegetables, drained", "Salt, pepper, dried parsley"],
    prep: ["Bring water and broth to a boil.", "Add noodles; cook per package (about 7 minutes).", "Add chicken and vegetables; simmer 3–5 minutes; season."],
    subs: "Rice instead of noodles; canned turkey or ham.",
    note: "The single most requested comfort meal during outages — prioritize its ingredients in your list."
  },
  {
    id: "op05", name: "Pasta with Marinara", cat: "onepot",
    tags: ["kid", "budget", "comfort"],
    serves: 4, time: "20 min", water: "About 8 cups for boiling", fuel: "Moderate", dishes: 1,
    ing: ["12 oz spaghetti or penne", "1 jar (24 oz) marinara sauce", "Italian seasoning", "Shelf-stable cheese (optional)", "Crackers or bread to serve"],
    prep: ["Boil pasta per package; drain.", "Warm sauce in the same pot.", "Toss together; season."],
    subs: "Canned tomato sauce plus seasoning if no jar sauce; add canned chicken or tuna.",
    note: "Boiling pasta uses the most water of any method here — reuse the pot water for sanitation, not drinking, if you must."
  },
  {
    id: "op06", name: "Tuna Noodle Skillet", cat: "onepot",
    tags: ["protein", "budget"],
    serves: 3, time: "20 min", water: "About 6 cups for boiling", fuel: "Moderate", dishes: 1,
    ing: ["8 oz egg noodles", "2 cans tuna, drained", "1 can (10.75 oz) cream-style soup", "1/2 cup shelf-stable milk", "Crushed crackers to top"],
    prep: ["Boil noodles; drain.", "Stir soup, milk and tuna into the pot; warm gently.", "Top with crushed crackers."],
    subs: "Canned chicken instead of tuna; mushroom or celery soup varieties.",
    note: "Fish allergy: swap to chicken. A Depression-era budget meal that still works."
  },
  {
    id: "op07", name: "Hearty Lentil Soup", cat: "onepot",
    tags: ["budget", "protein"],
    serves: 4, time: "35 min", water: "About 6 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 cup brown or green lentils, rinsed", "6 cups water or broth", "1 tbsp bouillon", "1 can (14.5 oz) diced tomatoes", "1 tsp Italian seasoning", "Salt and pepper"],
    prep: ["Combine everything in one pot.", "Simmer covered 25–30 minutes until lentils are tender.", "Season; mash slightly if a thicker soup is wanted."],
    subs: "Canned carrots or corn added near the end; ham pieces for meat-eaters.",
    note: "Dry lentils are among the cheapest proteins per serving you can stock."
  },
  {
    id: "op08", name: "Split Pea Soup", cat: "onepot",
    tags: ["budget", "protein"],
    serves: 4, time: "45 min", water: "About 7 cups", fuel: "High", dishes: 1,
    ing: ["1 cup split peas, rinsed", "7 cups water or broth", "1 tbsp bouillon", "1/2 cup canned ham, diced", "Salt, pepper, onion powder"],
    prep: ["Combine peas, water, bouillon and ham in one pot.", "Simmer 35–45 minutes, stirring occasionally, until peas break down.", "Season."],
    subs: "Vegetarian version with smoked paprika instead of ham.",
    note: "Higher fuel meal — cook it when you have fuel to spare, or use the thermos method: boil 10 minutes, then rest in an insulated pot 1 hour."
  },
  {
    id: "op09", name: "Black Bean Soup with Salsa", cat: "onepot",
    tags: ["budget", "protein", "kid"],
    serves: 4, time: "20 min", water: "About 1 cup", fuel: "Low", dishes: 1,
    ing: ["2 cans (15 oz each) black beans, drained", "1 cup salsa", "1 cup water or broth", "1 tsp cumin or taco seasoning", "Crackers or rice to serve"],
    prep: ["Combine everything in one pot.", "Simmer 10–15 minutes.", "Mash lightly for a creamy texture."],
    subs: "Pinto beans; add corn; hot sauce for adults.",
    note: "One of the fastest hot meals from cans — good for day one of any outage."
  },
  {
    id: "op10", name: "Chicken and Rice Skillet", cat: "onepot",
    tags: ["protein", "comfort"],
    serves: 4, time: "25 min", water: "About 2 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 1/2 cups instant rice", "1 can (12.5 oz) chicken, drained", "1 can (10.75 oz) cream-style soup", "1 cup water", "1/2 cup dehydrated vegetables"],
    prep: ["Combine soup, water and vegetables; simmer 5 minutes.", "Stir in rice and chicken; cover off heat 5–10 minutes.", "Fluff and serve."],
    subs: "Canned ham or tuna; tomato soup instead of cream soup.",
    note: "A rice-casserole staple rebuilt for one pot and shelf ingredients."
  },
  {
    id: "op11", name: "Vegetable Beef-Style Soup", cat: "onepot",
    tags: ["protein", "comfort"],
    serves: 4, time: "30 min", water: "About 7 cups", fuel: "Moderate", dishes: 1,
    ing: ["2 cups water plus 5 cups broth (bouillon)", "2 cans mixed vegetables, drained", "1 can (15 oz) kidney beans, drained", "1 can (14.5 oz) diced tomatoes", "1/2 cup canned beef, ham or stew meat (optional)", "Salt, pepper, Italian seasoning"],
    prep: ["Bring broth and tomatoes to a simmer.", "Add vegetables, beans and meat.", "Simmer 15 minutes; season."],
    subs: "Any canned vegetables; add pasta or rice for heartiness.",
    note: "Flexible template: swap in whatever canned vegetables you overstocked."
  },
  {
    id: "op12", name: "Mac and Cheese with Broccoli", cat: "onepot",
    tags: ["kid", "comfort"],
    serves: 4, time: "25 min", water: "About 8 cups for boiling", fuel: "Moderate", dishes: 1,
    ing: ["12 oz elbow macaroni", "1/2 cup dehydrated broccoli", "2 boxes mac and cheese (cheese packets) or 1/2 cup cheese powder", "1/2 cup shelf-stable milk", "2 tbsp butter powder or oil"],
    prep: ["Boil macaroni with broccoli in the last 3 minutes; drain.", "Return to pot; stir in cheese, milk and butter powder.", "Warm gently and serve."],
    subs: "Dehydrated peas or green beans; canned chicken stirred in.",
    note: "Boiling water is the main cost — batch this meal when fuel and water allow."
  },
  {
    id: "op13", name: "Jambalaya-Style Rice", cat: "onepot",
    tags: ["protein", "comfort"],
    serves: 4, time: "30 min", water: "About 2 1/4 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 1/2 cups instant rice", "1 can (14.5 oz) diced tomatoes", "1/2 cup canned ham, diced", "1/2 cup canned corn, drained", "1 tsp Cajun seasoning", "3/4 cup water"],
    prep: ["Combine tomatoes, ham, corn, seasoning and water; simmer 8 minutes.", "Stir in rice; cover off heat 5–10 minutes.", "Fluff; adjust seasoning."],
    subs: "Canned shrimp-style substitutes are rare — canned chicken works well.",
    note: "Cajun seasoning carries the flavor; mild version for kids with just salt and onion powder."
  },
  {
    id: "op14", name: "Tex-Mex Rice Bowls", cat: "onepot",
    tags: ["kid", "protein", "budget"],
    serves: 4, time: "25 min", water: "About 2 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 1/2 cups instant rice", "1 can (15 oz) black or pinto beans, drained", "1 cup salsa", "1 tsp taco seasoning", "1 cup water", "Shelf-stable cheese and crackers to top"],
    prep: ["Combine beans, salsa, seasoning and water; simmer 8 minutes.", "Stir in rice; cover off heat 5–10 minutes.", "Serve with toppings on the side."],
    subs: "Corn added; canned chicken for extra protein; build-your-own format for picky eaters.",
    note: "Build-your-own bowls let each person control spice level."
  },
  {
    id: "op15", name: "Creamy Chicken and Noodles", cat: "onepot",
    tags: ["comfort", "protein"],
    serves: 4, time: "25 min", water: "About 6 cups for boiling", fuel: "Moderate", dishes: 1,
    ing: ["8 oz egg noodles", "1 can (12.5 oz) chicken, drained", "1 can (10.75 oz) cream-style soup", "3/4 cup shelf-stable milk", "Black pepper, dried parsley"],
    prep: ["Boil noodles; drain.", "Stir soup, milk, chicken and seasonings into the pot.", "Warm through gently."],
    subs: "Rice instead of noodles; canned ham or turkey.",
    note: "Freezes beautifully as a normal-week meal too — part of the store-what-you-eat rotation."
  },
  {
    id: "op16", name: "Minestrone-Style Pantry Soup", cat: "onepot",
    tags: ["budget"],
    serves: 4, time: "30 min", water: "About 6 cups", fuel: "Moderate", dishes: 1,
    ing: ["5 cups broth (bouillon + water)", "1 can (14.5 oz) diced tomatoes", "1 can (15 oz) white beans, drained", "1/2 cup small pasta", "1 cup canned mixed vegetables, drained", "Italian seasoning"],
    prep: ["Bring broth and tomatoes to a simmer.", "Add pasta and vegetables; cook per pasta package.", "Add beans last to warm; season."],
    subs: "Rice instead of pasta; any beans; add shelf-stable pesto if stocked.",
    note: "A clean template for using up random cans — see the meal formula in Chapter 8."
  },
  {
    id: "op17", name: "Salmon Rice Pilaf", cat: "onepot",
    tags: ["protein"],
    serves: 3, time: "25 min", water: "About 2 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 cup instant rice", "1 can (14.75 oz) salmon, drained", "1 can (10.75 oz) condensed soup (chicken or mushroom)", "1 cup water", "1/4 cup dehydrated vegetables", "Black pepper, dried dill (optional)"],
    prep: ["Combine soup, water and vegetables; simmer 5 minutes.", "Stir in rice and salmon; cover off heat 5–10 minutes.", "Fluff; season."],
    subs: "Canned tuna or chicken instead of salmon.",
    note: "Fish allergy: swap proteins. Salmon bones are edible and calcium-rich — remove if preferred."
  },
  {
    id: "op18", name: "Curried Rice and Lentils", cat: "onepot",
    tags: ["protein", "budget"],
    serves: 4, time: "30 min", water: "About 3 cups", fuel: "Moderate", dishes: 1,
    ing: ["1/2 cup red lentils, rinsed", "1 cup instant rice", "2 1/2 cups water or broth", "1 tbsp bouillon", "1–2 tsp curry powder", "1/2 cup canned coconut milk (optional)", "Salt"],
    prep: ["Simmer lentils in water with bouillon and curry 12–15 minutes.", "Stir in rice and coconut milk; cover off heat 5 minutes.", "Season."],
    subs: "Chili powder or taco seasoning instead of curry; skip coconut milk if not stocked.",
    note: "Mild for kids by cutting curry powder to 1/2 teaspoon; hot sauce at the table for adults."
  },
  {
    id: "op19", name: "Tomato-Tuna Rice Skillet", cat: "onepot",
    tags: ["protein", "budget"],
    serves: 3, time: "25 min", water: "About 2 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 cup instant rice", "1 can (14.5 oz) diced tomatoes", "2 cans tuna, drained", "1/2 cup water", "1 tsp Italian seasoning", "Shelf-stable cheese (optional)"],
    prep: ["Simmer tomatoes, water and seasoning 5 minutes.", "Stir in rice; cover off heat 5 minutes.", "Fold in tuna; top with cheese if stocked."],
    subs: "Canned chicken instead of tuna; olives added for adults.",
    note: "Fish allergy: use chicken."
  },
  {
    id: "op20", name: "Ham and Split Pea Stew", cat: "onepot",
    tags: ["protein"],
    serves: 4, time: "45 min", water: "About 6 cups", fuel: "High", dishes: 1,
    ing: ["1 cup split peas, rinsed", "6 cups water or broth", "3/4 cup canned ham, diced", "1 tsp bouillon", "Onion powder, black pepper"],
    prep: ["Combine peas, water, bouillon and seasonings.", "Simmer 30 minutes; add ham for the final 10 minutes.", "Simmer until thick; season."],
    subs: "Lentils cut cook time roughly in half.",
    note: "Plan this for a day when fuel is plentiful, or finish it with the insulated-pot method."
  },
  {
    id: "op21", name: "Alfredo-Style Pasta", cat: "onepot",
    tags: ["kid", "comfort"],
    serves: 3, time: "25 min", water: "About 6 cups for boiling", fuel: "Moderate", dishes: 1,
    ing: ["8 oz fettuccine or spaghetti", "1 cup shelf-stable milk", "3 tbsp shelf-stable cheese sauce or cheese powder", "1 tbsp butter powder or oil", "Black pepper, garlic powder"],
    prep: ["Boil pasta; drain, reserving 1/4 cup water.", "Warm milk, cheese and butter powder in the pot.", "Toss pasta with sauce, loosening with reserved water."],
    subs: "Canned chicken added; olive-oil-and-garlic version if dairy-free.",
    note: "Dairy-free: olive oil, garlic powder and a splash of pasta water make a light aglio-e-olio instead."
  },
  {
    id: "op22", name: "Spanish Rice with Black Beans", cat: "onepot",
    tags: ["budget", "protein"],
    serves: 4, time: "25 min", water: "About 2 cups", fuel: "Moderate", dishes: 1,
    ing: ["1 1/2 cups instant rice", "1 can (14.5 oz) diced tomatoes with green chiles", "1 can (15 oz) black beans, drained", "1 tsp cumin", "3/4 cup water", "Hot sauce (optional)"],
    prep: ["Combine tomatoes, beans, cumin and water; simmer 8 minutes.", "Stir in rice; cover off heat 5–10 minutes.", "Fluff; serve with hot sauce."],
    subs: "Corn stirred in; mild tomatoes for kids.",
    note: "One of the cheapest dinners on this list per serving."
  },
  {
    id: "op23", name: "Chili Potato Skillet", cat: "onepot",
    tags: ["kid", "protein", "comfort"],
    serves: 3, time: "15 min", water: "About 1 1/4 cups", fuel: "Low", dishes: 1,
    ing: ["2 cups instant potato flakes", "1 1/4 cups hot water", "1 can (15 oz) chili", "Shelf-stable cheese or crackers"],
    prep: ["Warm chili in the pot.", "Fold potato flakes into hot water alongside or in the same pot off heat.", "Layer mash and chili; top."],
    subs: "Canned stew instead of chili; corn on the side.",
    note: "Under 15 minutes start to finish — a strong first-hot-meal after an outage."
  },
  {
    id: "op24", name: "Pancakes from the Pantry", cat: "onepot",
    tags: ["breakfast", "kid", "comfort"],
    serves: 3, time: "20 min", water: "About 1 1/2 cups", fuel: "Moderate", dishes: 2,
    ing: ["2 cups complete pancake mix (water-only type)", "1 1/2 cups water (per mix label)", "2 tbsp oil", "Syrup, honey or jam to serve"],
    prep: ["Stir mix and water just until combined — lumps are fine.", "Heat oil in a skillet over medium heat.", "Pour 1/4-cup rounds; flip when bubbles form; cook until golden."],
    subs: "Add peanut butter on top for protein; mashed canned fruit as a topping.",
    note: "Choose 'complete' or 'just add water' mixes for emergencies. Skillet is the only true cooking surface needed."
  },
  {
    id: "op25", name: "One-Pot Rice and Chicken Soup", cat: "onepot",
    tags: ["protein", "comfort"],
    serves: 4, time: "30 min", water: "About 7 cups", fuel: "Moderate", dishes: 1,
    ing: ["6 cups broth (bouillon + water)", "3/4 cup white rice", "1 can (12.5 oz) chicken, drained", "1 cup canned mixed vegetables, drained", "Salt, pepper, dried parsley"],
    prep: ["Bring broth to a simmer; add rice.", "Simmer covered 15–18 minutes until rice is tender.", "Add chicken and vegetables; simmer 5 minutes; season."],
    subs: "Noodles instead of rice (add later, cook per package).",
    note: "Plain white rice stores longer than brown — for soup storage, white is the practical choice."
  },
  {
    id: "op26", name: "Bean and Cheese-Style Bowls", cat: "onepot",
    tags: ["kid", "protein", "budget"],
    serves: 4, time: "20 min", water: "About 1 cup", fuel: "Low", dishes: 1,
    ing: ["2 cans (15 oz each) pinto or black beans, drained", "1 cup salsa", "1 tsp taco seasoning", "1/2 cup water", "Shelf-stable cheese sauce to top", "Crackers or instant rice as base"],
    prep: ["Warm beans with salsa, seasoning and water 10 minutes.", "Mash lightly.", "Serve over crackers or instant rice with cheese sauce on top."],
    subs: "Corn added; mild salsa for kids; hot sauce for adults.",
    note: "The bean-and-cheese comfort bowl from the familiar-foods list, built entirely shelf-stable."
  },
];

// Category and tag metadata used by the renderer and index
export const CAT_META = {
  nocook:  { label: "No-Cook",            color: "recipe--nocook" },
  hotwater:{ label: "Hot-Water",          color: "recipe--hotwater" },
  onepot:  { label: "One-Pot",            color: "recipe--onepot" },
};
export const TAG_META = {
  breakfast: "Breakfast", kid: "Kid-friendly", protein: "High-protein",
  evac: "Evacuation-ready", lowwater: "Low-water", budget: "Budget",
  comfort: "Comfort food",
};
export const REQUIRED_COUNTS = [
  { key: "nocook",   label: "No-cook meals",          test: r => r.cat === "nocook",   min: 20 },
  { key: "hotwater", label: "Hot-water meals",        test: r => r.cat === "hotwater", min: 20 },
  { key: "onepot",   label: "One-pot meals",          test: r => r.cat === "onepot",   min: 25 },
  { key: "breakfast",label: "Emergency breakfasts",   test: r => r.tags.includes("breakfast"), min: 10 },
  { key: "kid",      label: "Child-friendly meals",   test: r => r.tags.includes("kid"),       min: 10 },
  { key: "protein",  label: "High-protein meals",     test: r => r.tags.includes("protein"),   min: 10 },
  { key: "evac",     label: "Evacuation-friendly",    test: r => r.tags.includes("evac"),      min: 10 },
  { key: "lowwater", label: "Low-water meals",        test: r => r.tags.includes("lowwater"),  min: 10 },
  { key: "budget",   label: "Budget meals",           test: r => r.tags.includes("budget"),    min: 10 },
];
