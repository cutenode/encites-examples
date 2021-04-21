const { getPublicGitHubEvents, filterPublicGitHubEvents, getEventsFrom, writeEventsFile, writeMarkdownFile, writeMegafile } = require('encites')
const { DateTime } = require('luxon')

async function teamData () {
  try {
    const now = DateTime.now()

    // path to write all our files to.
    const dataPath = './output/data/'
    // name of the megafile. can be whatever, I've just chosen megafile. Needs to be JSON.
    const megafileName = 'megafile.json'
    // path to write raw GitHub data to - this allows us to consume it later as we add more events to output
    const rawPath = './output/raw/'

    // markdown path and filename, where we're planning on writing data to
    const markdownPath = './output/'
    const markdownFilename = 'report.md'
    const weeklyHistoricalMarkdownPath = './output/reports/'
    const weeklyHistoricalMarkdownFilename = `${now.toISODate()}.md`

    // teammates we're currently checking
    const users = ['bnb']

    // date that we're going to build a markdown report against
    const dateToCheckFrom = `2021-${now.month.toString().padStart(2, 0)}-01` // yyyy-mm-dd
    const dateToCheckUntil = `2021-${now.month.toString().padStart(2, 0)}-${now.daysInMonth.toString().padStart(2, 0)}` // yyyy-mm-dd

    // fetch data from GitHub
    const rawData = await getPublicGitHubEvents(users)
    // fetches public data from  the GitHub API
    const data = await filterPublicGitHubEvents(rawData)

    // save our publicData for future use
    writeEventsFile(`${rawPath}`, rawData)
    // attempt to save our data as a Megafile?
    writeMegafile(`${rawPath}`, megafileName)

    // write single instance of data
    writeEventsFile(`${dataPath}`, data)
    // write the megafile
    writeMegafile(`${dataPath}`, megafileName)

    // // gets all data locally from the megafile, filtering out events *before* the date passed
    const dateFilteredEvents = await getEventsFrom.period(`${dataPath}${megafileName}`, dateToCheckFrom, dateToCheckUntil)

    // // write the markdown to the correct location
    writeMarkdownFile(markdownPath, markdownFilename, dateFilteredEvents, 'Open Source Engineering Report: Most Recent')
    writeMarkdownFile(weeklyHistoricalMarkdownPath, weeklyHistoricalMarkdownFilename, dateFilteredEvents, `Open Source Engineering Report: Weekly Run at ${now.toISODate()}`)
  } catch (error) {
    throw new Error(error)
  }
}

teamData()
