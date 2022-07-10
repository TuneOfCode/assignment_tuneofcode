import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import EmailIcon from '@mui/icons-material/Email';
import HouseIcon from '@mui/icons-material/House';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, CssBaseline, Grid, InputAdornment, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { isDate, parse } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import DateInput from '../../../../components/input/DateInput';
import SelectInput from '../../../../components/input/SelectInput';
import TextInput from '../../../../components/input/TextInput';
import { getListGroupBox } from '../../../groups/groupSlice';
StudentFormEdit.propTypes = {
  onSubmit: PropTypes.func,
};

function StudentFormEdit(props) {
  const dispatch = useDispatch();
  const { onSubmit } = props;
  const { studentItem, student_ID } = useSelector((state) => state.student);
  const { groupBox } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(getListGroupBox());
    // console.log('>>>> Student Item: ', studentItem);
    // console.log('>>>> Student ID: ', student_ID);
  }, [dispatch]);
  const parseDateString = (value, originalValue) => {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, 'dd/MM/yyyy', new Date());

    return parsedDate;
  };
  const schema = yup
    .object({
      name: yup
        .string()
        .required('please enter a full name')
        .test(
          'should has at least two words',
          'please enter at least two words',
          (values) => values.split(' ').length >= 2
        ),
      email: yup.string().required('please enter a email').email('Must be a valid email'),
      birth_date: yup
        .date()
        .transform(parseDateString)
        .typeError('Invalid date format.(dd/MM/yyyy)')
        .nullable()
        .required('The field cannot be left blank.'),
      birth_place: yup.string().required('please enter a birth place'),
      sex: yup.string().required('please enter a gender'),
      group_ids: yup.array().min(1),
    })
    .required();
  const { name, email, birth_date, birth_place, sex, group_ids } = studentItem;
  const hadDefaultValues = {
    name,
    email,
    birth_date: new Date(birth_date),
    birth_place,
    sex,
    group_ids,
  };

  const form = useForm({
    defaultValues: hadDefaultValues,
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
          Update a student
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
                name="email"
                color="warning"
                label="Email Address"
                autoComplete="email"
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
            <Grid item xs={6}>
              <DateInput
                name="birth_date"
                label="Date of birth"
                inputFormat="dd/MM/yyyy"
                form={form}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                required
                name="birth_place"
                color="warning"
                label="Place of birth"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <HouseIcon />
                    </InputAdornment>
                  ),
                }}
                form={form}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                name="sex"
                label="Sex"
                multiple={false}
                items={['Male', 'Female']}
                form={form}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                name="group_ids"
                label="Groups"
                multiple={true}
                items={groupBox}
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

export default StudentFormEdit;
