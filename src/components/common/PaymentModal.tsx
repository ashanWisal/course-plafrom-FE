import { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { Formik, Form } from 'formik';
import { useCreateOrder } from '../../mutations/CreateOrder';
import { useConfirmOrder } from '../../mutations/ConfirmOrder';
import { PaymentEntity } from '../../entities/order.entity';
import type { Course } from '../../types';
import FormInput from '../../base-fields/FormInput';
import Button from '../../base-fields/Button';

interface Props {
  course: Course;
  onClose: () => void;
}

type Step = 'payment' | 'processing' | 'success';

const PaymentModal = ({ course, onClose }: Props) => {
  const [step, setStep] = useState<Step>('payment');
  const [orderId, setOrderId] = useState<string | null>(null);

  const { mutateAsync: createOrder, isPending: isCreating } = useCreateOrder();
  const { mutateAsync: confirmOrder, isPending: isConfirming } = useConfirmOrder();

  const isLoading = isCreating || isConfirming;

  const handleSubmit = async () => {
    try {
      // Step 1 — Create order + Stripe PaymentIntent
      setStep('processing');
      const orderResponse = await createOrder(course?._id ?? '');
      setOrderId(orderResponse?.order?._id ?? null);

      // Step 2 — Simulate processing delay (like real Stripe)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3 — Confirm order + create enrollment
      await confirmOrder(orderResponse?.order?._id ?? '');
      setStep('success');
    } catch {
      setStep('payment');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={step === 'processing' ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0d1117] border border-[#30363d] rounded-2xl p-6 z-10">

        {/* Processing Step */}
        {step === 'processing' && (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <p className="text-white font-semibold">Processing Payment...</p>
            <p className="text-gray-500 text-sm">Please wait, do not close this window</p>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <span className="text-green-400 text-2xl">✓</span>
            </div>
            <p className="text-white font-bold text-xl">Payment Successful!</p>
            <p className="text-gray-500 text-sm text-center">
              You are now enrolled in <span className="text-white font-medium">{course?.title}</span>
            </p>
            <p className="text-gray-600 text-xs">Redirecting to your dashboard...</p>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Complete Your Enrollment</h2>
                <p className="text-gray-500 text-xs mt-1">CoursePlatform Secure Checkout</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Selected Course */}
            <div className="flex items-center gap-3 bg-[#060d16] border border-[#30363d] rounded-xl p-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                <span className="text-blue-400 text-xs font-bold">DN</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Selected Course</p>
                <p className="text-white font-semibold text-sm truncate">{course?.title ?? ''}</p>
              </div>
              <span className="text-white font-bold shrink-0">
                ${course?.price?.toFixed(2) ?? '0.00'}
              </span>
            </div>

            {/* Test Mode Banner */}
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2 mb-4">
              <span className="text-yellow-400 text-xs">⚡</span>
              <p className="text-yellow-400 text-xs font-medium">
                TEST MODE — Pre-filled with Stripe test card. No real charges.
              </p>
            </div>

            {/* Payment Form */}
            <Formik
              initialValues={{
                ...new PaymentEntity(),
                cardholder_name: 'John Doe',
                card_number: '4242 4242 4242 4242',
                expiry_date: '12/26',
                cvc: '123',
              }}
              validationSchema={PaymentEntity.yupSchema()}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-4">
                  <FormInput
                    name="cardholder_name"
                    label="Cardholder Name"
                    placeholder="John Doe"
                  />

                  {/* Card Number with icon */}
                  <div className="relative">
                    <FormInput
                      name="card_number"
                      label="Card Number"
                      placeholder="4242 4242 4242 4242"
                      rightElement={
                        <CreditCard size={16} className="text-gray-500" />
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      name="expiry_date"
                      label="Expiry Date"
                      placeholder="MM/YY"
                    />
                    <FormInput
                      name="cvc"
                      label="CVC"
                      placeholder="123"
                    />
                  </div>

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    fullWidth
                  >
                    <Lock size={14} />
                    Pay ${course?.price?.toFixed(2) ?? '0.00'}
                  </Button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full text-center text-gray-500 text-sm hover:text-gray-300 transition py-1"
                  >
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>

            {/* Stripe Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#30363d]">
              <div className="flex items-center gap-2">
                <div className="bg-[#635bff] rounded px-2 py-0.5">
                  <span className="text-white text-xs font-bold">stripe</span>
                </div>
                <span className="text-gray-600 text-xs">Secured by Stripe</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <Lock size={10} />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;