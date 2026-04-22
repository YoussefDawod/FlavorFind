/**
 * Mock-Daten im Format echter Spoonacular-API-Antworten.
 * Wird als Fallback verwendet, wenn VITE_USE_MOCKS=true oder kein API-Key gesetzt ist.
 * Struktur entspricht den realen Endpoints — so kann die UI identisch gerendert werden.
 */

const MOCK_RECIPES = [
  {
    id: 10001,
    title: "Spaghetti Carbonara mit Guanciale",
    image:
      "https://images.unsplash.com/photo-1608796432938-4c2b96b93b1b?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 25,
    servings: 4,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 94,
    healthScore: 42,
    pricePerServing: 312.5,
    cuisines: ["Italian", "Mediterranean"],
    dishTypes: ["main course", "dinner"],
    diets: [],
    occasions: [],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    veryPopular: true,
    cheap: false,
    summary:
      "Ein klassisches römisches Pastagericht — Eigelb, Pecorino und knuspriger Guanciale umhüllen heiße Spaghetti zu einer samtigen Sauce. Kein Sahne-Streich, kein Schnickschnack.",
    extendedIngredients: [
      {
        id: 11291,
        name: "Spaghetti",
        amount: 400,
        unit: "g",
        original: "400 g Spaghetti",
      },
      { id: 1123, name: "Eigelb", amount: 4, unit: "", original: "4 Eigelb" },
      {
        id: 1033,
        name: "Pecorino Romano",
        amount: 80,
        unit: "g",
        original: "80 g Pecorino Romano, gerieben",
      },
      {
        id: 10410123,
        name: "Guanciale",
        amount: 150,
        unit: "g",
        original: "150 g Guanciale, gewürfelt",
      },
      {
        id: 1002030,
        name: "Schwarzer Pfeffer",
        amount: 1,
        unit: "TL",
        original: "1 TL frisch gemahlener schwarzer Pfeffer",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          { number: 1, step: "Salzwasser für die Pasta aufsetzen." },
          {
            number: 2,
            step: "Guanciale in einer großen Pfanne ohne Fett knusprig auslassen.",
          },
          {
            number: 3,
            step: "Spaghetti 1 Minute kürzer als Packungsangabe kochen.",
          },
          { number: 4, step: "Eigelb mit Pecorino und Pfeffer verquirlen." },
          {
            number: 5,
            step: "Pasta zu Guanciale geben, Herd ausschalten, Ei-Käse-Masse einrühren, mit Pastawasser zu samtiger Sauce strecken.",
          },
        ],
      },
    ],
  },
  {
    id: 10002,
    title: "Marokkanische Lamm-Tajine mit Aprikosen",
    image:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 120,
    servings: 6,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 89,
    healthScore: 56,
    pricePerServing: 485.0,
    cuisines: ["Moroccan", "Middle Eastern"],
    dishTypes: ["main course", "dinner"],
    diets: ["gluten free", "dairy free"],
    occasions: ["fall", "winter"],
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: true,
    veryHealthy: true,
    veryPopular: false,
    cheap: false,
    summary:
      "Zart geschmortes Lammschulter in einer Sauce aus Honig, Zimt und getrockneten Aprikosen. Serviert mit gerösteten Mandeln und Couscous.",
    extendedIngredients: [
      {
        id: 10123,
        name: "Lammschulter",
        amount: 1.2,
        unit: "kg",
        original: "1,2 kg Lammschulter, gewürfelt",
      },
      {
        id: 11282,
        name: "Zwiebel",
        amount: 2,
        unit: "",
        original: "2 große Zwiebeln",
      },
      {
        id: 9032,
        name: "Getrocknete Aprikosen",
        amount: 200,
        unit: "g",
        original: "200 g getrocknete Aprikosen",
      },
      {
        id: 19296,
        name: "Honig",
        amount: 3,
        unit: "EL",
        original: "3 EL Honig",
      },
      { id: 2010, name: "Zimt", amount: 1, unit: "TL", original: "1 TL Zimt" },
      {
        id: 12061,
        name: "Mandeln",
        amount: 50,
        unit: "g",
        original: "50 g geröstete Mandeln",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          { number: 1, step: "Lamm in Olivenöl rundum scharf anbraten." },
          { number: 2, step: "Zwiebeln hinzufügen und 5 Minuten mitdünsten." },
          {
            number: 3,
            step: "Mit Brühe ablöschen, Gewürze und Aprikosen einrühren.",
          },
          {
            number: 4,
            step: "Zugedeckt 90 Minuten bei niedriger Hitze schmoren.",
          },
          {
            number: 5,
            step: "Mit Honig abrunden, 10 Minuten offen einkochen, mit Mandeln bestreuen.",
          },
        ],
      },
    ],
  },
  {
    id: 10003,
    title: "Miso-glasierter Lachs mit Sesam-Spinat",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 30,
    servings: 2,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 91,
    healthScore: 78,
    pricePerServing: 562.0,
    cuisines: ["Japanese", "Asian"],
    dishTypes: ["main course", "dinner"],
    diets: ["pescetarian", "dairy free"],
    occasions: [],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: true,
    veryPopular: true,
    cheap: false,
    summary:
      "Süß-umami Miso-Glasur karamellisiert auf Lachs unter dem Grill, dazu Spinat mit geröstetem Sesam — schnell, gesund und eindrucksvoll.",
    extendedIngredients: [
      {
        id: 15076,
        name: "Lachsfilet",
        amount: 2,
        unit: "Stück",
        original: "2 Lachsfilets à 180 g",
      },
      {
        id: 16112,
        name: "Weißes Miso",
        amount: 3,
        unit: "EL",
        original: "3 EL weißes Miso",
      },
      {
        id: 16124,
        name: "Mirin",
        amount: 2,
        unit: "EL",
        original: "2 EL Mirin",
      },
      {
        id: 19296,
        name: "Honig",
        amount: 1,
        unit: "EL",
        original: "1 EL Honig",
      },
      {
        id: 11457,
        name: "Babyspinat",
        amount: 300,
        unit: "g",
        original: "300 g Babyspinat",
      },
      {
        id: 12023,
        name: "Sesam",
        amount: 2,
        unit: "EL",
        original: "2 EL gerösteter Sesam",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: "Miso, Mirin und Honig zu einer Paste verrühren.",
          },
          {
            number: 2,
            step: "Lachs damit bestreichen und 10 Minuten marinieren.",
          },
          {
            number: 3,
            step: "Unter dem Ofengrill 6–8 Minuten garen, bis die Oberfläche karamellisiert.",
          },
          { number: 4, step: "Spinat kurz in Sesamöl zusammenfallen lassen." },
          { number: 5, step: "Mit Sesam bestreuen, Lachs anrichten." },
        ],
      },
    ],
  },
  {
    id: 10004,
    title: "Ofen-Risotto mit Steinpilzen",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 45,
    servings: 4,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 87,
    healthScore: 38,
    pricePerServing: 298.0,
    cuisines: ["Italian"],
    dishTypes: ["main course", "dinner"],
    diets: ["vegetarian", "gluten free"],
    occasions: ["fall", "winter"],
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    veryHealthy: false,
    veryPopular: false,
    cheap: true,
    summary:
      "Kein Rühren, keine Panik: Risotto im Ofen schmort in einem Zug zu cremiger Perfektion. Steinpilze liefern tiefe Umami-Wärme.",
    extendedIngredients: [
      {
        id: 10020444,
        name: "Arborio-Reis",
        amount: 320,
        unit: "g",
        original: "320 g Arborio-Reis",
      },
      {
        id: 11260,
        name: "Getrocknete Steinpilze",
        amount: 30,
        unit: "g",
        original: "30 g getrocknete Steinpilze",
      },
      {
        id: 6194,
        name: "Gemüsebrühe",
        amount: 1,
        unit: "l",
        original: "1 l heiße Gemüsebrühe",
      },
      {
        id: 14106,
        name: "Weißwein",
        amount: 150,
        unit: "ml",
        original: "150 ml trockener Weißwein",
      },
      {
        id: 1033,
        name: "Parmesan",
        amount: 60,
        unit: "g",
        original: "60 g geriebener Parmesan",
      },
      {
        id: 1001,
        name: "Butter",
        amount: 40,
        unit: "g",
        original: "40 g kalte Butter",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: "Steinpilze 20 Minuten in heißem Wasser einweichen.",
          },
          {
            number: 2,
            step: "Reis mit Wein, Brühe und Pilzwasser in Bräter geben.",
          },
          { number: 3, step: "Zugedeckt 25 Minuten bei 180 °C backen." },
          {
            number: 4,
            step: "Butter und Parmesan einrühren, 2 Minuten ruhen lassen.",
          },
          { number: 5, step: "Mit Kräutern und Pfeffer servieren." },
        ],
      },
    ],
  },
  {
    id: 10005,
    title: "Shakshuka mit Feta und Sumak",
    image:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 35,
    servings: 4,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 85,
    healthScore: 65,
    pricePerServing: 185.0,
    cuisines: ["Middle Eastern"],
    dishTypes: ["breakfast", "brunch", "main course"],
    diets: ["vegetarian", "gluten free"],
    occasions: [],
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    veryHealthy: true,
    veryPopular: true,
    cheap: true,
    summary:
      "Pochierte Eier in würziger Tomaten-Paprika-Sauce mit geräuchertem Paprika, gekrönt von Feta und säuerlichem Sumak. Frühstück oder Abendessen — beides funktioniert.",
    extendedIngredients: [
      {
        id: 11529,
        name: "Dosentomaten",
        amount: 800,
        unit: "g",
        original: "800 g stückige Dosentomaten",
      },
      { id: 1123, name: "Eier", amount: 6, unit: "", original: "6 Eier" },
      {
        id: 11821,
        name: "Rote Paprika",
        amount: 2,
        unit: "",
        original: "2 rote Paprika",
      },
      {
        id: 1019,
        name: "Feta",
        amount: 150,
        unit: "g",
        original: "150 g Feta",
      },
      {
        id: 2028,
        name: "Geräuchertes Paprikapulver",
        amount: 2,
        unit: "TL",
        original: "2 TL geräuchertes Paprikapulver",
      },
      {
        id: 2042,
        name: "Sumak",
        amount: 1,
        unit: "TL",
        original: "1 TL Sumak",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: "Paprika und Zwiebel in Olivenöl weich schmoren.",
          },
          { number: 2, step: "Mit Paprikapulver und Kreuzkümmel würzen." },
          { number: 3, step: "Tomaten einrühren, 15 Minuten köcheln lassen." },
          {
            number: 4,
            step: "Mulden in die Sauce drücken und Eier hineinschlagen.",
          },
          {
            number: 5,
            step: "Zugedeckt 5–7 Minuten stocken lassen, mit Feta und Sumak bestreuen.",
          },
        ],
      },
    ],
  },
  {
    id: 10006,
    title: "Koreanisches Bibimbap mit Bulgogi",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 50,
    servings: 2,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 88,
    healthScore: 72,
    pricePerServing: 410.0,
    cuisines: ["Korean", "Asian"],
    dishTypes: ["main course", "lunch", "dinner"],
    diets: ["dairy free"],
    occasions: [],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: true,
    veryPopular: true,
    cheap: false,
    summary:
      "Ein warmes Reisbett, gekrönt von mariniertem Bulgogi, knackigem Gemüse, Kimchi und Spiegelei — mit einem Klecks feurigem Gochujang verrührt.",
    extendedIngredients: [
      {
        id: 20444,
        name: "Sushi-Reis",
        amount: 200,
        unit: "g",
        original: "200 g Sushi-Reis",
      },
      {
        id: 23213,
        name: "Rinderhüfte",
        amount: 250,
        unit: "g",
        original: "250 g Rinderhüfte, dünn geschnitten",
      },
      {
        id: 11124,
        name: "Karotte",
        amount: 1,
        unit: "",
        original: "1 Karotte in Streifen",
      },
      {
        id: 11206,
        name: "Gurke",
        amount: 1,
        unit: "",
        original: "1 halbe Gurke in Streifen",
      },
      { id: 1123, name: "Ei", amount: 2, unit: "", original: "2 Spiegeleier" },
      {
        id: 16124,
        name: "Gochujang",
        amount: 2,
        unit: "EL",
        original: "2 EL Gochujang",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          {
            number: 1,
            step: "Rindfleisch mit Sojasauce, Sesamöl, Knoblauch und braunem Zucker marinieren.",
          },
          { number: 2, step: "Reis kochen, warm halten." },
          { number: 3, step: "Gemüse einzeln kurz in Sesamöl anbraten." },
          { number: 4, step: "Rindfleisch in heißer Pfanne scharf braten." },
          {
            number: 5,
            step: "Reis in Schalen verteilen, mit Gemüse, Fleisch, Spiegelei und Gochujang toppen.",
          },
        ],
      },
    ],
  },
  {
    id: 10007,
    title: "Tarte au Citron mit gebrannter Baiser",
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 90,
    servings: 8,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 92,
    healthScore: 14,
    pricePerServing: 215.0,
    cuisines: ["French"],
    dishTypes: ["dessert"],
    diets: ["vegetarian"],
    occasions: ["dinner party"],
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    veryPopular: true,
    cheap: true,
    summary:
      "Mürbeteig-Tarte, gefüllt mit intensiv-fruchtigem Zitronen-Curd, gekrönt von italienischem Baiser und goldbraun geflämmt — französische Dessertklassik mit theatralischem Finale.",
    extendedIngredients: [
      {
        id: 20081,
        name: "Mehl",
        amount: 250,
        unit: "g",
        original: "250 g Mehl",
      },
      {
        id: 1001,
        name: "Butter",
        amount: 125,
        unit: "g",
        original: "125 g kalte Butter",
      },
      {
        id: 9150,
        name: "Zitronen",
        amount: 4,
        unit: "",
        original: "4 Bio-Zitronen",
      },
      {
        id: 1123,
        name: "Eier",
        amount: 4,
        unit: "",
        original: "4 Eier + 3 Eiweiß",
      },
      {
        id: 19335,
        name: "Zucker",
        amount: 250,
        unit: "g",
        original: "250 g Zucker",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          { number: 1, step: "Mürbeteig kneten, 30 Minuten kühlen." },
          { number: 2, step: "Teig ausrollen, Form auskleiden, blindbacken." },
          {
            number: 3,
            step: "Zitronen-Curd aus Saft, Zesten, Eiern, Zucker und Butter im Wasserbad rühren.",
          },
          { number: 4, step: "Curd einfüllen, 10 Minuten backen." },
          {
            number: 5,
            step: "Italienisches Baiser aufspritzen und mit Brenner flämmen.",
          },
        ],
      },
    ],
  },
  {
    id: 10008,
    title: "Rote-Linsen-Dal mit Kokosmilch",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop",
    imageType: "jpg",
    readyInMinutes: 35,
    servings: 4,
    sourceName: "FlavorFind Demo",
    sourceUrl: "https://flavorfind.yellowdeveloper.de",
    spoonacularScore: 82,
    healthScore: 94,
    pricePerServing: 125.0,
    cuisines: ["Indian", "Asian"],
    dishTypes: ["main course", "lunch", "dinner"],
    diets: ["vegan", "vegetarian", "gluten free", "dairy free"],
    occasions: [],
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    veryHealthy: true,
    veryPopular: true,
    cheap: true,
    summary:
      "Cremig, würzig, tröstlich: rote Linsen zerfallen zu samtigem Dal, Kokosmilch macht es rund, Kreuzkümmel und Koriander geben Tiefe. Ein Feiertag für Vorratskammer-Köch:innen.",
    extendedIngredients: [
      {
        id: 16069,
        name: "Rote Linsen",
        amount: 250,
        unit: "g",
        original: "250 g rote Linsen",
      },
      {
        id: 12117,
        name: "Kokosmilch",
        amount: 400,
        unit: "ml",
        original: "400 ml Kokosmilch",
      },
      {
        id: 11216,
        name: "Ingwer",
        amount: 2,
        unit: "cm",
        original: "2 cm Ingwer, gerieben",
      },
      {
        id: 2014,
        name: "Kreuzkümmel",
        amount: 1,
        unit: "TL",
        original: "1 TL Kreuzkümmel",
      },
      {
        id: 2012,
        name: "Korianderpulver",
        amount: 1,
        unit: "TL",
        original: "1 TL Korianderpulver",
      },
      {
        id: 11215,
        name: "Knoblauch",
        amount: 3,
        unit: "Zehen",
        original: "3 Knoblauchzehen",
      },
    ],
    analyzedInstructions: [
      {
        steps: [
          { number: 1, step: "Zwiebel, Knoblauch und Ingwer in Öl andünsten." },
          { number: 2, step: "Gewürze 30 Sekunden mitrösten." },
          { number: 3, step: "Linsen, Kokosmilch und 400 ml Wasser zugeben." },
          { number: 4, step: "20 Minuten köcheln, bis die Linsen zerfallen." },
          {
            number: 5,
            step: "Mit Limettensaft und frischem Koriander abrunden.",
          },
        ],
      },
    ],
  },
];

