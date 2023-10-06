export const chainList = (chainId: number | undefined) => {
	if (chainId === 137)
		return {
			name: 'Polygon',
			factory: process.env.NEXT_PUBLIC_POLYGON_FACTORY_CONTRACT,
			tokenAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
			icon: '/images/polygon.png',
		};
	if (chainId === 80001)
		return {
			name: 'Polygon Mumbai',
			factory: process.env.NEXT_PUBLIC_MUMBAI_FACTORY_CONTRACT,
			tokenAddress: '0xe42A18Fd805a41BD27cA465Cf4240E5A0db7BDD4',
			icon: '/images/polygon.png',
		};
	return {
		name: 'Polygon',
		factory: process.env.NEXT_PUBLIC_POLYGON_FACTORY_CONTRACT,
		tokenAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
		icon: '/images/polygon.png',
	};
};
