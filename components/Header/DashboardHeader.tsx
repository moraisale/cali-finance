import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NotificationPopover } from 'components';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso, useProfile } from 'hooks';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export const DashboardHeader: React.FC = () => {
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('app-header');
	const { data: session } = useSession();
	const { getProfileData } = useProfile();
	const percentage = 0;
	const theme = usePicasso();
	const { address, isConnected } = useAccount();
	const { data: profileData } = useQuery(
		['profile-data'],
		() => getProfileData(address),
		{
			enabled: !!isConnected,
		}
	);

	const greetingMessage = useMemo(() => {
		const hour = new Date().getHours();
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	}, [translate]);

	const dynamicAssetInfo = () => {
		if (percentage < 0)
			return { status: translate('bearish'), color: 'red.500' };
		if (percentage === 0)
			return { status: translate('neutral'), color: 'gray.500' };
		return { status: translate('bullish'), color: 'blue.500' };
	};

	return (
		<Flex direction="column" pb="6">
			<Flex justify="space-between">
				<Flex>
					<Text
						display={{ base: 'none', md: 'flex' }}
						color={theme.text.primary}
						fontSize="2xl"
						fontWeight="medium"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage} {session && profileData?.name}
					</Text>
					<Text
						display={{ base: 'flex', md: 'none' }}
						color={theme.text.primary}
						fontSize="2xl"
						fontWeight="medium"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage}
					</Text>
				</Flex>
				<Flex display={{ base: 'none', md: 'flex' }} h="8" align="center">
					<NotificationPopover
						onClose={onClose}
						isOpen={isOpen}
						onOpen={onOpen}
					/>
				</Flex>
			</Flex>
			<Flex display={{ base: 'none', md: 'flex' }}>
				<Text fontSize="sm" color={theme.text.primary}>
					{translate('assetInfo')}
					<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
						{'\u00A0'}
						{dynamicAssetInfo()?.status}
						{'\u00A0'}
					</Text>
				</Text>
				<Text fontSize="sm" color={theme.text.primary}>
					{translate('increased')}
					<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
						{'\u00A0'}
						{translate('percentage', { percentage })}
					</Text>
				</Text>
			</Flex>
			<Flex display={{ base: 'flex', md: 'none' }}>
				<Text fontSize="sm" color={theme.text.primary}>
					{translate('assetInfo')}
					<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
						{'\u00A0'}
						{dynamicAssetInfo()?.status}
						{'\u00A0'}
						<Text as="span" color={theme.text.primary}>
							{translate('increased')}
						</Text>
						{'\u00A0'}
						{translate('percentage', { percentage })}
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
};

export default DashboardHeader;