function clone(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

function matchesFilters(recipe, { query, cuisine, diet }) {
  if (query) {
    const needle = query.toLowerCase();
    const haystack = `${recipe.title} ${recipe.summary}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  if (cuisine) {
    const target = cuisine.toLowerCase();
    if (!recipe.cuisines?.some((c) => c.toLowerCase() === target)) return false;
  }
  if (diet) {
    const target = diet.toLowerCase();
    if (!recipe.diets?.some((d) => d.toLowerCase() === target)) return false;
  }
  return true;
}

export function mockRandomRecipes({ number = 8, tags } = {}) {
  let pool = MOCK_RECIPES;
  if (tags?.length) {
    const targets = tags.map((t) => t.toLowerCase());
    pool = pool.filter((r) =>
      targets.every(
        (t) =>
          r.cuisines?.some((c) => c.toLowerCase() === t) ||
          r.dishTypes?.some((d) => d.toLowerCase() === t) ||
          r.diets?.some((d) => d.toLowerCase() === t),
      ),
    );
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return clone(shuffled.slice(0, number));
}

export function mockRecipeSearch({
  query,
  cuisine,
  diet,
  number = 12,
  offset = 0,
} = {}) {
  const filtered = MOCK_RECIPES.filter((r) =>
    matchesFilters(r, { query, cuisine, diet }),
  );
  const sliced = filtered.slice(offset, offset + number);
  return {
    results: clone(sliced),
    totalResults: filtered.length,
    offset,
    number: sliced.length,
  };
}

export function mockRecipeDetail(id) {
  const numericId = Number.parseInt(id, 10);
  const found = MOCK_RECIPES.find((r) => r.id === numericId) ?? MOCK_RECIPES[0];
  return clone(found);
}

export function mockFindByIngredients({ ingredients = [], number = 8 } = {}) {
  const needles = ingredients
    .map((i) => i.toLowerCase().trim())
    .filter(Boolean);
  if (needles.length === 0) return [];
  const scored = MOCK_RECIPES.map((recipe) => {
    const names = recipe.extendedIngredients.map((i) => i.name.toLowerCase());
    const used = recipe.extendedIngredients.filter((i) =>
      needles.some((n) => i.name.toLowerCase().includes(n)),
    );
    const missed = recipe.extendedIngredients.filter((i) => !used.includes(i));
    return {
      ...clone(recipe),
      usedIngredientCount: used.length,
      missedIngredientCount: missed.length,
      usedIngredients: clone(used),
      missedIngredients: clone(missed),
      likes: recipe.spoonacularScore,
      _score: used.length - missed.length * 0.3,
      _hasMatch: used.length > 0,
      _names: names,
    };
  })
    .filter((r) => r._hasMatch)
    .sort((a, b) => b._score - a._score)
    .slice(0, number)
    .map(({ _score, _hasMatch, _names, ...rest }) => {
      void _score;
      void _hasMatch;
      void _names;
      return rest;
    });
  return scored;
}

export function mockSimilar(id, { number = 4 } = {}) {
  const numericId = Number.parseInt(id, 10);
  const others = MOCK_RECIPES.filter((r) => r.id !== numericId).slice(
    0,
    number,
  );
  return others.map((r) => ({
    id: r.id,
    title: r.title,
    imageType: r.imageType,
    readyInMinutes: r.readyInMinutes,
    servings: r.servings,
    sourceUrl: r.sourceUrl,
  }));
}
