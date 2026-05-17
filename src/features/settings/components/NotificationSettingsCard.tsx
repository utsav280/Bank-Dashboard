import React, { useState } from 'react';
import {
  Typography, Card, CardContent, Grid, Switch, 
  FormControlLabel, Stack, Checkbox, FormGroup
} from '@mui/material';
import { cardStyle } from './SettingsConstants';

const NotificationSettingsCard: React.FC = () => {
  const [notifs, setNotifs] = useState({
    largeVolume: true,
    newDeposit: true,
    weeklyReport: false,
    marketPulse: true,
    emailDelivery: true,
    pushDelivery: true,
    smsDelivery: false,
  });

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="h6" fontWeight={800} color="text.primary" mb={0.5}>Notification Settings</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Control how and when you receive institutional updates.
        </Typography>

        <Grid container>
          {/* Transactional */}
          <Grid item xs={12} sm={4} sx={{ pr: { sm: 3 }, mb: { xs: 3, sm: 0 } }}>
            <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.5} color="text.secondary" display="block" mb={2.5}>Transactional</Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={<Switch size="medium" checked={notifs.largeVolume} onChange={(e) => setNotifs((p) => ({ ...p, largeVolume: e.target.checked }))} />}
                label={<Typography variant="body2" fontWeight={500} color="text.primary">Large Volume Alerts</Typography>}
              />
              <FormControlLabel
                control={<Switch size="medium" checked={notifs.newDeposit} onChange={(e) => setNotifs((p) => ({ ...p, newDeposit: e.target.checked }))} />}
                label={<Typography variant="body2" fontWeight={500} color="text.primary">New Deposit Confirmation</Typography>}
              />
            </Stack>
          </Grid>
          {/* System */}
          <Grid item xs={6} sm={4} sx={{ px: { sm: 3 }, borderLeft: { sm: '1px solid' }, borderColor: { sm: 'divider' }, mb: { xs: 3, sm: 0 } }}>
            <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.5} color="text.secondary" display="block" mb={2.5}>System</Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={<Switch size="medium" checked={notifs.weeklyReport} onChange={(e) => setNotifs((p) => ({ ...p, weeklyReport: e.target.checked }))} />}
                label={<Typography variant="body2" fontWeight={500} color="text.primary">Weekly Analytics</Typography>}
              />
              <FormControlLabel
                control={<Switch size="medium" checked={notifs.marketPulse} onChange={(e) => setNotifs((p) => ({ ...p, marketPulse: e.target.checked }))} />}
                label={<Typography variant="body2" fontWeight={500} color="text.primary">Market Pulse</Typography>}
              />
            </Stack>
          </Grid>
          {/* Delivery */}
          <Grid item xs={6} sm={4} sx={{ pl: { sm: 3 }, borderLeft: { sm: '1px solid' }, borderColor: { sm: 'divider' } }}>
            <Typography variant="caption" fontWeight={700} textTransform="uppercase" letterSpacing={0.5} color="text.secondary" display="block" mb={2.5}>Delivery Method</Typography>
            <FormGroup sx={{ gap: 0.5 }}>
              {[
                { key: 'emailDelivery', label: 'Email Notifications' },
                { key: 'pushDelivery', label: 'Push Notifications' },
                { key: 'smsDelivery', label: 'SMS Alerts' },
              ].map((d) => (
                <FormControlLabel
                  key={d.key}
                  control={<Checkbox size="small" checked={notifs[d.key as keyof typeof notifs] as boolean}
                    onChange={(e) => setNotifs((p) => ({ ...p, [d.key]: e.target.checked }))} />}
                  label={<Typography variant="body2" fontWeight={500} color="text.primary">{d.label}</Typography>}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NotificationSettingsCard;
