const formatCurrency = (prize: number) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
        minimumFractionDigits: 0,
	});

	return formatter.format(prize);
};

const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
  };

export { formatCurrency, shuffleArray };
