import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const boardSchema = new Schema({
	board: {
		type: Array,
		required: true
	},
	user: {
		type: String,
		required: false,
		default: ''
	},
	id: {
		type: String,
		required: false,
		default: ''
	},
	win: { 
		type: Array,
		required: false,
		default: []
	}
})

const BoardModel = mongoose.model('Board', boardSchema);

export default BoardModel ;