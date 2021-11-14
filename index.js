const readline = require('readline')

const {
  getInput,
  printData,
  addData,
  changeData,
  deleteData,
} = require('./functions')

main()

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  let input
  const menuInputs = ['1', '2', '3', '4', '5']

  do {
    console.log('1. Print data')
    console.log('2. Upload data')
    console.log('3. Change data')
    console.log('4. Delete data')
    console.log('5. Exit')

    input = await getInput(rl)
    while (!menuInputs.includes(input)) {
      console.log('There is no such option, choose another one again')
      input = await getInput(rl)
    }

    switch (input) {
      case '1': //print
        printData()
        break

      case '2': //upload
        await addData(rl)
        break

      case '3': //change
        await changeData(rl)
        break

      case '4': //delete
        await deleteData(rl)
        break
    }
  } while (input !== '5')

  rl.close()
}
