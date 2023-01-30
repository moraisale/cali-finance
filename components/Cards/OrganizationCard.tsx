import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { IOrganization } from 'types';
import { handleLogoImage, navigationPaths } from 'utils';

interface IOrganizationCard {
	team: IOrganization;
}

export const OrganizationCard: React.FC<IOrganizationCard> = ({ team }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('organizations');

	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			gap={{ md: '1', lg: '2', xl: '4' }}
		>
			<Flex direction="column" pt="2.5" pl="4" color={theme.text.primary}>
				<Flex align="center" gap={{ lg: '1', xl: '2.5' }}>
					{team.logo ? (
						<Img src={team.logo} boxSize="6" borderRadius="base" />
					) : (
						<Flex
							boxSize="6"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="xs"
							fontWeight="bold"
							bg={theme.bg.white2}
						>
							{handleLogoImage(team.name)}
						</Flex>
					)}
					<Text fontSize={{ md: 'sm', xl: 'md' }} fontWeight="bold">
						{team.name}
					</Text>
				</Flex>
				<Flex pt={{ lg: '1', xl: '3' }} justify="space-between">
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							{translate('funds')}
						</Text>
						<Text fontSize={{ md: 'xs', xl: 'sm' }}>
							${team.funds.toLocaleString('en-US')}
						</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							Members
						</Text>
						<Text fontSize={{ md: 'xs', xl: 'sm' }}>{team.members}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" pb={{ lg: '2', xl: '4' }}>
				<Link href={navigationPaths.dashboard.organizations.overview('1')}>
					<Text
						color={theme.branding.blue}
						bg="none"
						fontSize="xs"
						fontWeight="medium"
						cursor="pointer"
					>
						{translate('manage')}
					</Text>
				</Link>
			</Flex>
		</Flex>
	);
};

export default OrganizationCard;
