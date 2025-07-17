import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useCountryCodes } from '../assets/useCountryCodes';
import { useStore } from '../assets/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Meteors } from './ShineBorder';
import { WordRotate } from './TitleRotate';

const schema = z.object({
  countryCode: z.string().min(1, 'Select a country code'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits').optional(),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const { setAuth } = useStore();
  const countries = useCountryCodes();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const simulateOTPSend = () => {
    return new Promise((resolve) => setTimeout(() => resolve('123456'), 2000));
  };

  const onSubmit = async (data) => {
    if (!isOtpSent) {
      toast.info('OTP sent!');
      await simulateOTPSend();
      setIsOtpSent(true);
    } else if (data.otp === '123456') {
      toast.success('Login successful!');
      setAuth({ phoneNumber: data.countryCode + data.phoneNumber, isAuthenticated: true });
      navigate('/dashboard');
    } else {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="relative z-0 flex flex-col items-center justify-center min-h-screen bg-zinc-900 overflow-hidden">
      {/* Meteor background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Meteors number={80} maxDuration={12} minDuration={6} />
        {/* <AnimatedGridPattern /> */}
      </div>

      <h1 className="z-10 p-3 text-9xl font-bold text-purple-700">
        <WordRotate words={["VorteX", "Ask", "Solve", 'Refine']} />
      </h1>

      {/* Heading */}
      <h1 className="z-10 p-3 text-3xl font-bold text-zinc-300 mb-4">
        Signup
      </h1>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-10 space-y-4 p-6 bg-white/10 backdrop-blur-md dark:bg-zinc-800/30 rounded-lg shadow-xl max-w-md w-full"
      >
        <select
          {...register('countryCode')}
          className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Country</option>
          {countries.map((c, index) => (
            <option key={`${c.code}-${index}`} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
        {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode.message}</p>}

        <input
          {...register('phoneNumber')}
          placeholder="Phone Number"
          className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

        {isOtpSent && (
          <input
            {...register('otp')}
            placeholder="Enter OTP"
            className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isOtpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default Login;
