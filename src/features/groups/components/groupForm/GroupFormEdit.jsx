import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import EmailIcon from '@mui/icons-material/Email';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, CssBaseline, Grid, InputAdornment, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import SelectInput from '../../../../components/input/SelectInput';
import TextInput from '../../../../components/input/TextInput';
import { getListLeaderBox } from '../../../students/studentSlice';
GroupFormCreate.propTypes = {
  onSubmit: PropTypes.func,
};

function GroupFormCreate(props) {
  const dispatch = useDispatch();
  const { onSubmit } = props;
  const { groupItem, group_ID } = useSelector((state) => state.group);
  const { listLeaderBox } = useSelector((state) => state.student);
  useEffect(() => {
    dispatch(getListLeaderBox());
  }, [dispatch]);
  const schema = yup
    .object({
      name: yup.string().required('please enter field name'),
      subject: yup.string().required('please enter field subject'),
      leader: yup.number().required('please enter field leader'),
    })
    .required();
  const { name, subject, leader } = groupItem;
  const initialDefaultValues = {
    name,
    subject,
    leader,
  };

  const form = useForm({
    defaultValues: initialDefaultValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };
  const { isSubmitting } = form.formState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#ed6c02',
            marginTop: '-16%',
            width: '80px',
            height: '80px',
          }}
        >
          <AssignmentIndRoundedIcon sx={{ fontSize: '50px' }} />
        </Avatar>
        <Typography variant="h6" textTransform="capitalize" sx={{ color: '#ed6c02' }}>
          Update a group
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={form.handleSubmit(handleFormSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput
                name="name"
                required
                color="warning"
                label="Name"
                autoComplete="family-name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                control={form.control}
                form={form}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                required
                name="subject"
                color="warning"
                label="Subject"
                autoComplete="family-name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                form={form}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                name="leader"
                label="Leader"
                multiple={false}
                items={listLeaderBox}
                form={form}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            loading={isSubmitting}
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#ed6c02',
              ':hover': {
                backgroundColor: '#ed6c02',
              },
            }}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}

export default GroupFormCreate;
