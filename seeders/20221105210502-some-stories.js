"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "ksvp",

          content: "Good things are coming",
          imageUrl:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          spaceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "JohN",

          content: "Good things are coming",
          imageUrl:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          spaceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "John Doe",

          content: "Good things are coming",
          imageUrl:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
          spaceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Prathima",

          content: "future endeavours",
          imageUrl:
            "https://cdn.webshopapp.com/shops/29614/files/220539995/good-luck-you-can-do-it.jpg",
          spaceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apple test story",
          content:
            "This is a story about testing. I'm writing this so I can test if everything works well. But how does it end?",
          imageUrl: "https://static.dw.com/image/47429859_401.jpg",
          createdAt: new Date("2022-08-25 13:01:48.587+00"),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Lovestory Apples",
          content:
            "This is a story about apples. Apple1 and Apple2 fell in love. They lived happily ever after. The end.",
          imageUrl:
            "https://cdn.quotesgram.com/img/75/81/255487457-Apple-love-quote-hd.jpg",
          createdAt: new Date("2022-08-25 13:02:48.587+00"),
          updatedAt: new Date(),
          spaceId: 2,
        },
        {
          name: "Banana test story",
          content:
            "I'm making a test-final-assessment now. I'm very excited, and I like the errors I got. Because now I'm panicing less than on the real final assessment next week. And I can learn about the errors.",
          imageUrl:
            "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg",
          createdAt: new Date("2022-08-25 13:03:48.587+00"),
          updatedAt: new Date(),
          spaceId: 3,
        },
        {
          name: "Lovestory Bananas",
          content:
            "This is a story about bananas. Banana1 and Banana2 fell in love. They lived happily ever after. The end.",
          imageUrl:
            "https://image.shutterstock.com/image-photo/two-peeled-bananas-arranged-together-260nw-1511590349.jpg",
          createdAt: new Date("2022-08-25 13:04:48.587+00"),
          updatedAt: new Date(),
          spaceId: 4,
        },
        {
          name: "Are Coconuts fruits?",
          content:
            "Botanically speaking, a coconut is a fibrous one-seeded drupe, which is a fruit with a hard stony covering enclosing the seed. A seed is the reproductive unit of a flowering plant.",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/2372/1439/articles/April_Blog_image_1024x.jpg?v=1552159727",
          createdAt: new Date("2022-08-25 13:05:48.587+00"),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Lovestory Coconuts",
          content:
            "This is a love story about Coconuts. Coconut1 and Coconut2 fell in love. They lived happily ever after. The end.",
          imageUrl:
            "https://i.ndtvimg.com/mt/cooks/2012-11/coconut-water_med.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886",
          createdAt: new Date("2022-08-25 13:06:48.587+00"),
          updatedAt: new Date(),
          spaceId: 2,
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
    await queryInterface.bulkDelete("stories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
  },
};
