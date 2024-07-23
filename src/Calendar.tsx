import React, { useState } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Text,
  Select,
  Collapse,
  Input,
  VStack,
  HStack,
  Divider,
  Flex,
  
} from "@chakra-ui/react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const startYear = 1998;
const yearsToShow = 100;

interface Event {
  id: number;
  date: Date;
  name: string;
}

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState(
    currentDate.getFullYear().toString()
  );
  const [showYearOptions, setShowYearOptions] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState<string>(
    currentDate.toISOString().split("T")[0]
  );
  const [eventDateVisible, setEventDateVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      return parsedEvents.map((event: any) => ({
        ...event,
        date: new Date(event.date),
      }));
    }
    return [];
  });

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startOfWeek = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(event.target.value);
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearOptions(false);
  };

  const toggleEventDateVisibility = () => {
    setEventDateVisible(!eventDateVisible);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventName(event.target.value);
    if (!eventDateVisible) {
      toggleEventDateVisibility();
    }
  };

  const handleEventDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventDate(event.target.value);
  };

  const handleCreateEvent = () => {
    if (eventName && eventDate) {
      const newEvent: Event = {
        id: new Date().getTime(),
        date: new Date(eventDate),
        name: eventName,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      setEventName("");
      setEventDate("");
      toggleEventDateVisibility();
    }
  };

  const handleUpdateEvent = (eventId: number) => {
    const newName = prompt("Enter new title");
    if (newName) {
      const updatedEvents = events.map((event) =>
        event.id === eventId ? { ...event, name: newName } : event
      );
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const renderDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < startOfWeek; i++) {
      days.push(<Box key={`empty-${i}`} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isToday = today.toDateString() === date.toDateString();
      const currentDateKey = date.toDateString();
      const dayEvents = events.filter(
        (event) => event.date.toDateString() === currentDateKey
      );

      days.push(
        <Box
          key={i}
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={0.5}
          textAlign="center"
          minW={{ base: "24px", sm: "30px", md: "40px", lg: "50px" }} // Smaller responsive width
          minH={{ base: "24px", sm: "30px", md: "40px", lg: "50px" }} // Smaller responsive height
          onClick={() => handleDateClick(date)}
          cursor="pointer"
          position="relative"
          _hover={{ backgroundColor: "gray.100" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin={{ base: 0.5, sm: 1 }} // Smaller responsive margin
        >
          <Text
            fontSize={{ base: "xs", sm: "xs", md: "sm" }} // Smaller responsive font size
            fontWeight="bold"
            color={isSelected ? "blue.600" : isToday ? "red.600" : "black"}
          >
            {i}
          </Text>
          {dayEvents.map((event) => (
            <Text
              key={event.id}
              fontSize="xs"
              mt={0.5}
              color="blue.600"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              width="100%"
              textAlign="center" // Center align text
            >
              {event.name}
            </Text>
          ))}
        </Box>
      );
    }
    return days;
  };
 return (
    <Flex
      direction={{ base: "column", md: "row" }}
      p={4}
      gap={4}
      maxW="100vw"
      overflow="hidden"
    >
      <Box
        flex="1"
        p={2}
        overflow="hidden"
        maxW={{ base: "90%", md: "60%" }}
        maxH={{ base: "60%", md: "50%" }} // Adjust height for smaller screens
      >
        <VStack spacing={4} p={2} maxW="100%" mx="auto" align="stretch">
          <HStack justify="space-between" mb={4}>
            <Button size="sm" backgroundColor="blue.300" onClick={prevMonth}>
              &lt;
            </Button>
            <Button
              backgroundColor="blue.300"
              size="sm"
              onClick={() => setShowYearOptions(!showYearOptions)}
            >
              Select Year
            </Button>
            <Text fontSize={{ base: "sm", sm: "md", md: "lg" }} fontWeight="600">
              {currentDate.toLocaleString("default", { month: "long" })} {selectedYear}
            </Text>
            <Button backgroundColor="blue.300" size="sm" onClick={nextMonth}>
              &gt;
            </Button>
          </HStack>
          <Collapse in={showYearOptions} animateOpacity>
            <Select
              cursor="pointer"
              value={selectedYear}
              onChange={handleYearChange}
              size="sm"
              mt={2}
              bg="blue.300"
              iconColor="white"
            >
              {Array.from({ length: yearsToShow }, (_, i) => startYear + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </Select>
          </Collapse>
          <SimpleGrid
            columns={7} // Fixed columns for calendar days
            spacing={1}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={1}
          >
            {daysOfWeek.map((day) => (
              <Box key={day} fontWeight="bold" textAlign="center" fontSize="sm">
                {day}
              </Box>
            ))}
            {renderDays()}
          </SimpleGrid>
        </VStack>
      </Box>
      <Box
        flex="1"
        maxW={{ base: "100%", md: "30%" }}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        borderColor="gray.200"
        backgroundColor="white"
        overflow="auto"
      >
        <Text mb={2} fontSize="lg" fontWeight="bold">Add Event</Text>
        <Input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={handleEventNameChange}
          mb={2}
          fontSize="sm" // Smaller font size
        />
        {eventDateVisible && (
          <Input
            type="date"
            cursor="pointer"
            value={eventDate}
            onChange={handleEventDateChange}
            mb={2}
            fontSize="sm" // Smaller font size
          />
        )}
        <Button
          size="sm"
          onClick={handleCreateEvent}
          mb={2}
          backgroundColor="blue.300"
          color="white"
        >
          Create Event
        </Button>
        <Divider my={2} />
        {events.map((event) => (
          <Box
            key={event.id}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            mt={2}
            backgroundColor="blue.50"
          >
            <Text fontSize="md" fontWeight="bold">
              Event
            </Text>
            <Text fontSize="sm">{event.name}</Text>
            <Text fontSize="sm">{event.date.toDateString()}</Text>
            <HStack spacing={2} mt={2}>
              <Button
                size="xs"
                onClick={() => handleUpdateEvent(event.id)}
                backgroundColor="transparent"
                textDecoration="underline"
                color="blue.600"
              >
                Edit
              </Button>
              <Button
                size="xs"
                onClick={() => handleDeleteEvent(event.id)}
                backgroundColor="transparent"
                textDecoration="underline"
                color="red.600"
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default CalendarComponent;
