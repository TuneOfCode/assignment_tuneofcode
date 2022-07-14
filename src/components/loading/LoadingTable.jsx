import { Box, Skeleton } from '@mui/material';
import React, { forwardRef } from 'react';
import { PARAMS, TABLE } from '../../constants/common.constant';

const Loading = forwardRef((props, ref) => (
  <Box
    sx={{
      // height: "max-content",
      height: 375,
      width: '100%',
    }}
    ref={ref}
  >
    {[...Array(PARAMS.LIMIT || TABLE.ROW_STUDENT)].map((_, i) => (
      <Box key={i} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <Skeleton
          variant="rectangular"
          sx={{ marginLeft: '8px', width: 42, height: 42 }}
        />
        <Skeleton variant="circular" sx={{ marginLeft: '8px', width: 40, height: 40 }} />
        <Skeleton
          variant="rectangular"
          sx={{
            marginLeft: '8px',
            height: 48,
            width: 200,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            marginLeft: '8px',
            height: 48,
            width: 130,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            marginLeft: '8px',
            height: 48,
            width: 250,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            marginLeft: '8px',
            height: 48,
            width: 250,
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            marginLeft: '8px',
            height: 48,
            width: 150,
          }}
        />
      </Box>
    ))}
  </Box>
));

export default Loading;
