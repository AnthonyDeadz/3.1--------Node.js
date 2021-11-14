const fs = require('fs')
const path = require('path')

fileName = 'data.json'

function readFile() {
  if (fs.existsSync(fileName)) {
    content = JSON.parse(fs.readFileSync(fileName))
  } else {
    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(fileName, '[]')
  }
  return content
}

function getInput(rl) {
  return new Promise((resolve) => {
    rl.question('> ', (input) => resolve(input))
  })
}

function printData() {
  const data = readFile()
  data.forEach((eachData) => console.log(`${eachData.ID}. ${eachData.name}`))
  console.log('\n')
}

async function addData(rl) {
  let data = readFile()
  let input
  let newData = {}

  console.log('Enter ID:')
  input = await getInput(rl)
  newData.ID = input

  console.log('Enter Name:')
  input = await getInput(rl)
  newData.name = input

  data.push(newData)

  let jsonContent = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileName, jsonContent)

  console.log('New data has been uploaded', data, '\n')
}

async function changeData(rl) {
  let data = readFile()
  let input

  console.log('Enter ID of the data that you want to change')
  input = await getInput(rl)
  const findID = data.findIndex((eachData) => eachData.ID == input) //return (-1) if false

  if (findID === -1) {
    console.log('Error! ID does not exsist', '\n')
    return
  } else {
    console.log('Enter new name:')
  }
  input = await getInput(rl)
  data[findID].name = input

  let jsonContent = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileName, jsonContent)

  console.log('The data has been changed', data, '\n')
}

async function deleteData(rl) {
  let data = readFile()
  let input

  console.log('Enter ID of the data that you want to delete')
  input = await getInput(rl)
  const findID = data.findIndex((eachData) => eachData.ID == input) //return (-1) if false

  if (findID === -1) {
    console.log('Error! ID does not exsist', '\n')
    return
  }
  data.splice(findID, 1)

  let jsonContent = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileName, jsonContent)

  console.log('The data has been deleted', data, '\n')
}

module.exports = {
  getInput,
  printData,
  addData,
  changeData,
  deleteData,
}
