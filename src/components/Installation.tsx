import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, userSchema, type StudentType, type UserType } from "../types/userType";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { mutationCreateStudent } from "../Api";

const PersonalDetails = () => {
    // Load user info from localStorage
    const userInfoString = localStorage.getItem("loggedInUser");
    const parsedUser = userInfoString ? JSON.parse(userInfoString) : {};

    // Local state for user info
    const [user, setUser] = useState(parsedUser);
    const [isEditing, setIsEditing] = useState(false);

    // Handle input changes
    const handleChange = (field: string, value: string) => {
        setUser({ ...user, [field]: value });
    };

    // Save changes to localStorage (and backend if needed)
    const handleSave = () => {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // TODO: call backend API here with updated user info
        setIsEditing(false);
    };

    const toast = useToast();
    const navigate = useNavigate();


    const { mutateAsync } = useMutation({
        mutationFn: mutationCreateStudent,

        onError: (err: any) => {
            toast({
                title: "CreateStudent failed",
                description: err.message,
                status: "error",
                duration: null,
                isClosable: true,
                position: "top",
            });

        },
        onSuccess: () => {
            // console.log("Registration successful");
            reset();
            toast({
                title: "CreateStudent successful!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",

            });
        },
    })

    const createStudent: SubmitHandler<StudentType> = (data: StudentType) => {
        const newStudent: StudentType = {
            id: 0,
            firstName: data.firstName,
            lastName: data.lastName,
            nickName: data.nickName,
            email: data.email,
            age: data.age,
            classEntrolled: data.classEntrolled,
            middleName: data.middleName,
            gender: data.gender,
            subjectEnrolled: data.subjectEnrolled,
            attendancePercentage: data.attendancePercentage,
            dateOfBirth: data.dateOfBirth,
            dateOfAdmission: data.dateOfAdmission,
            parentId: data.parentId,
            //Entity: data.//Entity,
        }
        mutateAsync(newStudent)
        // alert("Create newStudent");
    }

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } }
        = useForm<StudentType>({ resolver: zodResolver(studentSchema) })

    return (
        <>
            <Card mb={10} maxW="lg" mx="auto" boxShadow="xl" borderRadius="lg" bg="white">
                <CardHeader textAlign="center">
                    <Stack spacing={2} align="center">
                        <Avatar size="xl" name={`${user.firstName} ${user.lastName}`} bg="teal.500" />
                        <Heading size="md" color="teal.600">
                            {user.firstName} {user.lastName}
                        </Heading>
                        <Badge colorScheme="purple" variant="solid">
                            {user.role || "Student"}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                            {user.email}
                        </Text>
                    </Stack>
                </CardHeader>

                <Divider />

                <CardBody>
                    <SimpleGrid columns={2} spacing={6}>
                        <Box>
                            <Text fontWeight="bold" color="gray.600">First Name:</Text>
                            {isEditing ? (
                                <Input value={user.firstName || ""} onChange={(e) => handleChange("firstName", e.target.value)} />
                            ) : (
                                <Text>{user.firstName}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text fontWeight="bold" color="gray.600">Last Name:</Text>
                            {isEditing ? (
                                <Input value={user.lastName || ""} onChange={(e) => handleChange("lastName", e.target.value)} />
                            ) : (
                                <Text>{user.lastName}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text fontWeight="bold" color="gray.600">User Login Id:</Text>
                            {isEditing ? (
                                <Input value={user.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
                            ) : (
                                <Text>{user.email}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text fontWeight="bold" color="gray.600">City:</Text>
                            {isEditing ? (
                                <Input value={user.city || ""} onChange={(e) => handleChange("city", e.target.value)} />
                            ) : (
                                <Text>{user.city}</Text>
                            )}
                        </Box>

                        <Box>
                            <Text fontWeight="bold" color="gray.600">Country:</Text>
                            {isEditing ? (
                                <Input value={user.country || ""} onChange={(e) => handleChange("country", e.target.value)} />
                            ) : (
                                <Text>{user.country}</Text>
                            )}
                        </Box>
                    </SimpleGrid>

                    <Stack direction="row" spacing={4} mt={6} justify="center">
                        {isEditing ? (
                            <>
                                <Button colorScheme="teal" onClick={handleSave}>Save</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                            </>
                        ) : (
                            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                    </Stack>
                </CardBody>
            </Card>




        </>
    );
};

export default PersonalDetails;