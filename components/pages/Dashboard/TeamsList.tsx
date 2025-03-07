import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import React, { useState } from 'react';
import { ITeamsList } from 'types';
import { Paginator, TeamCard } from 'components';
import useTranslation from 'next-translate/useTranslation';

const settings = {
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};

const teamList: ITeamsList[] = [
	{
		name: 'Kylie Cosmetics',
		funds: '$2,234.05',
		members: 2,
	},
	{
		name: 'Kylie Skin',
		funds: '$92,234,11',
		members: 170,
	},
	{
		name: 'Kylie Baby',
		funds: '$5,234.1',
		members: 13,
	},
	{
		name: 'Sapo Cugugu',
		funds: '$5,234.1',
		members: 13,
	},
	{
		name: '5',
		funds: '$2,234.05',
		members: 2,
	},
	{
		name: '6',
		funds: '$2,234.05',
		members: 2,
	},
];

export const TeamsList = () => {
	const { t: translate } = useTranslation('dashboard');
	const [slider, setSlider] = React.useState<Slider | null>(null);
	const [actualPage, setActualPage] = useState(1);
	const maxPage = teamList.length - 2;

	const previousPage = () => {
		setActualPage(actualPage - 1);
		slider?.slickPrev();
	};

	const nextPage = () => {
		setActualPage(actualPage + 1);
		slider?.slickNext();
	};

	return (
		<Flex direction="column" gap="3">
			<Flex justify="space-between" align="center" pt="4">
				<Text fontSize="16" fontWeight="500" color="#121212">
					{translate('yourCompanies')}
				</Text>
				<Paginator
					actualPage={actualPage}
					maxPage={maxPage}
					previous={previousPage}
					next={nextPage}
				/>
			</Flex>
			<Box position="relative">
				<Flex w="43.4rem" display="block" bg="transparent">
					<Slider
						{...settings}
						ref={sliderRef => setSlider(sliderRef)}
						arrows={false}
						className="slider"
					>
						{teamList.map((team, index) => (
							<TeamCard
								key={+index}
								name={team.name}
								funds={team.funds}
								members={team.members}
							/>
						))}
					</Slider>
				</Flex>
			</Box>
		</Flex>
	);
};

export default TeamsList;
