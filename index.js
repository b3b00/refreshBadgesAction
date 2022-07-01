const core = require("jsgithubactionemulator/core");
const { exec, execSync } = require("child_process");
const path = require("path");
const request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");

function ab2str(buf) {
  return String.fromCharCode.apply(null, buf);
}

try {
  const repository = core.getInput("repository");
  let branch = core.getInput("branch");
  if (!branch) {
    branch = "main";
  }

  const readmeUrl = `https://github.com/${repository}/blob/${branch}/README.md`;

  request(readmeUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let content = cheerio.load(response.body);

      content("img[data-canonical-src]").each(function (i, elem) {
        const cacheSrc = elem["attribs"]["src"];
        const badgeUrl = elem["attribs"]["data-canonical-src"];
        request(
          cacheSrc,
          { method: "PURGE" },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(`cached purged for ${badgeUrl}`);
            } else {
              console.log(`error while purging badge ${badgeUrl}: ${error}`);
            }
          }
        );
      });
    } else {
      console(`readme fetching failed wih : ${error.message}`);
    }
  }).pipe(fs.createWriteStream(`${repository.replace("/", "_")}.md`));
} catch (error) {
  console.log("global error " + error);
  console.log(error.stack);
  core.setFailed(error.message);
}
