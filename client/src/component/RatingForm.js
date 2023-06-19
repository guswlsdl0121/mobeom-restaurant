import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Rating, Typography, Box, Modal } from "@mui/material";
import { useStyles } from "../Styles";

const RatingForm = ({ isOpen, onSubmit, handleClose }) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data.rating);
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className={classes.modal}>
      <Box className={classes.ratingForm}>
        <Typography variant="h6" component="h2">
          평점 주기
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box className={classes.ratingBox}>
            <Controller
              name="rating"
              control={control}
              defaultValue={3}
              rules={{ required: true }}
              render={({ field }) => (
                <Rating
                  {...field}
                  size="large"
                  precision={0.5}
                  className={classes.rating}
                />
              )}
            />
          </Box>
          {errors.rating && <p>Rating is required</p>}
          <Box className={classes.submitButtonBox}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default RatingForm;
