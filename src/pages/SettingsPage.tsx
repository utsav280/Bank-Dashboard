import React, { useState } from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import AppLayout from '../components/layout/AppLayout';

// Sub-components
import PersonalInformationCard from '../features/settings/components/PersonalInformationCard';
import NotificationSettingsCard from '../features/settings/components/NotificationSettingsCard';
import SecurityCard from '../features/settings/components/SecurityCard';
import AppearanceCard from '../features/settings/components/AppearanceCard';
import DangerZoneCard from '../features/settings/components/DangerZoneCard';
import RoleInfoCard from '../features/settings/components/RoleInfoCard';
import PasswordResetModal from '../features/settings/components/PasswordResetModal';

const SettingsPage: React.FC = () => {
  const [isPwdModalOpen, setIsPwdModalOpen] = useState(false);

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <AppLayout topBarPlaceholder="Search accounts or reports...">
      <motion.div variants={stagger} initial="hidden" animate="show">
        {/* Header */}
        <motion.div variants={item}>
          <Box mb={4}>
            <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>Account Settings</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Manage your institutional profile, security protocols, and system preferences.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {/* Left col */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <motion.div variants={item}>
                <PersonalInformationCard />
              </motion.div>

              <motion.div variants={item}>
                <NotificationSettingsCard />
              </motion.div>
            </Stack>
          </Grid>

          {/* Right col */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <motion.div variants={item}>
                <SecurityCard onChangePassword={() => setIsPwdModalOpen(true)} />
              </motion.div>

              <motion.div variants={item}>
                <AppearanceCard />
              </motion.div>

              <motion.div variants={item}>
                <DangerZoneCard />
              </motion.div>

              <motion.div variants={item}>
                <RoleInfoCard />
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </motion.div>

      <PasswordResetModal 
        open={isPwdModalOpen} 
        onClose={() => setIsPwdModalOpen(false)} 
      />
    </AppLayout>
  );
};

export default SettingsPage;
