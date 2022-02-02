# encites examples

This is a repo for example usage of [encites](https://github.com/cutenode/encites).

## Examples

### report.js

This is a basic report that you can run, showing off the most complicated potential usage of the encites API. It saves raw data, filtered data, timestamped Markdown files (via [luxon](https://npm.im/luxon)), and overwrites `report.md` with the most recent markdown output.

> **Note:** As of encites@3.0.0, there is a bug in encites when writing new directories. If you encounter this when running this on your own, just run it a couple times and the directories will resolve themselves. This will be  resolved in a future release of encites.

To generate a report:

1. Clone the repo
1. Remove the `output/` directory (`rm -rf ./output`)
1. Update the `people` array in [util/people.js](util/people.js) with your GitHub username
1. Configure [GitHub authentication](https://github.com/cutenode/encites#environment-variables)
1. Install the project's dependencies
    ```console
    npm install
    ```
1. Run the example report generator
    ```console
    node report.js # or `npm run report`
    ```

This will generate data and Markdown in `/output/`.

### Running with GitHub Actions

ecnites is designed to be run on a cron, so you consistently get data and can backfill any new GitHub events that encites adds in future versions from raw data that it outputs.

There's an exmaple GitHub action in this repository. You'll likely be able to copy/paste most of it, and modify it as necessary to suit your needs. You will be able to see example runs in the Actions tab of this repository.

## More Information

See [encites](https://github.com/cutenode/encites) for more information on encites and the API it provides.
