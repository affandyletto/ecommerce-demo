export const formatPrice = (number) => {
	const newNumber = Intl.NumberFormat('en-US',{
		style:'currency',
		currency:'USD'
	}).format(number /100)
	return newNumber
}

export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => item[type])

	if(type ==='color'){		
		unique=data.map((item) => item['color'][0]['color'])
	}
	return ['all',...new Set(unique)]
}
