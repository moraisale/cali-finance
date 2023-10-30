export const chainList = (chainId: number | undefined) => {
	if (chainId === 137)
		return {
			name: 'Polygon',
			factory: process.env.NEXT_PUBLIC_POLYGON_FACTORY_CONTRACT,
			tokenAddress: '0xCf05D99c2d2c9fCBE2A46AC21a3a762e05b9C597',
			icon: '/images/polygon.png',
		};
	if (chainId === 80001)
		return {
			name: 'Polygon Mumbai',
			factory: process.env.NEXT_PUBLIC_MUMBAI_FACTORY_CONTRACT,
			tokenAddress: '0xe42A18Fd805a41BD27cA465Cf4240E5A0db7BDD4',
			icon: '/images/polygon.png',
		};
	return undefined;
};
