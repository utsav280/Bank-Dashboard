import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import AppLayout from '../components/layout/AppLayout';
import ConfirmModal from '../components/ui/ConfirmModal';
import { PaymentFormSkeleton } from '../components/ui/Skeletons';
import { useCurrencyFormat } from '../hooks/useCurrencyFormat';
import { useAppSelector } from '../app/hooks';

// Sub-components
import PaymentForm from '../features/payments/components/PaymentForm';
import RecentPayeesCard from '../features/payments/components/RecentPayeesCard';
import TransferInfoCard from '../features/payments/components/TransferInfoCard';
import RecentTransfersCard from '../features/payments/components/RecentTransfersCard';

const schema = z.object({
  fromAccount: z.string().min(1, 'Select a source account'),
  recipientName: z.string().min(3, 'Recipient name must be at least 3 characters'),
  recipientAccount: z.string().min(10, 'Enter a valid account / IFSC'),
  amount: z.coerce.number().positive('Amount must be positive').max(10000000, 'Maximum ₹1 Cr per transaction'),
  note: z.string().optional(),
  scheduleDate: z.string().optional(),
  authCode: z.string().min(4, 'Enter your 4-digit PIN').max(6),
});

type FormData = z.infer<typeof schema>;

const PaymentsPage: React.FC = () => {
  const { formatCurrency } = useCurrencyFormat();
  const accounts = useAppSelector((s) => s.account.accounts);
  const { enqueueSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingData, setPendingData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const {
    control, handleSubmit, formState: { errors }, reset, watch, setValue, clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema as any),
    mode: 'onBlur',
    defaultValues: {
      fromAccount: 'acc1',
      recipientName: '',
      recipientAccount: '',
      amount: '' as any,
      note: '',
      scheduleDate: '',
      authCode: '',
    },
  });

  const amount = watch('amount');
  const recipientName = watch('recipientName');
  const amtFormatted = amount ? formatCurrency(Number(amount)) : '₹0.00';
  const networkFee = '₹12.50';

  const onSubmit = (data: FormData) => {
    setPendingData(data);
    setShowModal(true);
  };

  const onConfirm = async () => {
    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 1800));
      setIsProcessing(false);
      setShowModal(false);
      const batchId = `FT-${Math.floor(Math.random() * 90000 + 10000)}-X`;
      enqueueSnackbar(`Transfer Initiated · Batch ID: #${batchId}`, {
        variant: 'success',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      });
      reset();
      setPendingData(null);
    } catch {
      setIsProcessing(false);
      enqueueSnackbar('Transfer failed. Please try again or contact support.', {
        variant: 'error',
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      });
    }
  };

  const handleSelectPayee = (name: string, account: string) => {
    setValue('recipientName', name, { shouldValidate: true });
    setValue('recipientAccount', account, { shouldValidate: true });
    clearErrors(['recipientName', 'recipientAccount']);
  };

  return (
    <AppLayout topBarPlaceholder="Search transfers or beneficiaries...">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            Initiate Payment
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Transfer funds securely between your corporate accounts or to verified external beneficiaries.
          </Typography>
        </Box>

        {loading ? (
          <PaymentFormSkeleton />
        ) : (
          <Grid container spacing={3}>
            {/* Form */}
            <Grid item xs={12} md={7}>
              <PaymentForm
                control={control}
                errors={errors}
                accounts={accounts}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            </Grid>

            {/* Right panel */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TransferInfoCard />
                <RecentPayeesCard onSelect={handleSelectPayee} />
                <RecentTransfersCard />
              </Box>
            </Grid>
          </Grid>
        )}
      </motion.div>

      <ConfirmModal
        open={showModal}
        onClose={() => !isProcessing && setShowModal(false)}
        onConfirm={onConfirm}
        amount={amtFormatted}
        recipient={recipientName || 'Beneficiary'}
        reference={pendingData?.note || 'N/A'}
        networkFee={networkFee}
        totalDebit={amount ? formatCurrency(Number(amount) + 12.5) : '—'}
        isLoading={isProcessing}
      />
    </AppLayout>
  );
};

export default PaymentsPage;
