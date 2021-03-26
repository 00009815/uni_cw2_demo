const express = require('express')
const app = express()
const fs = require('fs')

app.use('/static', express.static('public'))
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'pug')


const notes = require('./data.js')


app.get('/', (req, res) => {
	res.render('home')

})

app.get('/create', (req, res) => {
	res.render('create')

})

app.post('/create', (req, res) => {
	const title = req.body.title
	const desc = req.body.desc

	if(title.trim() == '' && desc.trim() == '') {
		res.render('create', {error: true})
	} else{
		fs.readFile('./data/notes.json', (err, data) => {
			if(err) throw err
				let notes = JSON.parse(data)
			notes.push({
				id: id(),
				title: title,
				description: desc
			})

			fs.writeFile('./data/notes.json', JSON.stringify(notes), err => {
				if (err) throw err

				res.render('create', {success: true})
			})
		})
	}

})

app.get('/notes', (req, res) => {

	fs.readFile('./data/notes.json', (err, data) => {
		if(err) throw err

		const notes = JSON.parse(data)

		res.render('notes', {n: notes})
	})
	

})
app.get('/notes/:id', (req, res) => {
	const id = req.params.id

	fs.readFile('./data/notes.json', (err, data) => {
		if(err) throw err

		const notes = JSON.parse(data)

		const note = notes.filter(note => note.id == id)[0]

		res.render('detail', {note: note})
	
})


})


app.listen(8000, err => {
	if (err) throw err

		console.log('App is running...')
})

function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
};