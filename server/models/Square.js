import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const squareSchema = new Schema({
	value: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: false,
		default: true
	},
	column: {
		type: String,
		required: false,
		default: ''
	},
	row: {
		type: String,
		required: false,
		default: ''
	},
	marked: {
		type: Boolean,
		required: false,
		default: false
	},
	free: {
		type: Boolean,
		required: false,
		default: false
	}
})

const SquareModel = mongoose.model('Square', squareSchema);

export default SquareModel ;

/*
id: `${column}${row}`,
				column,
				row,
				value: null,
				marked: false,
				free: false
				*/