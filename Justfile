sync-comics: fetch-comics combine-comics

# Fetch all the comics from xkcd.com
fetch-comics:
  #!/usr/bin/env zsh
  set -euo pipefail
  # echo "Fetching comics"
  cd comics
  LATEST=$(curl -s "https://xkcd.com/info.0.json" | jq '.num')
  for i in $(seq 1 ${LATEST}); do
    # Skip comic #404 (very funny, Randall)
    if [ ${i} -eq 404 ]; then continue; fi
    # Skip any comic that already exists
    if [ -f "${i}.json" ]; then continue; fi
    echo "Fetching comic #${i}"
    curl -s "https://xkcd.com/${i}/info.0.json" > "${i}.json";
  done

# Combine all the comics into one JSON file
combine-comics:
  #!/usr/bin/env node
  (async () => {
    // console.log("Combining comics")
    const fs = require("fs/promises");
    const files = await fs.readdir("./comics");
    const data = "[\n" + (
      (await Promise.all(
        files
          .map((filepath) => parseInt(filepath.replace(".json", "")))
          .sort((a, b) => a - b)
          .map((filenum) => fs.readFile(`./comics/${filenum}.json`, "utf-8"))
      ))
        .map((json) => `  ${json},`)
        .join("\n").slice(0, -1)
    ) + "\n]";
    fs.writeFile("./src/lib/comics.json", data);
  })();
