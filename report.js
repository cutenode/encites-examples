const { getPublicGitHubEvents, filterPublicGitHubEvents, getEventsFrom, writeEventsFile, writeMarkdownFile, writeMegafile } = require('encites')
const dates = require('./lib/dates')

async function teamData () {
  const paths = {
    data: './output/data/', // path to write all our files to.
    raw: './output/raw/', // path to write raw GitHub data to - this allows us to consume it later as we add more events to output
    markdownOutputDir: './output/' // the path that we'll write our markdown files to
  }

  const filenames = {
    megafile: 'megafile.json', // name of the megafile. can be whatever, I've just chosen megafile. Needs to be JSON.
    markdown: 'report.md' // name of the markdown file we're going to write. Needs to be Markdown.
  }

  // GitHub usernames we're going to collect public GitHub API data for
  const users = ['bnb']

  // fetch data from GitHub
  const rawData = await getPublicGitHubEvents(users)
  // fetches public data from  the GitHub API
  const data = await filterPublicGitHubEvents(rawData)

  // save our publicData for future use
  writeEventsFile(`${paths.raw}`, rawData)
  // attempt to save our data as a Megafile
  writeMegafile(`${paths.raw}`, filenames.megafile)

  // write single instance of data
  writeEventsFile(`${paths.data}`, data)
  // write the megafile
  writeMegafile(`${paths.data}`, filenames.megafile)

  // gets all data locally from the megafile, filtering out events *before* the date passed
  const dateFilteredEvents = await getEventsFrom.period(`${paths.data}${filenames.megafile}`, dates.checkFrom, dates.checkUntil)

  // write the markdown to the correct location
  writeMarkdownFile(paths.markdownOutputDir, filenames.markdown, dateFilteredEvents, `Weekly Open Source Report: ${dates.now.toISODate()}`)
}

teamData()
