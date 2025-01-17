const express = require('express')
const router = express.Router()
const getDb = require('../database')
const db = getDb()

// Fetch all styles for a specified client
router.get('/styles/client/:id', (req, res) => {
  const clientId = req.params.id
  db.all('SELECT * FROM styles WHERE client_id = ?', [clientId], (error, results) => {
    if (error) {
      return res.status(500).send(error)
    }
    res.json(results) // Corrected from "result" to "results"
  })
})

router.post('/styles/new', (req, res) => {
  try {
    const { name, price, clientId } = req.body
    if (!name) return res.status(400).json({ error: 'Missing name' })
    if (!price) return res.status(400).json({ error: 'Missing price' })
    if (!clientId) return res.status(400).json({ error: 'Missing clientId' })

    db.get('SELECT * FROM clients WHERE id = ?', [clientId], (error, client) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' })
      }
      if (!client) {
        return res.status(400).json({ error: 'No client in db.' })
      }
      db.run('INSERT INTO styles (name, price, client_id) VALUES (?, ?, ?)', [name, price, clientId], error => {
        if (error) {
          return res.status(500).json({ error: 'Failed to insert style' })
        }
        res.json({ message: 'Style inserted into db successfully' })
      })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update an existing style
router.put('/styles/update/:id', (req, res) => {
  const { name, price } = req.body
  const styleId = req.params.id

  db.run('UPDATE styles SET name = ?, price = ? WHERE id = ?', [name, price, styleId], function (error) {
    if (error) return res.status(500).send(error)
    res.status(201).json({ message: `Style updated with ID: ${styleId}` })
  })
})
// Delete a style
router.delete('/styles/delete/:id', (req, res) => {
  const styleId = req.params.id

  db.run('DELETE FROM styles WHERE id = ?', [styleId], function (error) {
    if (error) return res.status(500).send(error)
    res.status(201).json({ message: `Style deleted with ID: ${styleId}` })
  })
})

// SAMPLES BELOW

// Fetch all samples for a specific client
router.get('/samples/client/:clientId', (req, res) => {
  const clientId = req.params.clientId
  const query = `SELECT * FROM samples WHERE client_id = ?`

  db.all(query, [clientId], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.json(results)
  })
})

router.post('/samples/new', (req, res) => {
  try {
    const { name, time, price, clientId } = req.body
    if (!name) return res.status(400).json({ error: 'Missing name' })
    if (!time) return res.status(400).json({ error: 'Missing time' })
    if (!price) return res.status(400).json({ error: 'Missing price' })
    if (!clientId) return res.status(400).json({ error: 'Missing clientId' })
    db.get('SELECT * FROM clients WHERE id = ?', [clientId], (error, client) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' })
      }
      if (!client) {
        return res.status(400).json({ error: 'No client in db.' })
      }
      db.run(
        'INSERT INTO samples (name, time, price, client_id) VALUES (?, ?, ?, ?)',
        [name, time, price, clientId],
        error => {
          if (error) {
            return res.status(500).json({ error: 'Failed to insert sample' })
          }
          res.json({ message: 'Sample inserted into db successfully' })
        },
      )
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update a sample (e.g. after editing)
router.put('/samples/update/:id', (req, res) => {
  const { name, time, price } = req.body
  const sampleId = req.params.id

  db.run(
    'UPDATE samples SET name = ?, time = ?, price = ? WHERE id = ?',
    [name, time, price, sampleId],
    function (error) {
      if (error) {
        return res.status(500).send(error)
      }
      res.status(201).json({
        message: `Sample updated: id: ${sampleId} name: ${name} time: ${time} price: ${price} `,
      })
    },
  )
})

// Delete a sample
router.delete('/samples/delete/:id', (req, res) => {
  const sampleId = req.params.id

  db.run('DELETE FROM samples WHERE id = ?', [sampleId], function (error) {
    if (error) {
      return res.status(500).send(error)
    }
    res.status(201).json({ message: `Sample deleted with ID: ${sampleId}` })
  })
})

module.exports = router

/**
 Some 
 damn 
 spacing 
  yo
Some 
 */
// STYLES BELOW
// // Fetch styles for a specific client
// router.get('/styles/client/:clientId', (req, res) => {
//   const clientId = req.params.clientId
//   // changes `styles.name AS styleName` to `styles.name`
//   const query = `
//     SELECT styles.id, styles.name, styles.price
//     FROM styles
//     WHERE styles.client_id = ?`
//   db.all(query, [clientId], (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }
//     res.json(results)
//   })
// })
// Fetch all styles with client information
// router.get('/styles', (req, res) => {
//   const query = `
//       SELECT styles.id, styles.name, styles.price, clients.id AS clientId, clients.name AS clientName
//       FROM styles
//       INNER JOIN clients ON styles.client_id = clients.id
//   `; // Changed LEFT JOIN to INNER JOIN to ensure styles belong to a client

//   db.all(query, [], (error, results) => {
//       if (error) {
//           return res.status(500).send({ error: 'Database error occurred' });
//       }
//       res.json(results);
//   });
// });

// // Create new style
// router.post('/styles', (req, res) => {
//   const { name, price, client_id } = req.body
//   db.run('INSERT INTO styles (name, price, client_id) VALUES (?, ?, ?)', [name, price, client_id], function (error) {
//     if (error) {
//       return res.status(500).send(error)
//     }
//     // Fetch the newly added style details
//     db.get('SELECT * FROM styles WHERE id = ?', [this.lastID], (error, newStyle) => {
//       if (error) {
//         return res.status(500).send(error)
//       }
//       if (newStyle) {
//         res.status(201).json(newStyle)
//       } else {
//         res.status(404).json({ message: 'Newly added style not found.' })
//       }
//     })
//   })
// })

// // Fetch all styles and client info - used in invoice editor i think - 8/01/2025
// router.get('/styles', (req, res) => {
//   const query = `
//       SELECT styles.id, styles.name, styles.price, clients.id AS clientId, clients.name AS clientName
//       FROM styles
//       INNER JOIN clients ON styles.client_id = clients.id
//   ` // Changed LEFT JOIN to INNER JOIN to ensure styles belong to a client

//   db.all(query, [], (error, results) => {
//     if (error) {
//       return res.status(500).send({ error: 'DB error from router -> /styles' })
//     }
//     res.json(results)
//   })
// })
// ------------------------------- SAMPLES BELOW -------------------------->>

// // Add a new sample for a client
// router.post('/api/samples', (req, res) => {
//   const { name, time, price, client_id } = req.body
//   db.run(
//     'INSERT INTO samples (name, time, price, client_id) VALUES (?, ?, ?, ?)',
//     [name, time, price, client_id],
//     function (error) {
//       if (error) {
//         return res.status(500).send(error)
//       }
//       // Fetch the newly added sample details
//       db.get('SELECT * FROM samples WHERE id = ?', [this.lastID], (error, newSample) => {
//         if (error) {
//           return res.status(500).send(error)
//         }
//         if (newSample) {
//           res.status(201).json(newSample)
//         } else {
//           res.status(404).json({ message: 'Newly added sample not found.' })
//         }
//       })
//     },
//   )
// })

// Fetch a specific sample by ID
// router.get('/api/items/:id', (req, res) => {
//   const sampleId = req.params.id
//   db.get('SELECT * FROM samples WHERE id = ?', [sampleId], (error, result) => {
//     if (error) {
//       return res.status(500).send(error)
//     }
//     res.json(result)
//   })
// })
