exports.seed = function (knex) {
  const effects = [
    "Creative",
    "Energetic",
    "Tingly",
    "Euphoric",
    "Relaxed",
    "Aroused",
    "Happy",
    "Uplifted",
    "Hungry",
    "Talkative",
    "None",
    "Giggly",
    "Focused",
    "Sleepy",
    "Dry Mouth",
  ];

  const formattedEffects = effects.map((effect) => {
    return { effect: effect };
  });

  // Deletes ALL existing entries
  return knex("effects")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("effects").insert(formattedEffects);
    });
};
