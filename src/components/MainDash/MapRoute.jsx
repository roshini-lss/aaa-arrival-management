import React, { useState, useRef, useEffect } from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import { FaTimes } from "react-icons/fa"
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from "@react-google-maps/api"
import { useLocation } from "react-router-dom"
const center = { lat: 48.8584, lng: 2.2945 }
function App() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })
    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")
    const [predictedDuration, setPredictedDuration] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const originRef = useRef()
    const destinationLatRef = useRef()
    const destinationLngRef = useRef()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const state = {
        dest_latitude: params.get("latitude"),
        dest_longitude: params.get("longitude"),
    }
    async function calculateRoute(coord) {
        // if (
        //     originRef.current.value === "" ||
        //     destinationLatRef.current.value === "" ||
        //     destinationLngRef.current.value === ""
        // ) {
        //     return
        // }
        const destination = {
            lat: parseFloat(
                coord?.destination?.lat || destinationLatRef.current.value
            ),
            lng: parseFloat(
                coord?.destination?.lng || destinationLngRef.current.value
            ),
        }
        console.log("HEre1", destination)
        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value || "California",
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDuration(results.routes[0].legs[0].duration.text)
        const googleDurationInSeconds = results.routes[0].legs[0].duration.value
        const predictedDurationInSeconds = googleDurationInSeconds + 60 * 20
        setPredictedDuration(predictedDurationInSeconds)
        setDistance(results.routes[0].legs[0].distance.text)
        onOpen()
    }
    console.log(predictedDuration)
    useEffect(() => {
        console.log(state.dest_latitude != null, state.dest_longitude != null)
        if (
            isLoaded &&
            state.dest_latitude != null &&
            state.dest_longitude != null
        )
            calculateRoute({
                destination: {
                    lat: state.dest_latitude,
                    lng: state.dest_longitude,
                },
            })
    }, [state.dest_latitude, state.dest_longitude, isLoaded])
    function clearRoute() {
        setDirectionsResponse(null)
        setDistance("")
        setDuration("")
        setPredictedDuration("")
        originRef.current.value = ""
        destinationLatRef.current.value = ""
        destinationLngRef.current.value = ""
    }
    function formatDuration(durationInSeconds) {
        const hours = Math.floor(durationInSeconds / 3600)
        const minutes = Math.floor((durationInSeconds % 3600) / 60)
        return `${hours > 0 ? `${hours} hours ` : ""}${minutes} mins`
    }
    if (!isLoaded) {
        return <SkeletonText />
    }
    return (
        <Flex
            position="relative"
            flexDirection="column"
            alignItems="center"
            h="100vh"
            w="100vw"
        >
            <Box position="absolute" left={0} top={0} h="100%" w="100%">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box
                p={4}
                borderRadius="lg"
                m={4}
                bgColor="white"
                shadow="base"
                minW="container.md"
                zIndex="1"
            >
                <HStack spacing={2} justifyContent="space-between">
                    <Box flexGrow={1}>
                        <Autocomplete>
                            <Input
                                type="text"
                                placeholder="Origin"
                                ref={originRef}
                                defaultValue="California"
                            />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Input
                            type="text"
                            placeholder="Destination Latitude"
                            ref={destinationLatRef}
                            value={state.dest_latitude}
                        />
                    </Box>
                    <Box flexGrow={1}>
                        <Input
                            type="text"
                            placeholder="Destination Longitude"
                            ref={destinationLngRef}
                            value={state.dest_longitude}
                        />
                    </Box>
                    <ButtonGroup>
                        <Button
                            colorScheme="pink"
                            type="submit"
                            onClick={calculateRoute}
                        >
                            Calculate Route
                        </Button>
                        <IconButton
                            aria-label="center back"
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
                </HStack>
                {distance && (
                    <HStack spacing={4} mt={4} justifyContent="space-between">
                        <Text>
                            <b>Distance:</b> {distance}{" "}
                        </Text>
                        <Text>
                            <b>Google Estimated Duration:</b> {duration}{" "}
                        </Text>
                        <Text>
                            <b>Predicted Duration:</b>{" "}
                            {predictedDuration > 0
                                ? formatDuration(predictedDuration)
                                : ""}{" "}
                        </Text>
                    </HStack>
                )}
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Route Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>
                            Google Estimated Time: <b>{duration}</b>
                        </Text>
                        <Text>
                            Predicted Duration:{" "}
                            <b>{formatDuration(predictedDuration)}</b>
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
export default App
