import {
	Button,
	Flex,
	FormControl,
	Icon,
	Input,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useOrganizations, usePicasso, useTeams } from 'hooks';
import React, { useState } from 'react';
import { BackToTeams, EmployeePanel, ImageUploaderModal } from 'components';
import { BsCardImage } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { createTeamSchema } from 'utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployee } from 'types';

interface ICreateTeamComponent {
	display: string;
	changeToCreateTeamTab: () => void;
}

interface INewTeam {
	name: string;
	picture?: string;
	description?: string;
}

export const CreateTeamComponent: React.FC<ICreateTeamComponent> = ({
	display,
	changeToCreateTeamTab,
}) => {
	const [newTeam, setNewTeam] = useState<INewTeam>();
	const [employees, setEmployees] = useState<IEmployee[]>([]);
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { selectedOrganization } = useOrganizations();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<INewTeam>({
		resolver: yupResolver(createTeamSchema),
	});
	const { teamPicture } = useTeams();

	const handleCreateTeam = (team: INewTeam) => {
		setNewTeam({
			name: team.name,
			picture: teamPicture,
			description: team.description,
		});
	};
	return (
		<Flex direction="column" align="start" display={display} w="100%">
			<BackToTeams onClick={changeToCreateTeamTab} />
			<form onSubmit={handleSubmit(handleCreateTeam)}>
				<FormControl>
					<Flex direction="column" w="100%">
						<Flex
							borderRadius="base"
							borderColor="black"
							border="1px solid black"
							py="3"
							pl="3"
							w="100%"
							gap="20"
						>
							<Flex>
								<ImageUploaderModal onClose={onClose} isOpen={isOpen} />
								<Button
									bgImage={
										!teamPicture ? '/images/addImageBg.png' : teamPicture
									}
									bgSize="cover"
									bgRepeat="no-repeat"
									_hover={{ opacity: '80%' }}
									_active={{}}
									_focus={{}}
									borderRadius="full"
									boxSize="10"
									onClick={onOpen}
								>
									{!teamPicture && <Icon as={BsCardImage} />}
								</Button>
								<Input
									_focusVisible={{}}
									placeholder="Insert Team Name Here *"
									_placeholder={{ fontSize: 'md', color: 'gray.500' }}
									border="none"
									color={theme.text.primary}
									w="max-content"
									{...register('name')}
								/>
								<Text
									fontSize="xs"
									color="red"
									position="absolute"
									top="12"
									left="16"
								>
									{errors.name?.message}
								</Text>
							</Flex>

							<Flex direction="column">
								<Text color="gray.500" fontSize="xs">
									Funds
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									$0
								</Text>
							</Flex>
							<Flex direction="column">
								<Text color="gray.500" fontSize="xs">
									Members
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									0
								</Text>
							</Flex>
							<Flex direction="column" pr="8">
								<Text color="gray.500" fontSize="xs">
									Withdrawals this month
								</Text>
								<Text color={theme.text.primary} fontSize="sm">
									$0
								</Text>
							</Flex>
						</Flex>
						<Flex pt="4" w="full">
							<Input
								_focusVisible={{}}
								placeholder="You can insert team’s description here if you want to."
								_placeholder={{ fontSize: 'md', color: 'gray.500' }}
								border="none"
								color={theme.text.primary}
								p="0"
								{...register('description')}
							/>
						</Flex>
						<EmployeePanel
							companyName={selectedOrganization.name}
							setEmployees={setEmployees}
							employees={employees}
						/>
						<Button
							fontWeight="medium"
							color="white"
							bg={theme.bg.black}
							borderRadius="base"
							px="14"
							_hover={{ opacity: '80%' }}
							_active={{}}
							_focus={{}}
							h="max-content"
							py="1.5"
							disabled={!isValid}
							type="submit"
						>
							Create Team
						</Button>
					</Flex>
				</FormControl>
			</form>
		</Flex>
	);
};

export default CreateTeamComponent;
