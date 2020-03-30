const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
mongoose.connect('mongodb://localhost/new_database', {useNewUrlParser: true, useUnifiedTopology: true})

const newDB = mongoose.connection;
newDB.on('error', (err) => {console.log('Something went wrong:', err)})

newDB.once('open', () => {
  console.log('Connected')
})

const feathersSchema = new mongoose.Schema({
  color: String,
  pattern: String,
  size: Number
})

feathersSchema.methods.examine = function() {
  return `It is a ${this.color} feather with a ${this.pattern} pattern`
}

const Feather = mongoose.model('Feather', feathersSchema)

let blueBird = Feather({
  color: 'blue',
  pattern: 'banded',
  size: 1
})

let raven = Feather({color: 'black', pattern: 'solid', size: 5})


function addFeather(doc) {
  let validFeather = Feather(doc)

  validFeather.save((err, doc) => {
    if(err) {
      console.error(err)
    }
    console.log('success!')
  })
}

async function updateFeather(id, newPattern) {
  let myFeather = await Feather.findOne({_id: ObjectId(id)})

  myFeather.pattern = newPattern

  await myFeather.save()

  myFeather = await Feather.findOne({_id: ObjectId(id)})

  console.log(myFeather)
  newDB.close()
}

//updateFeather('5e824f4efb0f86689ca1ef2a', 'spirals')
addFeather({color: 'green', pattern: 'magenta stripes', size:'6in'})
