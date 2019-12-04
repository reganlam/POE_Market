const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async() => {
	try{
		await mongoose.connect(db, {
			useUnifiedTopology : true, 
			useNewUrlParser: true,
			useFindAndModify: false
		})
		console.log('MongoDB connected...')
	} catch(err){
		console.error('Error:', err)
	}
}

module.exports = connectDB