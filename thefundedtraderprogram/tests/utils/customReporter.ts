import fs from 'fs'

import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter'

import { addJSONObjectToArrayIfNotExists } from './testUtlis'
import sendEmail from './emailTranspoter'

const filePath = 'tests\\utils\\reportData.json'

class MyReporter implements Reporter {
  constructor() {
    console.log('My Custom Repoter is Running to Collect Logs')
  }

  async onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`)
      const fileContent = await fs.promises
        .readFile(filePath, 'utf-8')
        .catch((err) => {
          if (err.code === 'ENOENT') {
            // file does not exist, create it
            return fs.promises.writeFile(filePath, '{}')
          }
          console.error(err)
          throw err
        })
      if (fileContent) {
        const jsonObject = JSON.parse(fileContent)
        jsonObject.passed = []
        jsonObject.failed = []

        const updatedJsonString = JSON.stringify(jsonObject)
        await fs.promises.writeFile(filePath, updatedJsonString, 'utf-8')
      }
  }

  async onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`)
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`)
    const fileContent = await fs.promises
      .readFile(filePath, 'utf-8')
      .catch((err) => {
        if (err.code === 'ENOENT') {
          // file does not exist, create it
          return fs.promises.writeFile(filePath, '{}')
        }
        // re-throw any other errors
        throw err
      })

    interface TestCaseResult {
      status: string
      title: string
      suite: string
    }
    if (fileContent) {
      const jsonObject = JSON.parse(fileContent)
      if (
        result.status === 'passed' &&
        test.title !== 'Sending Report Through Email'
      ) {
        const previousPassed: TestCaseResult[] = jsonObject.passed
        if (previousPassed) {
          addJSONObjectToArrayIfNotExists(previousPassed, {
            status: result.status,
            title: test.title,
            suite: test.parent.title,
          })
        } else {
          jsonObject.passed = [
            {
              status: result.status,
              title: test.title,
              suite: test.parent.title,
            },
          ]
        }
      } else if (result.status !== 'passed') {
        const previousfailed: TestCaseResult[] = jsonObject.failed
        if (previousfailed) {
          // if test case failed on re try don't add this to failed array
          addJSONObjectToArrayIfNotExists(previousfailed, {
            status: result.status,
            title: test.title,
            suite: test.parent.title,
          })
        } else {
          jsonObject.failed = [
            {
              status: result.status,
              title: test.title,
              suite: test.parent.title,
            },
          ]
        }
      }
      const updatedJsonString = JSON.stringify(jsonObject)
      await fs.promises.writeFile(filePath, updatedJsonString, 'utf-8')
    }
  }

  async onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`)
  }

  async onExit(): Promise<void> {
    if(process.env.SEND_REPORT === 'YES'){
      await sendEmail()
    }
  }
}
export default MyReporter
