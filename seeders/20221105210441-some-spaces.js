"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "testSpace1",
          description: "descriptionspace1",
          // backgroundColor: "",
          // color: "",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "testSpace2",
          description: "descriptionspace2",
          // backgroundColor: "",
          // color: "",
          userId: 2,
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
