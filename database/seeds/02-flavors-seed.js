exports.seed = function (knex) {
  const flavors = [
    "Earthy",
    "Sweet",
    "Citrus",
    "Flowery",
    "Violet",
    "Diesel",
    "Spicy/Herbal",
    "Sage",
    "Woody",
    "Apricot",
    "Grapefruit",
    "Orange",
    "None",
    "Pungent",
    "Grape",
    "Pine",
    "Skunk",
    "Berry",
    "Pepper",
    "Menthol",
    "Blue Cheese",
    "Cheese",
    "Chemical",
    "Mango",
    "Lemon",
    "Peach",
    "Vanilla",
    "Nutty",
    "Chestnut",
    "Tea",
    "Tobacco",
    "Tropical",
    "Strawberry",
    "Blueberry",
    "Mint",
    "Apple",
    "Honey",
    "Lavender",
    "Lime",
    "Coffee",
    "Ammonia",
    "Minty",
    "Tree",
    "Fruit",
    "Butter",
    "Pineapple",
    "Tar",
    "Rose",
    "Plum",
    "Pear",
  ];

  const formattedFlavors = flavors.map((flavor) => {
    return { flavor: flavor };
  });

  // Deletes ALL existing entries
  return knex("flavors")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("flavors").insert(formattedFlavors);
    });
};
