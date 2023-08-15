import fs from 'fs'

import * as nodemailer from 'nodemailer'

import {
  separateObjectsBySuite,
  uploadFile,
  zipDirectory,
} from './emailUtlis'

const date = new Date()
const currentDate =
  date.getUTCMonth() + 1 + '-' + date.getUTCDate() + '-' + date.getUTCFullYear()

async function sendEmail() {
  const userEmail = process.env.GMAIL_EMAIL
  const userPassword = process.env.GMAIL_PASSWORD
  let passedString = ''
  let failedString = ''
  
  const filePath = 'tests\\utils\\reportData.json'

  const fileContent = await fs.promises.readFile(filePath, 'utf-8')
  console.log(fileContent)
  const jsonObject = await JSON.parse(fileContent)

  interface TestCaseResult {
    title: string
    status: string
    suite: string
  }

  const passedArray: TestCaseResult[] = jsonObject.passed
  if (passedArray) {
    console.log(passedArray)
    passedString = separateObjectsBySuite(passedArray)
  }

  const failedArray: TestCaseResult[] = jsonObject.failed
  if (failedArray) {
    console.log(failedArray)
    for (let i = 0; i < passedArray.length; i++) {
      const index = failedArray.findIndex(
        (item) => item.title === passedArray[i].title,
      )
      if (index > -1) {
        failedArray.splice(index, 1)
      }
    }
    
    failedString = separateObjectsBySuite(failedArray)
  }

  console.log(passedString, failedString)
  await zipDirectory('playwright-report', 'playwright-report.zip')
  const link = await uploadFile()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: userPassword,
    },
  })
  let mailList: Array<string> = []

mailList = ['farhan.qat12345@gmail.com']


  const mailOptions = {
    from: userEmail,
    to: mailList,
    subject: `Automation Web Report - ${currentDate}`,
    html: `<h2><strong>Automation Test Execution Summary</strong></h2>
        <h3><strong>Overall Test Cases: </strong>${' '}${
      (passedArray ? passedArray.length : 0) +
      (failedArray ? failedArray.length : 0)
    }</h3>
    <h3 style="color: red;"><strong>Failed Tests:</strong>${' '}${
      failedArray ? failedArray.length : 0
    }</h3>
        <p>${
          failedString ? failedString : 'No Test Case Failed'
        }</p>
        <h3 style="color: green;"><strong>Passed Tests:</strong>${' '}${
          passedArray ? passedArray.length : 0
    }</h3>
        <p>${
          passedString ? passedString : 'No Test Case Passed'
        }</p>
        <br/>
        <a href="${link}">
        <strong>Report Link</strong>
        </a>`,
  }

  await transporter.sendMail({ ...mailOptions })
}

export default sendEmail
