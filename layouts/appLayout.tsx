import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';
import { usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
	right?: React.ReactNode;
}

export const AppLayout: React.FC<ILanding> = ({ children, right }) => {
	const theme = usePicasso();
	return (
		<Flex bg={theme.bg.primary} py="6" minH="100vh" w="full">
			<Sidebar />
			<Flex
				bg="white"
				w="full"
				borderLeft="0.25rem solid"
				borderColor={theme.branding.blue}
				borderLeftRadius="sm"
				position="relative"
			>
				<Flex
					bg={theme.bg.gray2}
					w="full"
					bgImage="/images/calipattern.png"
					bgRepeat="no-repeat"
					bgPosition="right bottom"
					position="relative"
				>
					<Flex direction="column" w="100%">
						{children}
					</Flex>
					<Flex py="6" pr="4">
						{right}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};
