import style from './ChatButtons.module.scss';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const ChatButtons = ({ data }) => {
  return (
    <Stack direction="row" spacing={2} className={style.manage}>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        disabled={data.checked.length > 1 ? false : true}
        data-testid="chats-button-remove"
        onClick={() => data.handleDelete(data.checked)}>
        Удалить
      </Button>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        data-testid="chats-button-add"
        onClick={() => data.handleAdd(data.checked)}>
        Добавить
      </Button>
    </Stack>
  );
};
