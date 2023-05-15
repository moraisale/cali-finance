/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Img, Text } from '@chakra-ui/react';
import { IActivitiesData } from 'types';
import { useRouter } from 'next/router';
import { truncateWallet } from 'utils';

export const ActivitiesData: React.FC<IActivitiesData> = ({
	activities,
	company,
}) => {
	const { locale } = useRouter();

	const handleActivities = () => {
		if (activities.event.description === 'Member added to company')
			return {
				icon: '/icons/add-user.svg',
				text:
					locale === 'en-US'
						? activities.meta.description.enDescription
						: activities.meta.description.ptDescription,
			};
		if (activities.event.description === 'Created company')
			return {
				icon: '/icons/companies.svg',
				text:
					locale === 'en-US'
						? activities.meta.description.enDescription
						: activities.meta.description.ptDescription,
			};
		return null;
	};

	return (
		<Flex
			w="full"
			align="center"
			px={{ md: '2', lg: '3' }}
			py="1"
			bg="gray.100"
			borderRadius="base"
			justify="space-between"
		>
			<Text
				h="max-content"
				fontSize="sm"
				fontWeight="normal"
				w={{ md: '24', lg: '36' }}
				whiteSpace="nowrap"
			>
				{activities.event.description === 'Member added to company'
					? truncateWallet(handleActivities()?.text.slice(0, 41))
					: handleActivities()?.text?.slice(8, company?.name!.length + 8)}
			</Text>
			<Flex align="center" gap="2">
				<Img src={handleActivities()?.icon} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal">
						{activities.event.description}
					</Text>
					<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
						{activities.created_at}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
