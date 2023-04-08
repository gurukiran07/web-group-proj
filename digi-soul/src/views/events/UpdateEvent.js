/**
 * @author Amanjot Singh
 **/

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useFilePicker } from "use-file-picker";
import BasicDatePicker from "../../components/BasicDatePicker";
import { useNavigate } from "react-router-dom";
import { eventsApi } from "./services/events-api";
import { useParams } from "react-router-dom";

const theme = createTheme();

function UpdateEvent() {
  const { id } = useParams();
  const [currentEvent, setCurrentEvent] = React.useState({});
  const [eventDate, setEventDate] = React.useState(
    currentEvent?.date || Date.now()
  );

  // const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
  //   readAs: "DataURL",
  //   accept: "image/*",
  //   limitFilesConfig: { max: 1 },
  // });

  const [formData, setFormData] = React.useState({
    name: {
      value: currentEvent.name || "",
      isError: false,
      errorMessage: "Minimum input size 5",
    },
    brief: {
      value: currentEvent.brief || "",
      isError: false,
      errorMessage: "Minimum input size 25",
    },
    imageURL: {
      value: currentEvent.imageURL || "",
      isError: false,
      errorMessage: "Upload valid image",
    },
    detail: {
      value: currentEvent.detail || "",
      isError: false,
      errorMessage: "",
    },
  });

  React.useEffect(() => {
    eventsApi
      .getEvent(id)
      .then((res) => {
        const currEvent = res?.data?.event || {};
        setFormData(() => {
          return {
            name: { value: currEvent.name || "" },
            brief: { value: currEvent.brief || "" },
            imageURL: { value: currEvent.imageURL || "" },
            detail: { value: currEvent.detail || "" },
          };
        });
        setEventDate(currEvent.date || "");
      })
      .catch((err) => {
        console.log("While fetching an event -->", err);
      });
  }, []);

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value,
        isError: false,
      },
    }));
  }

  function validate(event) {
    var isValidationSuccess = true;

    var regexTitle = /(?=.{5,})./;
    var regexDescription = /(?=.{25,})./;

    if (!regexTitle.test(formData.name.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: {
          ...formData.name,
          isError: true,
        },
      }));
    }

    if (!regexDescription.test(formData.brief.value)) {
      isValidationSuccess = false;
      setFormData((prevFormData) => ({
        ...prevFormData,
        brief: {
          ...formData.brief,
          isError: true,
        },
      }));
    }

    return isValidationSuccess;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      eventsApi
        .updateEvent(id, {
          name: formData.name.value,
          brief: formData.brief.value,
          detail: formData.detail.value,
          imageURL: formData.imageURL.value,
          date: eventDate,
        })
        .then((res) => {
          if (res.data.success) {
            console.log("Event Updated :)", res.data);
            res.data?.event?._doc?._id
              ? navigate(`/event/${res.data.event._doc._id}`)
              : navigate(`/events/all`);
            // TODO: Add success toast
          }
        })
        .catch((err) => {
          console.log("Cannot update event due to the error-->,", err);
          // TODO: Show err message
        });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <CalendarMonth />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Event Details
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  value={formData.name.value}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="name"
                  label="Event Title"
                  helperText={
                    formData.name.isError && formData.name.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="brief"
                  label="Event Description"
                  name="brief"
                  value={formData.brief.value}
                  onChange={handleChange}
                  helperText={
                    formData.brief.isError && formData.brief.errorMessage
                  }
                />
              </Grid>
              {/* <Grid item xs={6}>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={openFileSelector}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Select Thumbnail
                </Button>
              </Grid> */}
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="imageURL"
                  label="ImageURL"
                  name="imageURL"
                  value={formData.imageURL.value}
                  onChange={handleChange}
                  helperText={
                    formData.imageURL.isError && formData.imageURL.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={6} height="100%">
                <BasicDatePicker value={eventDate} setValue={setEventDate} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  style={{ width: "100%" }}
                  name="detail"
                  value={formData.detail.value}
                  onChange={handleChange}
                  placeholder="Detailed Description"
                  id="detail"
                  minRows={10}
                  helperText={
                    formData.detail.isError && formData.detail.errorMessage
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Event
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default UpdateEvent;
