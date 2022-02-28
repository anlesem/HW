import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const ChatManager = ({ addChat }) => {

   return (
      <Stack direction="row" spacing={2}>
         <Button variant="outlined" startIcon={<DeleteIcon />} disabled>
            Удалить
         </Button>
         <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addChat()}>
            Добавить
         </Button>
      </Stack>
   );
};