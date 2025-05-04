import { useEffect, useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function UpdateNotification() {
  const [open, setOpen] = useState(false);

  // Register service worker and handle updates
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW registered:', r);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
    onOfflineReady() {
      console.log('App ready to work offline');
    },
  });

  // Show notification when update is available
  useEffect(() => {
    if (needRefresh) {
      setOpen(true);
    }
  }, [needRefresh]);

  // Handle update button click
  const handleUpdate = () => {
    updateServiceWorker(true);
    setOpen(false);
  };

  // Handle close button click
  const handleClose = () => {
    setOpen(false);
    setNeedRefresh(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        severity="info" 
        sx={{ width: '100%' }}
        action={
          <>
            <Button color="primary" size="small" onClick={handleUpdate}>
              Update
            </Button>
            <Button color="inherit" size="small" onClick={handleClose}>
              Dismiss
            </Button>
          </>
        }
      >
        A new version is available!
      </Alert>
    </Snackbar>
  );
}