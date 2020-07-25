var ghpages = require("gh-pages");

ghpages.publish("out", function (err) {
  console.log(err);
});
