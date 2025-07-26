
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useIsFetching } from '@tanstack/react-query';

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
export const LoadingComponent=()=>{
  const isFetching=useIsFetching()
  if(!isFetching){
    return null
  }
  return (
    <div className="w-full flex items-center justify-center  h-full  fixed bg-[rgba(0,0,0,.8)] z-10">
          <CircularIndeterminate />
        </div>
  )
}