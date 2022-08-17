import { Flex, Icon } from '@chakra-ui/react';
import { TeamOverall, TeamTable } from 'components';

import { AppLayout } from 'layouts';
import Link from 'next/link';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

export const TeamsContainer = () => (
	<Flex>
		<AppLayout>
			<Flex
				gap="32"
				flexDirection={{
					base: 'column',
					sm: 'column',
					md: 'column',
					xl: 'row',
				}}
			>
				{/* <TeamTable />
				<TeamOverall /> */}
				<Flex
					display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }}
					direction="row"
					gap="10"
				>
					<Flex>
						<Link href="/">
							<Icon as={FaDiscord} boxSize="10" />
						</Link>
					</Flex>
					<Flex>
						<Link href="/">
							<Icon as={FaTwitter} boxSize="10" />
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</AppLayout>
	</Flex>
);

export default TeamsContainer;
