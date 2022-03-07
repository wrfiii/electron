process.env.NODE_ENV = 'production'

import { build as viteBuild } from 'vite'
import { build as electronBuild2 } from 'electron-builder'
// import { config as builderConfig } from '../configs/electron-builder.cinfig.mjs'
const builderConfig = {
  appId: "74419822@qq.com",
  asar: true,
  directories: {
    output: "release/${version}"
  },
  files: [
    "!node_modules",
    "dist",
    "package.json"
  ],
  mac: {
    artifactName: "${productName}_${version}.${ext}",
    target: [
      "dmg"
    ]
  },
  win: {
    target: [
      {
        target: "nsis",
        arch: [
          "x64"
        ]
      }
    ],
    artifactName: "${productName}_${version}.${ext}"
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false
  }
}

const viteConfigs = {
  preload: './vite.config.ts',
  main: 'package/main/vite.config.ts',
  reactTs: 'package/preload/vite.config.ts',
}

async function buildElectron() {
  for (const [name, configPath] of Object.entries(viteConfigs)) {
    // console.group(TAG, name)
    await viteBuild({ configFile: configPath, mode: process.env.NODE_ENV })
    // console.groupEnd()
    console.log() // for beautiful log.
  }
}

async function packElectron() {
  return electronBuild2({ config: builderConfig })
    .then(result => {
      //   console.log(TAG, chalk.green(`electron-builder.build result - ${result}`))
    })
}

// bootstrap
try {
  await buildElectron()
  await packElectron()
} catch (error) {
  console.error(error)
  process.exit(1)
}
