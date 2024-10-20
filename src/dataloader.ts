import DataLoader from "dataloader";

type MyObject = {};

const myLoader = new DataLoader<string, MyObject>(async (ids) => {
  console.log(ids);
  return ids.map((id) => {});
});

(async () => {
  await Promise.all([myLoader.load("1"), myLoader.load("2")]);
  await myLoader.load("3");
  myLoader.load("4");
})();

(async () => {
  myLoader.load("5");
  await myLoader.load("6");
  myLoader.load("7");
})();
