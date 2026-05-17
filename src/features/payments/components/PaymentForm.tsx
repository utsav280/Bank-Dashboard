import React from 'react';
import {
  Typography, Card, CardContent, TextField, MenuItem, Select,
  FormControl, InputLabel, Stack, Divider, InputAdornment, Button, Box
} from '@mui/material';
import { Controller } from 'react-hook-form';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useCurrencyFormat } from '../../../hooks/useCurrencyFormat';

interface PaymentFormProps {
  control: any;
  errors: any;
  accounts: any[];
  handleSubmit: any;
  onSubmit: (data: any) => void;
}

const inputSx = { '& .MuiInputBase-root': { borderRadius: 1.5 } };

const PaymentForm: React.FC<PaymentFormProps> = ({
  control, errors, accounts, handleSubmit, onSubmit
}) => {
  const { formatCurrency } = useCurrencyFormat();

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h6" fontWeight={700} mb={2.5}>Transfer Details</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            {/* From Account */}
            <Controller
              name="fromAccount"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small" error={!!errors.fromAccount}>
                  <InputLabel>From Account</InputLabel>
                  <Select {...field} label="From Account" sx={{ borderRadius: 1.5 }}>
                    {accounts.map((a) => (
                      <MenuItem key={a.id} value={a.id}>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>{a.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {a.accountNumber} · {formatCurrency(a.balance)}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.fromAccount && <Typography variant="caption" color="error">{errors.fromAccount.message}</Typography>}
                </FormControl>
              )}
            />

            <Divider />

            {/* Recipient */}
            <Controller name="recipientName" control={control} render={({ field }) => (
              <TextField
                {...field} label="Recipient / Beneficiary" fullWidth size="small"
                error={!!errors.recipientName} helperText={errors.recipientName?.message}
                sx={inputSx}
              />
            )} />
            <Controller name="recipientAccount" control={control} render={({ field }) => (
              <TextField
                {...field} label="Account No. / IFSC" fullWidth size="small"
                error={!!errors.recipientAccount} helperText={errors.recipientAccount?.message}
                sx={inputSx}
              />
            )} />

            {/* Amount */}
            <Controller name="amount" control={control} render={({ field }) => (
              <TextField
                {...field}
                label="Amount (INR)"
                fullWidth size="small" type="number"
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                error={!!errors.amount} helperText={errors.amount?.message}
                sx={inputSx}
              />
            )} />

            {/* Note */}
            <Controller name="note" control={control} render={({ field }) => (
              <TextField {...field} label="Payment Reference / Note" fullWidth size="small" sx={inputSx} />
            )} />

            {/* Schedule date */}
            <Controller name="scheduleDate" control={control} render={({ field }) => (
              <TextField
                {...field} label="Schedule Date (optional)" type="date"
                fullWidth size="small" InputLabelProps={{ shrink: true }} sx={inputSx}
              />
            )} />

            <Divider />

            {/* Auth PIN */}
            <Controller name="authCode" control={control} render={({ field }) => (
              <TextField
                {...field} label="Enter 4-digit PIN" fullWidth size="small"
                type="password" inputProps={{ maxLength: 6 }}
                error={!!errors.authCode} helperText={errors.authCode?.message}
                sx={inputSx}
              />
            )} />

            <Button
              type="submit" variant="contained" fullWidth size="large"
              endIcon={<SendRoundedIcon />}
              sx={{ py: 1.5, fontSize: '0.9rem' }}
            >
              Review Transfer →
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
