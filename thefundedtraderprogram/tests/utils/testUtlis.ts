import fs from 'fs'


export function addJSONObjectToArrayIfNotExists<T>(
  array: T[],
  jsonObject: T,
): void {
  const jsonString = JSON.stringify(jsonObject)
  const exists = array.some((obj) => {
    return JSON.stringify(obj) === jsonString
  })

  if (!exists) {
    array.push(jsonObject)
  }
}

export async function writeJsonFile(jsonObject: any, path= 'tests//utils//data.json') {
    const updatedJsonString = JSON.stringify(jsonObject, null, 2)
        await fs.promises.writeFile(path, updatedJsonString, 'utf-8')
  }
  
  export async function readJsonFile(path = 'tests//utils//data.json') {
    const fileContent = await fs.promises
      .readFile(path, 'utf-8');
    if (fileContent) {
      const jsonObject = JSON.parse(fileContent)
      return jsonObject;
    }
  }