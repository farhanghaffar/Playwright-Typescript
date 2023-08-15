# proptech-qa-automation

## Prerequisite 
- Node (LTS) [link](https://nodejs.org) 
- VS Code (v1.81.1) or Greater version [link](https://code.visualstudio.com/docs/?dv=win) 

## Technology Stack 
- Typescript/JavaScript
- Microsoft Playwright

## Setup Windows and Mac OS
### Install the node and virtual studio code
   - Download node.js (v16.17.0) or Greater version [link](https://www.npackd.org/p/org.nodejs.NodeJS64/16.17.0) 
  - Install node.msi file 
  - Set environment variable for node
  - To check the node version by running following command 
  `node --version`
  - Download and install Visual Studio Code(v1.76.0S) or Greater version [link](https://code.visualstudio.com/docs/?dv=win)

## Installation

How to setup and run the `Playwright` test automation framework for Proptech on multiple Web browsers: Chrome, Firefox, WebKit (Safari).

```
git clone  https://github.com/Easton-Consulting-Technologies/proptech-qa-automation.git
```

### Running the The Funded Trader Project

```
cd proptech-qa-automation
```

```
cd thefundedtraderprogram
```

```
npm install
```

```
npx playwright install
```
### To Run Complete Features

```
npx playwright test -- tests/Features
```

### To Run Single Feature (eg login)

```
npx playwright test -- tests/Features/Login
```
