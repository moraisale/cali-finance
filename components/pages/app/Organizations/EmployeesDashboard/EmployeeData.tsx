import {
	Button,
	Flex,
	Icon,
	Img,
	Select,
	Text,
	useToast,
} from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { IEmployee } from 'types';
import { truncateWallet } from 'utils';
import { CopyAddressToast } from 'components';

const teams = ['General', 'Marketing', 'Finance', 'Trozorba'];
interface IEmployeeData {
	employee: IEmployee;
}
export const EmployeeData: React.FC<IEmployeeData> = ({ employee }) => {
	const toast = useToast();

	const handleCopyButton = () => {
		navigator.clipboard.writeText(employee.wallet);
		toast({
			position: 'top-right',
			render: () => <CopyAddressToast onClick={toast.closeAll} />,
		});
	};
	return (
		<Flex
			w="100%"
			justify="space-between"
			align="center"
			bg="white"
			color="black"
			px="3"
			py="2"
			borderRadius="base"
		>
			<Flex justify="center" align="center" gap="3" maxW="36">
				<Img src={employee.photo} boxSize="6" />
				<Flex direction="column" justifyItems="center">
					<Text fontSize="sm">{employee.name}</Text>
					<Flex align="center">
						<Text fontSize="xs" color="gray.500">
							{truncateWallet(employee.wallet)}
						</Text>
						<Button
							w="3"
							h="3"
							bg="transparent"
							onClick={() => {
								handleCopyButton();
							}}
						>
							<Icon as={MdContentCopy} boxSize="3" color="gray.500" />
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<Flex>
				<Select
					borderColor="gray.200"
					borderRadius="base"
					fontSize="sm"
					w="40"
					h="6"
				>
					{teams.map((item, index) => (
						<option
							style={{ background: 'white' }}
							selected={item === employee.team}
							key={+index}
						>
							{item}
						</option>
					))}
				</Select>
			</Flex>
			<Flex direction="column" align="end">
				<Flex gap="1" fontSize="xs">
					<Text>{employee.amount}</Text>
					<Text>{employee.coin}</Text>
				</Flex>
				<Button
					color="gray.500"
					fontSize="xs"
					fontWeight="medium"
					h="max-content"
					px="0"
				>
					<Text w="100%" align="end">
						Edit
					</Text>
				</Button>
			</Flex>
		</Flex>
	);
};
