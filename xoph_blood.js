const query = {
		"query":{
			"status":{
				"option": "online"
			},
			"name": "Xoph's Blood",
			"type": "Amber Amulet",
			"stats":[{
				"type": "and",
				"filters":[{
					"id": "pseudo.pseudo_total_fire_resistance",
					"value": {
						"min": 40
					}
				}]
			}],
			"filters":{
				"misc_filters":{
					"disabled": false,
					"filters":{
						"corrupted": {
							"option": "false"
						},
					}
				},
				"trade_filters":{
					"disabled": false,
					 "filters":{
					 	"sale_type":{
					 		"option": "priced"
					 	},
					 }
				}
			}
		},
		"sort":{
			"price":"asc"
	}
}

const data = {
	name: "Xoph's Blood",
	filter: query,
	price: 2,
	currency: 'exa'
}

module.exports = {
	data
}