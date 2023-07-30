import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import webpack from '@cypress/webpack-preprocessor';
import { promises as fs, constants as fsConstants } from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const WIDTH = 1920;
const HEIGHT = 1080;

export default defineConfig({
  viewportWidth: WIDTH,
  viewportHeight: HEIGHT,
  defaultCommandTimeout: 10000,
  trashAssetsBeforeRuns: true,
  video: true,
  env: {
    failSilently: false,
  },
  e2e: {
    baseUrl: 'http://localhost:4300',
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    testIsolation: false,
    chromeWebSecurity: false,
    specPattern: 'e2e/**/*.feature',
    // supportFile: 'support/e2e.ts',
    supportFile: false,
    downloadsFolder: 'downloads',
    fixturesFolder: 'fixtures',
    screenshotsFolder: 'screenshots',
    videosFolder: 'videos',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        webpack({
          webpackOptions: {
            resolve: {
              extensions: ['.ts', '.js'],
            },
            module: {
              rules: [
                {
                  test: /\.ts$/,
                  exclude: [/node_modules/],
                  use: [
                    {
                      loader: 'ts-loader',
                    },
                  ],
                },
                {
                  test: /\.feature$/,
                  use: [
                    {
                      loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                      options: config,
                    },
                  ],
                },
              ],
            },
          },
        }),
      );

      on('task', {
        getFromProcessEnv({ name }) {
          return process.env[name] || '';
        },
        saveToProcessEnv({ name, value }) {
          if (!value) {
            delete process.env[name];
          } else {
            process.env[name] = value;
          }

          return null;
        },
      });

      // For setting screen size in headless mode.
      // If you need other browsers beside chrome, you can find code here:
      // https://docs.cypress.io/api/plugins/browser-launch-api#Set-screen-size-when-running-headless
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push(`--window-size=${WIDTH},${HEIGHT}`);
        }

        return launchOptions;
      });

      // For adding tags to screenshot filename
      // instead of using it in the scenario name
      on(
        'after:screenshot',
        async ({
          testFailure,
          path,
        }: Cypress.ScreenshotDetails): Promise<Cypress.AfterScreenshotReturnObject> => {
          const { tags } = process.env;

          if (!testFailure) {
            return {};
          }

          const timestamp = new Date().valueOf();
          const directory = path.substring(0, path.lastIndexOf('/'));
          const tagsString = tags ? ` ${tags} ` : '';
          const filename = path
            .substring(path.lastIndexOf('/') + 1)
            // remove illegal characters from the directory name
            .replace(/[/\\?%*:|"<>]/g, '');
          const [, , scenario] = filename.match(
            /( -- )([\s\S]*?)( \(failed\))/,
          ) as RegExpMatchArray;
          const fileNameRest = filename.substring(filename.indexOf(scenario) + scenario.length);
          const newPath = `${directory}/${scenario}/[${timestamp}]${tagsString}${fileNameRest}`;
          const newDirectory = newPath.substring(0, newPath.lastIndexOf('/'));

          try {
            // check if a directory exists
            await fs.access(newDirectory, fsConstants.F_OK);
          } catch (error) {
            // if not, create it
            if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') {
              await fs.mkdir(newDirectory, { recursive: true });
            } else {
              throw error;
            }
          }

          await fs.rename(path, newPath);

          return { path: newPath };
        },
      );

      // leave only last attempt screenshots
      on('after:run', async (): Promise<void> => {
        const screenshotFolderPath = path.join(__dirname, 'screenshots');

        const traverse = async (directoryPath: string) => {
          try {
            const files = await fs.readdir(directoryPath, { withFileTypes: true });
            const screenshotNames = files
              .filter((file) => file.isFile())
              .map((file) => file.name)
              .sort();
            const directories = files.filter((file) => file.isDirectory());

            if (screenshotNames.some((name) => name.includes('(failed)'))) {
              const failedScreenshotIndexes: number[] = screenshotNames
                .map((name, index) => (name.includes('(failed)') ? index : null))
                .filter((index): index is number => index !== null);

              // If a screenshot is a failed screenshot (unless it's the last screenshot),
              // delete it and all files before it.
              const lastScreenshotIndexToDelete =
                failedScreenshotIndexes[failedScreenshotIndexes.length - 1] !==
                screenshotNames.length - 1
                  ? failedScreenshotIndexes[failedScreenshotIndexes.length - 1]
                  : failedScreenshotIndexes[failedScreenshotIndexes.length - 2];

              if (lastScreenshotIndexToDelete === undefined) {
                return;
              }

              const screenshotsToDelete = screenshotNames.slice(0, lastScreenshotIndexToDelete + 1);

              for (const file of screenshotsToDelete) {
                const filePath = path.join(directoryPath, file);
                await fs.unlink(filePath);
              }
            }

            for (const directory of directories) {
              const subdirectoryPath = path.join(directoryPath, directory.name);

              await traverse(subdirectoryPath);
            }
          } catch (err) {
            console.error('Failed to traverse screenshots folder', err);
          }
        };

        await traverse(screenshotFolderPath);
      });

      return config;
    },
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/separate/[hash].xml',
    toConsole: true,
  },
  retries: 2,
});
