import React, { useState, useEffect, useRef } from "react"
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
    DirectionsRenderer,
    Autocomplete,
} from "@react-google-maps/api"

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
    const [origin, setOrigin] = useState("Pleasanton, CA")
    const [destination, setDestination] = useState(
        "4900 Hopyard Rd STE 100, Pleasanton, California"
    )

    const originRef = useRef()
    const destinationRef = useRef()

    async function calculateRoute() {
        if (!origin || !destination) {
            return
        }

        console.log(origin, destination)

        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin,
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

    useEffect(() => {
        if (isLoaded) {
            calculateRoute()
        }
    }, [isLoaded])

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance("")
        setDuration("")
        setPredictedDuration("")
        setOrigin("Pleasanton, CA")
        setDestination("4900 Hopyard Rd STE 100, Pleasanton, California")
    }

    function formatDuration(durationInSeconds) {
        const hours = Math.floor(durationInSeconds / 3600)
        const minutes = Math.floor((durationInSeconds % 3600) / 60)
        return `${hours > 0 ? `${hours} hours ` : ""}${minutes} mins`
    }

    function handleOriginPlaceChanged() {
        const place = originRef.current.getPlace()
        if (place && place.formatted_address) {
            setOrigin(place.formatted_address)
        }
    }

    function handleDestinationPlaceChanged() {
        const place = destinationRef.current.getPlace()
        if (place && place.formatted_address) {
            setDestination(place.formatted_address)
        }
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
                        <Autocomplete
                            onLoad={(ref) => (originRef.current = ref)}
                            onPlaceChanged={handleOriginPlaceChanged}
                        >
                            <Input
                                type="text"
                                placeholder="Origin"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                        </Autocomplete>
                    </Box>
                    <Box flexGrow={1}>
                        <Autocomplete
                            onLoad={(ref) => (destinationRef.current = ref)}
                            onPlaceChanged={handleDestinationPlaceChanged}
                        >
                            <Input
                                type="text"
                                placeholder="Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </Autocomplete>
                    </Box>
                    <ButtonGroup>
                        <Button
                            colorScheme="pink"
                            type="submit"
                            onClick={calculateRoute}
                        >
                            Calculate Time
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
