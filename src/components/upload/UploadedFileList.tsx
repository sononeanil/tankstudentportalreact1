import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, GridItem, Input, List, ListItem, Select, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { useGetAllUploadedFilesList, usePublishUpload } from "../../tanstack/tanstack"
import { useMutation } from "@tanstack/react-query";
import { mutationCreateUpload } from "../../Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { publishUpload, type PublishUploadType } from "../../types/userType";
import { useForm, type SubmitHandler } from "react-hook-form";

const UploadedFileList = () => {
    const toast = useToast();
    const { mutateAsync } = useMutation({
        mutationFn: mutationCreateUpload,

        onError: (err: any) => {
            toast({
                title: "CreateUpload failed",
                description: err.message,
                status: "error",
                duration: null,
                isClosable: true,
                position: "top",
            });

        },
        onSuccess: () => {
            // console.log("Registration successful");
            // reset();
            toast({
                title: "CreateUpload successful!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",

            });
        },
    })
    const publishUploadMutation = usePublishUpload();

    const pulishUpload: SubmitHandler<PublishUploadType> = (data: PublishUploadType) => {
        alert("Inside pulishUpload");
        const newpublish: PublishUploadType = {
            id: 0,
            // uploadedBy: data.uploadedBy,
            // uploadedDate: data.uploadedDate,
            type: data.type,
            // standard: data.standard,
            // subject: data.subject,
            term: data.term,
            // board: data.board,
            //Entity: data.//Entity,
        }
        console.log("newpublish", newpublish);
        publishUploadMutation.mutate(newpublish);
        alert("Create publish upload");
    }

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } }
        = useForm<PublishUploadType>({ resolver: zodResolver(publishUpload) })

    const { data } = useGetAllUploadedFilesList();

    // const pubishUpload = usePublishUpload()

    return (
        <>
            <Container
                mt={10}
                maxW="container.lg"
                p={10}
                boxShadow="2xl"
                border="1px solid #afd5eeff"
                borderRadius={10}
            >
                <VStack spacing={6} align="stretch">
                    {data?.map((item, index) => (
                        <Box
                            key={index}
                            p={6}
                            borderWidth="1px"
                            borderRadius="lg"
                            shadow="md"
                            bg="blue.50"
                            _hover={{ bg: "blue.100", transform: "scale(1.02)" }}
                            transition="all 0.2s"
                        >


                            <form onSubmit={handleSubmit(pulishUpload)}>

                                <FormControl mb={4} isInvalid={!!errors.term}>
                                    <FormLabel htmlFor="term">{data[index]}</FormLabel>
                                    <FormLabel htmlFor="term">Semester</FormLabel>
                                    <Select name="term" id="term" {...register("term")} placeholder="Please select semester">
                                        <option value="firstTerm">First Term</option>
                                        <option value="secondTerm">Second Term</option>
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.term && errors.term.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl mb={4}>
                                    <FormLabel htmlFor="type">Type</FormLabel>
                                    <Select name="type" id="type"  {...register("type")} placeholder="Please select Type">
                                        <option value="practiceWorksheet">Practice Worksheet</option>
                                        <option value="revisionWorksheet">Revision Worksheet</option>
                                        <option value="modelPaper">Model Paper</option>
                                    </Select>
                                </FormControl>

                                <Button colorScheme="blue" type="submit">
                                    Publish File
                                </Button>
                            </form>
                        </Box>
                    ))}
                </VStack>
            </Container>

        </>
    )
}

export default UploadedFileList