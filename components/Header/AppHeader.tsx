import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton } from 'components/NotificationButton';
import { ProfileButton } from 'components/ProfileButton';

export const AppHeader: React.FC = () => (
	<Flex
		minW="100vw"
		minH="20"
		flexDirection="row"
		justifyContent="space-between"
		alignItems="center"
		color="white"
		mt="4"
	>
		<Flex flexDirection="row" ml="32" alignItems="center">
			<Flex flexDirection="column" mr="96">
				<Flex>
					<Text fontSize="2xl">Good Night, Bradley</Text>
				</Flex>
				<Flex>
					<Text fontSize="md">
						Seems like market has been bulish. Your assets increased 10%
					</Text>
				</Flex>
			</Flex>
		</Flex>
		<Flex pr="12">
			<Flex>
				<NotificationButton />
			</Flex>
			<Flex ml="32">
				<ProfileButton />
			</Flex>
		</Flex>
	</Flex>
);

export default AppHeader;
