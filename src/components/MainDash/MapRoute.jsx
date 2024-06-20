import React, { useState, useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { MdRefresh } from "react-icons/md";
import { useLocation } from "react-router-dom";
const center = { lat: 48.8584, lng: 2.2945 };
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [predictedDuration, setPredictedDuration] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [origin, setOrigin] = useState("Pleasanton, CA");
  const [originPosition, setOriginPosition] = useState(null);
  const [truckPosition, setTruckPosition] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [destination, setDestination] = useState(
    "4900 Hopyard Rd STE 100, Pleasanton, California"
  );
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const state = {
    dest_latitude: params.get("latitude"),
    dest_longitude: params.get("longitude"),
  };
  const calculateRouteIntervalRef = useRef(null); // Ref to hold interval ID
  async function calculateRoute(coord) {
    console.log({ coord });
    const destination = {
      lat: parseFloat(coord?.destination?.lat),
      lng: parseFloat(coord?.destination?.lng),
    };
    if (!origin || !destination) {
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: origin }, async (results, status) => {
      if (status === "OK" && results[0]) {
        const originLatLng = results[0].geometry.location;
        setOriginPosition(originLatLng);
        const directionsService = new window.google.maps.DirectionsService();
        const directionsResults = await directionsService.route({
          origin: originLatLng,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(directionsResults);
        const durationText = directionsResults.routes[0].legs[0].duration.text;
        const minutes = parseInt(durationText); // Extract the number of minutes
        const durationInSeconds = minutes * 60;
        setDuration(directionsResults.routes[0].legs[0].duration.text);
        const googleDurationInSeconds =
          directionsResults.routes[0].legs[0].duration.value;
        const predictedDurationInSeconds = googleDurationInSeconds + 60 * 20;
        setPredictedDuration(predictedDurationInSeconds);
        setTruckPosition(directionsResults.routes[0].overview_path[0]);
        animateTruck(
          directionsResults.routes[0].overview_path,
          predictedDurationInSeconds
          // durationInSeconds
        );
        setDistance(directionsResults.routes[0].legs[0].distance.text);
        onOpen();
        // Check if destination reached
        const legs = directionsResults.routes[0].legs;
        if (legs && legs.length > 0 && legs[0].end_address === destination) {
          clearInterval(calculateRouteIntervalRef.current);
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  useEffect(() => {
    console.log(state.dest_latitude != null, state.dest_longitude != null);
    if (isLoaded && state.dest_latitude != null && state.dest_longitude != null)
      calculateRoute({
        destination: {
          lat: state.dest_latitude,
          lng: state.dest_longitude,
        },
      });
  }, [state.dest_latitude, state.dest_longitude, isLoaded]);
  function clearRoute() {
    calculateRoute();
  }
  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    return `${minutes} mins`;
  }
  function animateTruck(path, durationInSeconds) {
    const totalSteps = path.length;
    const intervalTime = 5000;
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < totalSteps) {
        const progress = currentStep / totalSteps;
        const nextPosition = interpolatePosition(path, progress);
        setTruckPosition(nextPosition);
        setOriginPosition(nextPosition);
        updateOriginInput(nextPosition);
        currentStep += 25;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
  }
  function interpolatePosition(path, progress) {
    const totalDistance =
      window.google.maps.geometry.spherical.computeLength(path);
    const targetDistance = totalDistance * progress;
    let accumulatedDistance = 0;
    for (let i = 1; i < path.length; i++) {
      const segmentDistance =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          path[i - 1],
          path[i]
        );
      if (accumulatedDistance + segmentDistance >= targetDistance) {
        const segmentProgress =
          (targetDistance - accumulatedDistance) / segmentDistance;
        return window.google.maps.geometry.spherical.interpolate(
          path[i - 1],
          path[i],
          segmentProgress
        );
      }
      accumulatedDistance += segmentDistance;
    }
    return path[path.length - 1];
  }
  function updateOriginInput(position) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK" && results[0]) {
        setOrigin(results[0].formatted_address);
      }
    });
  }
  if (!isLoaded) {
    return <SkeletonText />;
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
          {truckPosition && (
            <Marker
              position={truckPosition}
              icon={{
                url: "https://img.icons8.com/ios-filled/50/000000/truck.png",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
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
                value="Pleasanton, CA"
                disabled={true}
                title="Origin"
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                title="Destination"
                value={`${state.dest_latitude},${state.dest_longitude}`}
                disabled={true}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button
              colorScheme="pink"
              type="submit"
              onClick={calculateRoute}
              isDisabled={true}
              title="This feature will be enabled in the future"
            >
              Calculate Time
            </Button>
            <IconButton
              aria-label="center back"
              icon={<MdRefresh />}
              onClick={clearRoute}
              isDisabled={true}
              title="This feature will be enabled in the future"
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
              {predictedDuration > 0 ? formatDuration(predictedDuration) : ""}{" "}
            </Text>
          </HStack>
        )}
        <>
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Text>
                <b>Current Location:</b>
              </Text>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  disabled={true}
                  title="Current truck location"
                />
              </Autocomplete>
            </Box>
          </HStack>
        </>
      </Box>
      {/* {!autoRefresh && ( */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Route Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Predicted Duration is <b>{formatDuration(predictedDuration)}</b>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* )} */}
    </Flex>
  );
}
export default App;
