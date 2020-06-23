exports.seed = function (knex) {
  return knex("savedRecommendations").insert([
    { user_id: 1, strain: "SUPER WEED! (BONUS WEED)" },
    {
      user_id: 1,
      strain: "YOU'RE JUST SMOKING A ROLLED UP OIL PAINTING????",
    },
    { user_id: 2, strain: "CATNIP" },
  ]);
};
