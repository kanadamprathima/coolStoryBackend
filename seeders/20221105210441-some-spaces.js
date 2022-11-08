"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "apple",
          description: "this space is about apple",
          backgroundColor: "#fcc7bd",
          color: "#fa2802",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Banana Space",
          description: "This Banana Space is about bananas",
          backgroundColor: "#fcebc2",
          color: "#f7ad00",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: "Coconut Space",
          description: "This Coconut Space is about coconuts",
          backgroundColor: "#c2ecfc",
          color: "#048fc4",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: "Nature",
          description: "this space is about nature",
          backgroundColor: "#c2ecfc",
          color: "048fc4",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("spaces", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
