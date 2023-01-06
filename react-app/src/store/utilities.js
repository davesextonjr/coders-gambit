//Normalize Data -- must be an array of objects, each object must have a unique id

export const normalize = arrayOfObjects => {
    const objectOfObjects = {}
    arrayOfObjects.forEach(obj => objectOfObjects[obj.id]= obj)
    return objectOfObjects
}
