const commonConfig = require('../../gulpfile')
const gulp = require('gulp')
const fs = require('fs')
const fse = require('fs-extra')
const fg = require('fast-glob')
const gm = require('gray-matter')

async function getDesc(mdPath) {
  if (!fs.existsSync(mdPath)) {
    return
  }
  const mdFile = fs.readFile(mdPath, 'utf8')
  const { content } = gm(mdFile)
  let description = (content.replace(/\r\n/g, '\n')
                      .match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.n)/m) || [])[1] || ''

  description = description.trim()
  description = description.charAt(0).toLowerCase() + description.slice(1)

  return description
}

async function getMetaData() {
  const metaData = {
    functions: []
  }
  const hooks = fg.async(
    'src/use*',
    {
      onlyDirectories: true
    }
  )
  .map((hook) => hook.replace('src/', ''))
  .sort()
  await Promise.allSettled(
    hooks.map(async (hook) => {
      const description = await getDesc(`src/${hook}/index.md`)

      return {
        name: hook,
        description
      }
    }).then((res) => {
      metaData.functions = res.map((item) => {
        if (item.status === 'fulfilled') {
          return item.value
        }
        return null
      })

      return metaData
    })
  )
}

gulp.task('metaData', async function() {
  const metaData = await getMetaData()
  await fse.writeJson('metaData.json', metaData, { spaces: 2 })
})

gulp.series(commonConfig.default, 'metaData')
